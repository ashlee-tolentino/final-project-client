/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import axios from 'axios';
import * as ac from './actions/actionCreators';

// -------------------- CAMPUSES --------------------

// GET all campuses
export const fetchAllCampusesThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/campuses');
    dispatch(ac.fetchAllCampuses(res.data));
  } catch (err) {
    console.error(err);
  }
};

// GET single campus
export const fetchCampusThunk = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/campuses/${id}`);
    dispatch(ac.fetchCampus(res.data));
  } catch (err) {
    console.error(err);
  }
};

// ADD campus
export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    const res = await axios.post('/api/campuses', campus);
    dispatch(ac.addCampus(res.data));     // <-- requires addCampus action creator
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// DELETE campus
export const deleteCampusThunk = (campusId) => async (dispatch) => {
  try {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(ac.deleteCampus(campusId));  // <-- requires deleteCampus action creator
  } catch (err) {
    console.error(err);
  }
};

// EDIT campus
export const editCampusThunk = (campus) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/campuses/${campus.id}`, campus);
    dispatch(ac.editCampus(res.data));    // <-- requires editCampus action creator
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// -------------------- STUDENTS --------------------

// GET all students
export const fetchAllStudentsThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/students');
    dispatch(ac.fetchAllStudents(res.data));
  } catch (err) {
    console.error(err);
  }
};

// ADD student
export const addStudentThunk = (student) => async (dispatch) => {
  try {
    const res = await axios.post('/api/students', student);
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// DELETE student
export const deleteStudentThunk = (studentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/students/${studentId}`);
    dispatch(ac.deleteStudent(studentId));
  } catch (err) {
    console.error(err);
  }
};

// EDIT student  ✅ FIXED
export const editStudentThunk = (student) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/students/${student.id}`, student);
    dispatch(ac.editStudent(res.data));   // <-- FIX: use res.data
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// GET single student
export const fetchStudentThunk = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/students/${id}`);
    dispatch(ac.fetchStudent(res.data));
  } catch (err) {
    console.error(err);
  }
};