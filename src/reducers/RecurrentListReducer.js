import {
    RECURRENT_FETCH,
    RECURRENT_FETCH_SUCCESS
  } from '../actions/types';
  
  const INITIAL_STATE = {
    fetching: false,
    payload: ''
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RECURRENT_FETCH_SUCCESS:
        return { ...state, fetching: false, payload: action.payload };
        case RECURRENT_FETCH:
          return { ...state, fetching: true };
        default:
          return state;
    }
  };
