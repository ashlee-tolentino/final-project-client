import PropTypes from "prop-types";

const EditStudentView = ({
  firstname,
  lastname,
  email,
  imageUrl,
  gpa,
  campusId,
  campuses,
  errors,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div>
      <h1>Edit Student</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name *</label>
          <br />
          <input name="firstname" value={firstname} onChange={handleChange} />
          {errors.firstname && <p style={{ color: "red" }}>{errors.firstname}</p>}
        </div>

        <div>
          <label>Last Name *</label>
          <br />
          <input name="lastname" value={lastname} onChange={handleChange} />
          {errors.lastname && <p style={{ color: "red" }}>{errors.lastname}</p>}
        </div>

        <div>
          <label>Email *</label>
          <br />
          <input name="email" value={email} onChange={handleChange} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Image URL</label>
          <br />
          <input name="imageUrl" value={imageUrl} onChange={handleChange} />
        </div>

        <div>
          <label>GPA (0.0 - 4.0)</label>
          <br />
          <input name="gpa" value={gpa} onChange={handleChange} />
          {errors.gpa && <p style={{ color: "red" }}>{errors.gpa}</p>}
        </div>

        <div>
          <label>Campus</label>
          <br />
          <select name="campusId" value={campusId ?? ""} onChange={handleChange}>
            <option value="">Not Enrolled</option>
            {campuses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

EditStudentView.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  gpa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  campusId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  campuses: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditStudentView;
