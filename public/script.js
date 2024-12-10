async function fetchStudents(event) {
  if (event) event.preventDefault();

  const date = document.getElementById('attendanceDate').value;

  if (!date) {
    alert('Please select a date.');
    return;
  }

  try {
    const response = await fetch(`/api/students?date=${date}`);
    const students = await response.json();

    const attendanceForm = document.getElementById('attendanceForm');
    const markAttendanceButton = document.getElementById('markAttendanceButton');

    // Check if attendance is already marked 
    const isAttendanceMarked = students.some((student) =>
      student.Attendances.some((attendance) => attendance.date === date)
    );

    if (isAttendanceMarked) {
      // Show students with their marked attendance
      const attendanceDisplay = students
        .map((student) => {
          const attendance = student.Attendances.find((a) => a.date === date);
          const status = attendance ? attendance.status : 'Not marked';
          return `<div><strong>${student.name}:</strong> ${status}</div>`;
        })
        .join('');
      attendanceForm.innerHTML = attendanceDisplay;
      markAttendanceButton.style.display = 'none';
    } else {
      // Show the form to mark attendance
      const form = students
        .map(
          (student) => `
          <div>
            <strong>${student.name}</strong>
            <label>
              <input type="radio" name="status-${student.id}" value="present" /> Present
            </label>
            <label>
              <input type="radio" name="status-${student.id}" value="absent" /> Absent
            </label>
          </div>`
        )
        .join('');
      attendanceForm.innerHTML = form;
      markAttendanceButton.style.display = 'inline-block';
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    alert('Failed to fetch students. Please try again.');
  }
}

async function submitAttendance() {
  const date = document.getElementById('attendanceDate').value;
  const inputs = document.querySelectorAll('[name^="status-"]:checked');

  if (inputs.length === 0) {
    alert('Please mark attendance for all students.');
    return;
  }

  const attendance = Array.from(inputs).map((input) => ({
    studentId: input.name.split('-')[1],
    date,
    status: input.value,
  }));

  try {
    await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attendance }),
    });

    
    
    fetchStudents();
  } catch (error) {
    console.error('Error submitting attendance:', error);
    
  }
}

async function generateReport() {
  try {
    const response = await fetch('/api/report');
    const report = await response.json();

    const summary = report
      .map(
        (r) =>
          `<div><strong>${r.name}:</strong> ${r.present}/${r.total} (${Math.round(
            (r.present * 100) / r.total
          )}%)</div>`
      )
      .join('');

    document.getElementById('report').innerHTML = summary;
  } catch (error) {
    console.error('Error generating report:', error);
    
  }
}



