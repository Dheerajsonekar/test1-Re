const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./util/database');
const Student = require('./models/student');
const Attendance = require('./models/attendance');
const studentRoutes = require('./routes/studentRoutes');
const PORT = 3000;

app.use(bodyParser.json())
app.use(express.static('public'));
app.use('/api', studentRoutes);


Student.hasMany(Attendance, { foreignKey: 'studentId', as: 'Attendances' });
Attendance.belongsTo(Student, { foreignKey: 'studentId', as: 'Student' });

sequelize
// .sync({force: true})
.sync()
.then(result=>{
    app.listen(PORT, ()=>{
        console.log(`Listening on the server ${PORT}.`);
    })
})
.catch(err=> {
    console.log(err);
})