const express = require("express");
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const router = express.Router();

router
  .route("/confession-group")
  .all(verifyToken)
  .post(upload.single("bgImage"), adminController.createConfessionGroup)
  .get(adminController.getAllConfessionGroups);

router
  .route("/confession-group/:id")
  .all(verifyToken)
  .get(adminController.getConfessionGroup)
  .put(upload.single("bgImage"), adminController.updateConfessionGroup)
  .delete(adminController.deleteConfessionGroup);

router.put(adminController.addMember);

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

router
  .route("/student")
  .all(verifyToken)
  .get(adminController.getAllStudents)
  .post(adminController.createStudent);

router
  .route("/student/:id")
  .all(verifyToken)
  .get(adminController.getStudentById)
  .put(adminController.updateStudent)
  .delete(adminController.deleteStudent);

module.exports = router;
