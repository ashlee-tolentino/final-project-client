import Header from './Header';
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchStudentThunk, fetchAllCampusesThunk, editStudentThunk } from "../../store/thunks";
import EditStudentView from "../views/EditStudentView";

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: "",
      errors: {},
      loaded: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStudent(id);
    this.props.fetchAllCampuses();
  }

  componentDidUpdate(prevProps) {
    if (!this.state.loaded && this.props.student && this.props.student.id) {
      this.setState({
        firstname: this.props.student.firstname || "",
        lastname: this.props.student.lastname || "",
        email: this.props.student.email || "",
        imageUrl: this.props.student.imageUrl || "",
        gpa: this.props.student.gpa ?? "",
        campusId: this.props.student.campusId ?? "",
        loaded: true,
      });
    }

    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({ loaded: false });
      const { id } = this.props.match.params;
      this.props.fetchStudent(id);
    }
  }

  validate = () => {
    const errors = {};
    if (!this.state.firstname.trim()) errors.firstname = "First name is required.";
    if (!this.state.lastname.trim()) errors.lastname = "Last name is required.";
    if (!this.state.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(this.state.email)) errors.email = "Invalid email.";

    if (this.state.gpa !== "" && this.state.gpa !== null) {
      const g = Number(this.state.gpa);
      if (Number.isNaN(g) || g < 0 || g > 4) errors.gpa = "GPA must be between 0.0 and 4.0";
    }
    return errors;
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length) return;

    const { id } = this.props.match.params;

    const updates = {
      id: Number(id),
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa === "" ? null : Number(this.state.gpa),
      campusId: this.state.campusId === "" ? null : Number(this.state.campusId),
    };

    const updated = await this.props.editStudent(updates);
    this.props.history.push(`/student/${updated?.id || id}`);
  };

  render() {
    if (!this.props.student || !this.props.student.id) {
      return (
        <div>
          <Header />
          <p>Loading student...</p>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <EditStudentView
          firstname={this.state.firstname}
          lastname={this.state.lastname}
          email={this.state.email}
          imageUrl={this.state.imageUrl}
          gpa={this.state.gpa}
          campusId={this.state.campusId}
          campuses={this.props.allCampuses}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

EditStudentContainer.propTypes = {
  student: PropTypes.object.isRequired,
  allCampuses: PropTypes.array.isRequired,
  fetchStudent: PropTypes.func.isRequired,
  fetchAllCampuses: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  student: state.student,
  allCampuses: state.allCampuses,
});

const mapDispatch = (dispatch) => ({
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
  editStudent: (student) => dispatch(editStudentThunk(student)),
});

export default connect(mapState, mapDispatch)(EditStudentContainer);
