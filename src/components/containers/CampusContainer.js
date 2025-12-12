import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, deleteCampusThunk } from "../../store/thunks";
import { CampusView } from "../views";

class CampusContainer extends Component {
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
  }

  handleDelete = async () => {
    const campusId = this.props.match.params.id;
    await this.props.deleteCampus(campusId);
    this.props.history.push("/campuses");
  };

  render() {
    return (
      <div>
        <Header />
        <CampusView
          campus={this.props.campus}
          deleteCampus={this.handleDelete}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  campus: state.campus,
});

const mapDispatch = (dispatch) => ({
  fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  deleteCampus: (id) => dispatch(deleteCampusThunk(id)),
});

export default connect(mapState, mapDispatch)(CampusContainer);
