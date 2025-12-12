import { Link } from "react-router-dom";

const StudentView = ({ student, deleteStudent, unenrollStudent }) => {
  // Loading safety
  if (!student || !student.id) {
    return <p>Loading student...</p>;
  }

  const name = `${student.firstname} ${student.lastname}`;
  const campusName = student.campus ? student.campus.name : "Not Enrolled";

  return (
    <div>
      <h1>{name}</h1>

      {student.imageUrl && (
        <img
          src={student.imageUrl}
          alt={name}
          width="250"
        />
      )}

      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>GPA:</strong> {student.gpa ?? "N/A"}</p>

      <p>
        <strong>Campus:</strong>{" "}
        {student.campus ? (
          <Link to={`/campus/${student.campus.id}`}>{campusName}</Link>
        ) : (
          campusName
        )}
      </p>

      <div style={{ marginTop: "1rem" }}>
        <Link to={`/student/${student.id}/edit`}>
          <button>Edit Student</button>
        </Link>

        {deleteStudent && (
          <button onClick={deleteStudent} style={{ marginLeft: "0.5rem" }}>
            Delete Student
          </button>
        )}

        {unenrollStudent && student.campusId && (
          <button onClick={unenrollStudent} style={{ marginLeft: "0.5rem" }}>
            Unenroll
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentView;
