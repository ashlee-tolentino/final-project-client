import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: "",

      errors: {},

      redirect: false,
      redirectId: null
    };
  }

  componentDidMount() {
    // needed for campus dropdown
    this.props.fetchAllCampuses();
  }

  validate = () => {
    const errors = {};
    if (!this.state.firstname.trim()) errors.firstname = "First name is required.";
    if (!this.state.lastname.trim()) errors.lastname = "Last name is required.";

    if (!this.state.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(this.state.email)) errors.email = "Invalid email.";

    if (this.state.gpa !== "") {
      const g = Number(this.state.gpa);
      if (Number.isNaN(g) || g < 0 || g > 4) errors.gpa = "GPA must be between 0.0 and 4.0";
    }

    return errors;
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length) return;

    const student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa === "" ? null : Number(this.state.gpa),
      campusId: this.state.campusId === "" ? null : Number(this.state.campusId),
    };

    const newStudent = await this.props.addStudent(student);

    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: "",
      errors: {},

      redirect: true,
      redirectId: newStudent?.id ?? null
    });
  }

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    if (this.state.redirect && this.state.redirectId) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <NewStudentView
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

const mapState = (state) => ({
  allCampuses: state.allCampuses,
});

const mapDispatch = (dispatch) => ({
  addStudent: (student) => dispatch(addStudentThunk(student)),
  fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
});

export default connect(mapState, mapDispatch)(NewStudentContainer);
