import {
    ERRAND_UPDATE,
    ERRAND_CREATE,
    ERRAND_UPDATE_SUCCESS
  } from '../actions/types';
  
  const INITIAL_STATE = {
    taskName: '',
    placeId: '',
    taskuid: '',
    taskPlaceName: '',
    lat: 0,
    long: 0
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ERRAND_UPDATE:
          return { ...state, [action.payload.prop]: action.payload.value };
        case ERRAND_CREATE:
          return { ...state, ...INITIAL_STATE };
        case ERRAND_UPDATE_SUCCESS:
          return { ...state, ...INITIAL_STATE };
        default:
          return state;
    }
  };
