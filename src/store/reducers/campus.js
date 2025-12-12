/*==================================================
/src/store/reducers/campus.js

Reducer for a single campus.
================================================== */
import * as at from "../actions/actionTypes";

// Define default Initial State
const initialState = {
  students: [],
};

const campus = (state = initialState, action) => {
  switch (action.type) {
    case at.FETCH_CAMPUS:
      return action.payload;

    case at.EDIT_CAMPUS:
      // If you edited the same campus you're viewing, update it
      if (state && state.id === action.payload.id) {
        return action.payload;
      }
      return state;

    case at.DELETE_CAMPUS:
      // If the currently viewed campus was deleted, reset state
      if (state && state.id === action.payload) {
        return initialState;
      }
      return state;

    default:
      return state;
  }
};

export default campus;