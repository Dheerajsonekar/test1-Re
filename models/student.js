const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Student = sequelize.define('Student', {
   

    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
}, {
    tableName: 'student'
})


module.exports = Student