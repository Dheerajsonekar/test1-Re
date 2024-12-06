const express = require('express');

const router = express.Router();
const {getStudent, postAttendence, getAttendence} = require('../controllers/studentController');

router.get('/students', getStudent);

router.post('/attendance', postAttendence);

router.get('/report',  getAttendence);

module.exports = router;
