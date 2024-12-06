const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Attendance = sequelize.define('Attendance', {
   date: {
    type: Sequelize.DATEONLY,
    allowNull: false

   },

   status: {
    type: Sequelize.ENUM('present', 'absent'),
    allowNull: false
   }
},

{
    tableName: 'attendance'
}
);

module.exports = Attendance;