const express = require("express");
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const router = express.Router();

router.use(verifyToken);

router
    .route("/confession-group")
    .post(upload.single("bgImage"), adminController.createConfessionGroup)
    .get(adminController.getAllConfessionGroups);

router
    .route("/confession-group/:id")
    .get(adminController.getConfessionGroup)
    .put(upload.single("bgImage"), adminController.updateConfessionGroup)
    .delete(adminController.deleteConfessionGroup);

router.route("/confession-group/:id/add-member").put(adminController.addMember);

router.get("/confessions/:groupId", adminController.getGroupConfessions);
router.delete("/confession-group/:groupId/confession/:confessionId", adminController.deleteConfession);

router.get("/student", adminController.getAllStudents);
router.get("/student/:id", adminController.getStudentById);
router.post("/student", adminController.createStudent);
router.put("/student/:id", adminController.updateStudent);
router.delete("/student/:id", adminController.deleteStudent);

module.exports = router;
