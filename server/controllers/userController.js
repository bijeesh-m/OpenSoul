const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");
const ConfessionGroup = require("../models/confessionGroupModel");
const Confession = require("../models/confessionModel");
const User = require("../models/userModel");

// Create a new confession

module.exports.createConfession = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const { title, body } = req.body;

        const user = req.user.id; // Assuming authentication middleware is used

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

        // Find the confession group
        const group = await ConfessionGroup.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Confession group not found" });
        }

        // Create new confession
        let confession = {
            user,
            confessionGroup: groupId,
            title,
            body,
        };

        if (fileUrl) {
            confession.image = fileUrl;
        }

        // Save confession
        const newConfession = new Confession(confession);
        let savedConfession = await newConfession.save();

        // Populate user data
        savedConfession = await savedConfession.populate("user");

        // Add confession ID to group
        group.confessions.push(savedConfession._id);
        await group.save();

        res.status(201).json(savedConfession);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating confession", error: error.message });
    }
};

// Get other confession groups

module.exports.getOtherConfessionGroups = async (req, res) => {
    try {
        const confessionGroups = await ConfessionGroup.find({ members: { $ne: req.user.id } });
        res.status(200).json({ message: "success", confessionGroups });
    } catch (error) {
        res.status(500).json({ message: "Error geting confession groups", error: error.message });
    }
};

// Get all confession groups

module.exports.getAllConfessionGroups = async (req, res) => {
    try {
        const confessionGroups = await ConfessionGroup.find();
        res.status(200).json({ message: "success", confessionGroups });
    } catch (error) {
        res.status(500).json({ message: "Error geting confession groups", error: error.message });
    }
};

// Get group by id

module.exports.getConfessionGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const confessionGroup = await ConfessionGroup.findById(groupId).populate({
            path: "confessions",
            populate: [
                { path: "user", select: "username" }, // Populate confession owner
                { path: "comments.user", select: "username" }, // Populate user in comments
            ],
        });
        res.status(200).json({ message: "success", confessionGroup });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error geting confession group", error: error.message });
    }
};

//Join a group

module.exports.joinGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.user.id;

        // Check if user is already a member
        const confessionGroup = await ConfessionGroup.findById(groupId);
        if (!confessionGroup) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (confessionGroup.members.includes(userId)) {
            return res.status(400).json({ message: "User is already a member of this group" });
        }

        // Add user to the group
        confessionGroup.members.push(userId);
        await confessionGroup.save();

        // Add group to user's joined groups
        await User.findByIdAndUpdate(userId, { $addToSet: { confessionGroups: confessionGroup._id } });

        res.status(200).json({ message: "Success", confessionGroup });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error joining confession group", error: error.message });
    }
};

// Get all confessions in a group
module.exports.getConfessionsByGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const confessions = await Confession.find({ confessionGroup: groupId })
            .populate("user", "username") // Only populate username if not anonymous
            .populate("likes", "username")
            .populate("comments.user", "username")
            .sort({ createdAt: -1 });

        res.json(confessions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching confessions", error: error.message });
    }
};

// Like a confession
module.exports.likeConfession = async (req, res) => {
    try {
        const { confessionId } = req.params;
        const userId = req.user.id;

        const confession = await Confession.findById(confessionId);
        if (!confession) {
            return res.status(404).json({ message: "Confession not found" });
        }

        // Check if user already liked
        if (confession.likes.includes(userId)) {
            confession.likes = confession.likes.filter((id) => id.toString() !== userId.toString());
        } else {
            confession.likes.push(userId);
        }

        await confession.save();
        // Populate likes and comments before sending the response
        const updatedConfession = await Confession.findById(confessionId)
            .populate("comments.user", "username") // Populate comments' user field
            .populate("user"); // Populate user field

        res.json(updatedConfession);
    } catch (error) {
        res.status(500).json({ message: "Error liking confession", error: error.message });
    }
};

// Add a comment
module.exports.addComment = async (req, res) => {
    try {
        const { confessionId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        const confession = await Confession.findById(confessionId);
        if (!confession) {
            return res.status(404).json({ message: "Confession not found" });
        }

        confession.comments.push({
            user: userId,
            text,
        });

        await confession.save();
        const updatedConfession = await Confession.findById(confessionId).populate("comments.user").populate("user");


        res.status(201).json(updatedConfession);
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};

// Delete a confession (only by the creator)
module.exports.deleteConfession = async (req, res) => {
    try {
        const { confessionId } = req.params;
        const userId = req.user.id;

        const confession = await Confession.findByIdAndDelete(confessionId);
        if (!confession) {
            return res.status(404).json({ message: "Confession not found" });
        }

        if (confession.user.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this confession" });
        }

        res.json({ message: "Confession deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting confession", error: error.message });
    }
};
