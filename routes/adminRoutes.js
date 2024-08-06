const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllTeachersController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");

const router = express.Router();

//Get Method || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//Get Method || Teachers
router.get("/getAllTeachers", authMiddleware, getAllTeachersController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
