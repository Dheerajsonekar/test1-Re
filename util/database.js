const Sequelize = require('sequelize');

const sequelize = new Sequelize("node-complete", "root", "Kalki@151", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;