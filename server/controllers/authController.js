const User = require("../models/userModel");
const Admin = require("../models/adminModel");

const jwt = require("jsonwebtoken");

////////////////////////////////// LOGIN ///////////////////////////////

module.exports.studentLogin = async (req, res) => {
    try {
        const { studentId } = req.body;

        const user = await User.findOne({ studentId });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 🔥 Clear both admin and user tokens before setting the new one
        res.cookie("admin_token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(0), // ✅ Forces removal
            maxAge: 0,
        });
        res.cookie("user_token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(0),
            maxAge: 0,
        });

        res.cookie("user_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

module.exports.adminLogin = async (req, res) => {
    try {
        const { email, adminId } = req.body;

        const admin = await Admin.findOne({ email: email });

        if (!admin) return res.status(401).json({ message: "Invalid credentials" });
        if (admin.adminID !== adminId) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 🔥 Clear both admin and user tokens before setting the new one
        res.cookie("admin_token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(0), // ✅ Forces removal
            maxAge: 0,
        });
        res.cookie("user_token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(0),
            maxAge: 0,
        });

        res.cookie("admin_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful", admin });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

module.exports.me = async (req, res) => {
    try {
        const role = req.user.role;
        let user = null;
        if (role === "Admin") {
            user = await Admin.findById(req.user.id);
        } else {
            user = await User.findById(req.user.id).populate("confessionGroups");
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.logout = (req, res) => {
    try {
        // Clear both tokens to handle both roles dynamically
        res.cookie("admin_token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(0), // ✅ Forces removal
            maxAge: 0,
        });
        res.cookie("user_token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(0),
            maxAge: 0,
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed", error: error.message });
    }
};
