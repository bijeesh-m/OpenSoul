const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");

// Apply authentication middleware to all routes
router.use(verifyToken);

// Create a new confession
router.post("/confession/:groupId", upload.single("image"), userController.createConfession);

// Get all confessions in a group
router.get("/confession/group/:groupId", userController.getConfessionsByGroup);

router.get("/other-groups", verifyToken, userController.getOtherConfessionGroups);

router.get("/confession-groups", verifyToken, userController.getAllConfessionGroups);

router.get("/confession-groups/:groupId", userController.getConfessionGroup);

router.post("/join-group/:groupId", userController.joinGroup);

// Like/unlike a confession
router.post("/confession/:confessionId/like", userController.likeConfession);

// Add a comment to a confession
router.post("/confession/:confessionId/comment", userController.addComment);

// Delete a confession
router.delete("/confession/:confessionId", verifyToken, userController.deleteConfession);

module.exports = router;
