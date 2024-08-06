const appointmentModel = require("../models/appointmentModel");
const teacherModel = require("../models/teacherModel");
const userModel = require("../models/userModels");
const getTeacherInfoController = async (req, res) => {
  try {
    const teacher = await teacherModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Fetched teacher data Successfully",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Teacher Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const teacher = await teacherModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Teacher profile updated",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Teacher profile update issue",
      error,
    });
  }
};

//get single doctor
const getTeacherByIdController = async (req, res) => {
  try {
    const teacher = await teacherModel.findOne({ _id: req.body.teacherId });
    res.status(200).send({
      success: true,
      message: "Single Teacher Info fetched",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Single Teacher Info",
    });
  }
};

const teacherAppointmentsController = async (req, res) => {
  try {
    const teacher = await teacherModel.findOne({ userId: req.body.userId });
    const appointment = await appointmentModel.find({
      teacherId: teacher._id,
    });
    res.status(200).send({
      success: true,
      message: "Teacher Appointments Fetched SuccessFully",
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Teacher Appointment",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;

    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }

    const user = await userModel.findById(appointment.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (!user.notification) {
      user.notification = [];
    }

    let statusMessage = "";
    if (status === "approved") {
      statusMessage = "accepted";
    } else if (status === "rejected") {
      statusMessage = "rejected";
    } else {
      statusMessage = "updated";
    }

    user.notification.push({
      type: "Status Updated",
      message: `Your appointment has been ${statusMessage}.`,
      onClickPath: "/teacher-appointments",
    });

    await user.save();

    res.status(200).send({
      success: true,
      message: `Appointment has been ${statusMessage}`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in updating status",
    });
  }
};

module.exports = {
  getTeacherInfoController,
  updateProfileController,
  getTeacherByIdController,
  teacherAppointmentsController,
  updateStatusController,
};
