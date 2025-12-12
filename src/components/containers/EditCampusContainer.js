import Header from './Header';
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
import EditCampusView from "../views/EditCampusView";

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      errors: {},
      loaded: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCampus(id);
  }

  componentDidUpdate(prevProps) {
    // When campus arrives in props, load into local state once
    if (!this.state.loaded && this.props.campus && this.props.campus.id) {
      this.setState({
        name: this.props.campus.name || "",
        address: this.props.campus.address || "",
        description: this.props.campus.description || "",
        imageUrl: this.props.campus.imageUrl || "",
        loaded: true,
      });
    }

    // If route changes, refetch
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({ loaded: false });
      this.props.fetchCampus(this.props.match.params.id);
    }
  }

  validate = () => {
    const errors = {};
    if (!this.state.name.trim()) errors.name = "Campus name is required.";
    if (!this.state.address.trim()) errors.address = "Campus address is required.";
    return errors;
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length) return;

    const { id } = this.props.match.params;

    const updates = {
      id: Number(id),
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
    };

    const updated = await this.props.editCampus(updates);
    this.props.history.push(`/campus/${updated?.id || id}`);
  };

  render() {
    if (!this.props.campus || !this.props.campus.id) {
      return (
        <div>
          <Header />
          <p>Loading campus...</p>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <EditCampusView
          name={this.state.name}
          address={this.state.address}
          description={this.state.description}
          imageUrl={this.state.imageUrl}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

EditCampusContainer.propTypes = {
  campus: PropTypes.object.isRequired,
  fetchCampus: PropTypes.func.isRequired,
  editCampus: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  campus: state.campus,
});

const mapDispatch = (dispatch) => ({
  fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  editCampus: (campus) => dispatch(editCampusThunk(campus)),
});

export default connect(mapState, mapDispatch)(EditCampusContainer);
