const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getTeacherInfoController,
  updateProfileController,
  getTeacherByIdController,
  teacherAppointmentsController,
  updateStatusController,
} = require("../controllers/teacherCtrl");
const router = express.Router();

// Post single Teacher info
router.post("/getTeacherInfo", authMiddleware, getTeacherInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST GET SINGLE TEACHER INFO
router.post("/getTeacherById", authMiddleware, getTeacherByIdController);

//Get appoitnments
router.get(
  "/teacher-appointments",
  authMiddleware,
  teacherAppointmentsController
);

//POST update status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
