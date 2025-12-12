import { Link } from "react-router-dom";

const AllStudentsView = ({ students, deleteStudent }) => {
  // No students case
  if (!students.length) {
    return (
      <div>
        <h1>All Students</h1>
        <p>There are no students.</p>

        <Link to="/newstudent">
          <button>Add New Student</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>All Students</h1>

      {students.map((student) => {
        const name = `${student.firstname} ${student.lastname}`;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>

            {/* Student image */}
            {student.imageUrl && (
              <img
                src={student.imageUrl}
                alt={name}
                width="200"
              />
            )}

            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>GPA:</strong> {student.gpa ?? "N/A"}</p>

            {/* Actions */}
            <button onClick={() => deleteStudent(student.id)}>
              Delete
            </button>

            <Link to={`/student/${student.id}/edit`}>
              <button>Edit</button>
            </Link>

            <hr />
          </div>
        );
      })}

      <br />
      <Link to="/newstudent">
        <button>Add New Student</button>
      </Link>
      <br /><br />
    </div>
  );
};

export default AllStudentsView;
