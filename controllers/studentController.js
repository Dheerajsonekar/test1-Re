const Student = require("../models/student");
const Attendance = require("../models/attendance");

exports.getStudent = async (req, res) => {
  try {
    const date = req.query.date;
    const students = await Student.findAll({
      include: {
        model: Attendance,
        as: 'Attendances', 
        where: { date },
        required: false,
      },
    });
    return res.status(200).json(students);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.postAttendence = async (req, res) => {
  try {
    const { attendance } = req.body;
    await Attendance.bulkCreate(attendance);
    return res.status(201).json({ message: "attendance marked" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getAttendence = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [{ model: Attendance , as: 'Attendances'}],
    });

    const report = students.map((student) => ({
      name: student.name,
      present: student.Attendances.filter((a) => a.status === "present").length,
      total: student.Attendances.length,
    }));

    res.json(report);
  } catch (err) {
    console.log(err);
  }
};
