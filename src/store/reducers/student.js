/*==================================================
/src/store/reducers/student.js

Reducer for a single student.
================================================== */
import * as at from "../actions/actionTypes";

// Define default Initial state
const initialState = {
  campus: {},
};

const student = (state = initialState, action) => {
  switch (action.type) {
    case at.FETCH_STUDENT:
      return action.payload;

    case at.EDIT_STUDENT:
      // If the edited student is the one currently in state, update it
      if (state && state.id === action.payload.id) {
        return action.payload;
      }
      return state;

    case at.DELETE_STUDENT:
      // If the currently viewed student was deleted, reset state
      if (state && state.id === action.payload) {
        return initialState;
      }
      return state;

    default:
      return state;
  }
};

export default student;