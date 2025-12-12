/*==================================================
/src/store/reducers/campuses.js

Reducer for the list of all campuses.
================================================== */
import * as at from "../actions/actionTypes";

const allCampuses = (state = [], action) => {
  switch (action.type) {
    case at.FETCH_ALL_CAMPUSES:
      return action.payload;

    case at.ADD_CAMPUS:
      return [...state, action.payload];

    case at.DELETE_CAMPUS:
      // payload is campusId
      return state.filter((campus) => campus.id !== action.payload);

    case at.EDIT_CAMPUS:
      // payload is updated campus object
      return state.map((campus) =>
        campus.id === action.payload.id ? action.payload : campus
      );

    default:
      return state;
  }
};

export default allCampuses;