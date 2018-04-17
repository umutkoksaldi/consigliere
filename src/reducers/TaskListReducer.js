import {
  TASK_FETCH_SUCCESS,
  DISTANCE_FETCH_SUCCESS,
  TASK_FETCH
} from '../actions/types';

const INITIAL_STATE = {
  fetching: false,
  payload: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case TASK_FETCH_SUCCESS:
      return { ...state, fetching: false, payload: action.payload };
      case DISTANCE_FETCH_SUCCESS:
        return { ...state };
      case TASK_FETCH:
        return { ...state, fetching: true };
      default:
        return state;
  }
};
