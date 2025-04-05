const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

///////////////////////// LOGIN /////////////////////////////

router.post("/login", authController.studentLogin);
router.post("/adminlogin", authController.adminLogin);
router.delete("/logout", authController.logout);
router.get("/me", verifyToken, authController.me);

module.exports = router;
