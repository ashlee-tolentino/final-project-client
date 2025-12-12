import { Link } from "react-router-dom";

const CampusView = ({ campus, deleteCampus }) => {
  // Safety: campus might not be loaded yet
  if (!campus || !campus.id) {
    return <p>Loading campus...</p>;
  }

  const students = campus.students || [];

  return (
    <div>
      <h1>{campus.name}</h1>

      {/* Campus image */}
      {campus.imageUrl && (
        <img
          src={campus.imageUrl}
          alt={campus.name}
          width="400"
        />
      )}

      <p><strong>Address:</strong> {campus.address}</p>
      <p>{campus.description}</p>

      {/* Actions */}
      <div style={{ marginBottom: "1rem" }}>
        <Link to={`/campus/${campus.id}/edit`}>
          <button>Edit Campus</button>
        </Link>

        {deleteCampus && (
          <button onClick={deleteCampus} style={{ marginLeft: "0.5rem" }}>
            Delete Campus
          </button>
        )}
      </div>

      <h2>Students Enrolled</h2>
      {students.length === 0 ? (
        <p>No students are currently enrolled at this campus.</p>
      ) : (
        students.map((student) => {
          const name = `${student.firstname} ${student.lastname}`;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h3>{name}</h3>
              </Link>
            </div>
          );
        })
      )}

      <br />
      <Link to="/newstudent">
        <button>Add New Student</button>
      </Link>
    </div>
  );
};

export default CampusView;
