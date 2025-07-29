const jwt = require("jsonwebtoken");

/////////////////////// VERIFY TOKEN /////////////////////////

module.exports.verifyToken = (req, res, next) => {


    const adminToken = req.cookies.admin_token;
    const userToken = req.cookies.user_token;
    let token = adminToken || userToken; 



    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

/////////////////////// VERIFY ADMIN /////////////////////////

module.exports.verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied!" });
    }
};

/////////////////////// VERIFY USER /////////////////////////

module.exports.verifyUser = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(403).json({ message: "Access Denied!" });
    }
};
