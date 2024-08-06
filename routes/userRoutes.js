const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyTeacherController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllTeacherController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);
module.exports = router;

//Apply teacher || POST
router.post("/apply-teacher", authMiddleware, applyTeacherController);

//Notification teacher || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

//Notification-delete teacher || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//Get All Teachers
router.get("/getAllTeachers", authMiddleware, getAllTeacherController);

//Book appointmentModel
router.post("/book-appointment", authMiddleware, bookAppointmentController);

//Booking availability
router.post(
  "/booking-availability",
  authMiddleware,
  bookingAvailabilityController
);

//Appointments list
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
