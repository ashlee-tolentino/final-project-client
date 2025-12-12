import PropTypes from "prop-types";

const NewCampusView = ({
  name,
  address,
  description,
  imageUrl,
  errors,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div>
      <h1>Add New Campus</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Campus Name *</label>
          <br />
          <input name="name" value={name} onChange={handleChange} />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label>Address *</label>
          <br />
          <input name="address" value={address} onChange={handleChange} />
          {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
        </div>

        <div>
          <label>Description</label>
          <br />
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div>
          <label>Image URL</label>
          <br />
          <input name="imageUrl" value={imageUrl} onChange={handleChange} />
        </div>

        <br />
        <button type="submit">Create Campus</button>
      </form>
    </div>
  );
};

NewCampusView.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default NewCampusView;
