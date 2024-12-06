const sequelize = require('./util/database');
const Student = require('./models/student');

const seedStudents = async () => {
  try {
    // Connect to the database
    await sequelize.sync();

    // Insert sample student data
    const students = [
      { name: 'Alice' },
      { name: 'Bob' },
      { name: 'Charlie' },
      { name: 'Dheeraj' },
      { name: 'Eve' },
    ];

    await Student.bulkCreate(students);
    console.log('Sample students added successfully.');
  } catch (err) {
    console.error('Error seeding students:', err);
  } finally {
    await sequelize.close();
  }
};

seedStudents();
