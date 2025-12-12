import Header from './Header';
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCampusThunk } from "../../store/thunks";
import NewCampusView from "../views/NewCampusView";

class NewCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      errors: {},
    };
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

    const newCampus = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
    };

    const created = await this.props.addCampus(newCampus);

    // Go to newly created campus page if possible, otherwise go back to list
    if (created && created.id) {
      this.props.history.push(`/campus/${created.id}`);
    } else {
      this.props.history.push("/campuses");
    }
  };

  render() {
    return (
      <div>
        <Header />
        <NewCampusView
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

NewCampusContainer.propTypes = {
  addCampus: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => ({
  addCampus: (campus) => dispatch(addCampusThunk(campus)),
});

export default connect(null, mapDispatch)(NewCampusContainer);