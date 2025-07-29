const express = require("express");
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const router = express.Router();

router
  .route("/confession-group")
  .post(
    verifyToken,
    upload.single("bgImage"),
    adminController.createConfessionGroup
  )
  .get(verifyToken, adminController.getAllConfessionGroups);

router
  .route("/confession-group/:id")
  .get(verifyToken, adminController.getConfessionGroup)
  .put(
    verifyToken,
    upload.single("bgImage"),
    adminController.updateConfessionGroup
  )
  .delete(verifyToken, adminController.deleteConfessionGroup);

router.put(
  "/confession-group/:id/add-member",
  verifyToken,
  adminController.addMember
);

router.get(
  "/confessions/:groupId",
  verifyToken,
  adminController.getGroupConfessions
);
router.delete(
  "/confession-group/:groupId/confession/:confessionId",
  verifyToken,
  adminController.deleteConfession
);

router.get("/student", verifyToken, adminController.getAllStudents);
router.get("/student/:id", verifyToken, adminController.getStudentById);
router.post("/student", verifyToken, adminController.createStudent);
router.put("/student/:id", verifyToken, adminController.updateStudent);
router.delete("/student/:id", verifyToken, adminController.deleteStudent);

module.exports = router;
