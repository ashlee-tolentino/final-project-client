import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = ({ allCampuses, deleteCampus }) => {
  // No campuses case
  if (!allCampuses.length) {
    return (
      <div>
        <h1>All Campuses</h1>
        <p>There are no campuses.</p>

        <Link to="/campuses/new">
          <button>Add New Campus</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>All Campuses</h1>

      {allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>

          {/* Campus image */}
          {campus.imageUrl && (
            <img
              src={campus.imageUrl}
              alt={campus.name}
              width="300"
            />
          )}

          <h4>Campus ID: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>

          {/* Delete campus */}
          {deleteCampus && (
            <button onClick={() => deleteCampus(campus.id)}>
              Delete Campus
            </button>
          )}

          <hr />
        </div>
      ))}

      <br />
      <Link to="/campuses/new">
        <button>Add New Campus</button>
      </Link>
      <br /><br />
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  deleteCampus: PropTypes.func, // passed from container
};

export default AllCampusesView;
