import { 
    DIRECTIONS_FETCH_SUCCESS,
    DIRECTIONS_FETCH
 } from '../actions/types';

 const INITIAL_STATE = {
    fetching: false,
    payload: []
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DIRECTIONS_FETCH:
            return { ...state, fetching: true };
        case DIRECTIONS_FETCH_SUCCESS:
            return { ...state, fetching: false, payload: action.payload };
        default:
            return state;
    }
  };
