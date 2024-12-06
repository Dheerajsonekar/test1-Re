async function fetchStudents() {
    const date = document.getElementById('attendanceDate').value;
  
    if (!date) {
      alert('Please select a date.');
      return;
    }
  
    const response = await fetch(`/api/students?date=${date}`);
    const students = await response.json();
  
    // Check if attendance is already marked for the date
    const isAttendanceMarked = students.some((student) =>
      student.Attendances.some((attendance) => attendance.date === date)
    );
  
    if (isAttendanceMarked) {
      // Show students with their marked attendance
      const attendanceDisplay = students
        .map((s) => {
          const attendance = s.Attendances.find((a) => a.date === date);
          const status = attendance ? attendance.status : 'Not marked';
          return `<div>${s.name}: ${status}</div>`;
        })
        .join('');
      document.getElementById('attendanceForm').innerHTML = attendanceDisplay;
  
      // Hide the "Mark Attendance" button
      document.getElementById('markAttendanceButton').style.display = 'none';
    } else {
      // Show the form to mark attendance
      const form = students
        .map(
          (s) => `
          <div>
            <span>${s.name}</span>
            <label>
              <input type="radio" name="status-${s.id}" value="present" /> Present
            </label>
            <label>
              <input type="radio" name="status-${s.id}" value="absent" /> Absent
            </label>
          </div>`
        )
        .join('');
      document.getElementById('attendanceForm').innerHTML = form;
  
      // Show the "Mark Attendance" button
      document.getElementById('markAttendanceButton').style.display = 'inline-block';
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
  
    await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attendance }),
    });
  
    alert('Attendance recorded');
    // Refresh the student list after marking attendance
    fetchStudents();
  }
  
  async function generateReport() {
    const response = await fetch('/api/report');
    const report = await response.json();
  
    const summary = report
      .map((r) => `<div>${r.name}: ${r.present}/${r.total}</div>`)
      .join('');
  
    document.getElementById('report').innerHTML = summary;
  }
  