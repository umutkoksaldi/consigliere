import {
    ERRAND_FETCH,
    ERRAND_FETCH_SUCCESS
  } from '../actions/types';
  
  const INITIAL_STATE = {
    fetching: false,
    payload: ''
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ERRAND_FETCH_SUCCESS:
        return { ...state, fetching: false, payload: action.payload };
        case ERRAND_FETCH:
          return { ...state, fetching: true };
        default:
          return state;
    }
  };
