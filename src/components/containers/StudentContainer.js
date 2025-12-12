import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk, deleteStudentThunk, editStudentThunk } from "../../store/thunks";
import { StudentView } from "../views";

class StudentContainer extends Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  handleDelete = async () => {
    const { id } = this.props.match.params;
    await this.props.deleteStudent(id);
    this.props.history.push("/students");
  };

  handleUnenroll = async () => {
    const { id } = this.props.match.params;
    await this.props.editStudent({
      id: Number(id),
      campusId: null, // unenroll
    });
    // refresh student after update (optional but clean)
    this.props.fetchStudent(id);
  };

  render() {
    return (
      <div>
        <Header />
        <StudentView
          student={this.props.student}
          deleteStudent={this.handleDelete}
          unenrollStudent={this.handleUnenroll}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  student: state.student,
});

const mapDispatch = (dispatch) => ({
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  deleteStudent: (id) => dispatch(deleteStudentThunk(id)),
  editStudent: (student) => dispatch(editStudentThunk(student)),
});

export default connect(mapState, mapDispatch)(StudentContainer);
