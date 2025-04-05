const User = require("../models/userModel");
const ConfessionGroup = require("../models/confessionGroupModel");
const s3 = require("../config/s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const Confession = require("../models/confessionModel");

// Get all users
module.exports.getAllStudents = async (req, res) => {
    try {
        const users = await User.find().select("-__v");
        res.status(200).json({ message: "success", users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single user by studentID
module.exports.getStudentById = async (req, res) => {
    try {
        const user = await User.findOne({ studentId: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Create a new user
module.exports.createStudent = async (req, res) => {
    try {
        const { studentId, name } = req.body;

        if (!studentId || !name) {
            return res.status(400).json({ message: "Student ID and Name are required" });
        }

        const existingUser = await User.findOne({ studentId });
        if (existingUser) {
            return res.status(400).json({ message: "Student ID already exists" });
        }

        const newUser = new User({ studentId, name });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update user details
module.exports.updateStudent = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ studentId: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a user
module.exports.deleteStudent = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Create a new confession group
module.exports.createConfessionGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        let fileUrl = null; // Default to null if no file is uploaded

        if (req.file) {
            const file = req.file;
            // const fileKey = `uploads/${Date.now()}_${file.originalname}`;
            const fileKey = req.file.originalname;

            // Upload file to S3
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            await s3.send(new PutObjectCommand(uploadParams));

            // Construct File URL
            fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        }

        // Create a new Confession Group object
        const confessionGroupData = {
            name,
            description,
            createdBy: req.user.id, // Assuming you have user info from auth middleware
        };

        // Only add bgImage if a file was uploaded
        if (fileUrl) {
            confessionGroupData.groupIcon = fileUrl;
        }

        // Create and save the Confession Group
        const confessionGroup = new ConfessionGroup(confessionGroupData);
        const savedGroup = await confessionGroup.save();

        res.status(201).json({
            success: true,
            data: savedGroup,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all confession groups
module.exports.getAllConfessionGroups = async (req, res) => {
    try {
        const confessionGroups = await ConfessionGroup.find()
            .populate("createdBy", "username")
            .populate("members", "username")
            .populate("confessions");

        res.status(200).json({
            success: true,
            data: confessionGroups,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get single confession group by ID
module.exports.getConfessionGroup = async (req, res) => {
    try {
        const confessionGroup = await ConfessionGroup.findById(req.params.id)
            .populate("createdBy", "username")
            .populate("members", "username")
            .populate("confessions");

        if (!confessionGroup) {
            return res.status(404).json({
                success: false,
                message: "Confession group not found",
            });
        }

        res.status(200).json({
            success: true,
            data: confessionGroup,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update confession group
module.exports.updateConfessionGroup = async (req, res) => {
    try {
        const { name, description } = req.body;


        const updateData = { name, description };

        // If a file was uploaded, add groupIcon to updateData
        if (req.file) {
            const file = req.file;
            // const fileKey = `uploads/${Date.now()}_${file.originalname}`;
            const fileKey = req.file.originalname;

            // Upload file to S3
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            await s3.send(new PutObjectCommand(uploadParams));

            // Construct File URL
            fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

            updateData.groupIcon = fileUrl; // Store file path
        }

        let confessionGroup = await ConfessionGroup.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!confessionGroup) {
            return res.status(404).json({
                success: false,
                message: "Confession group not found",
            });
        }

        res.status(200).json({
            success: true,
            data: confessionGroup,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete confession group
module.exports.deleteConfessionGroup = async (req, res) => {
    try {
        const confessionGroup = await ConfessionGroup.findByIdAndDelete(req.params.id);

        if (!confessionGroup) {
            return res.status(404).json({
                success: false,
                message: "Confession group not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Confession group deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Add member to group
module.exports.addMember = async (req, res) => {
    try {
        const confessionGroup = await ConfessionGroup.findById(req.params.id);

        if (!confessionGroup) {
            return res.status(404).json({
                success: false,
                message: "Confession group not found",
            });
        }

        confessionGroup.members.push(req.body.userId);
        await confessionGroup.save();

        res.status(200).json({
            success: true,
            data: confessionGroup,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

//get group confessions

module.exports.getGroupConfessions = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const confessions = await Confession.find({ confessionGroup: groupId }).populate("user", "name");
        res.status(200).json({ message: "Confessions fetched successfully", confessions });
    } catch (error) {
        res.status(500).json({ message: "Confessions fetched failed", error: error.message });
    }
};

// delete confession

module.exports.deleteConfession = async (req, res) => {
    try {
        const { groupId, confessionId } = req.params;

        // Find the group and update it by pulling the confessionId from the confessions array
        const updatedGroup = await ConfessionGroup.findByIdAndUpdate(
            groupId,
            { $pull: { confessions: confessionId } }, // Remove confessionId from confessions array
            { new: true, runValidators: true } // Return updated document and run validators
        );

        // Check if the group exists
        if (!updatedGroup) {
            return res.status(404).json({
                success: false,
                message: "Confession group not found",
            });
        }

        await Confession.findByIdAndDelete(confessionId);

        // Optional: Check if the confessionId was actually in the array
        // If confessions array didn't change, it might mean the confessionId wasn't found
        const confessionExisted = updatedGroup.confessions.some((id) => id.toString() === confessionId);
        if (!confessionExisted && updatedGroup.confessions.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Confession not found in this group",
            });
        }


        // Success response
        res.status(200).json({
            success: true,
            message: "Confession deleted successfully",
            data: updatedGroup,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete confession",
            error: error.message,
        });
    }
};
