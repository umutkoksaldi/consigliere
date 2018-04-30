import {
    RECURRENT_UPDATE,
    RECURRENT_CREATE,
    RECURRENT_UPDATE_SUCCESS
  } from '../actions/types';
  
  const INITIAL_STATE = {
    taskName: '',
    placeId: '',
    taskuid: '',
    lat: 0,
    long: 0,
    interval: '',
    date: '',
    time: ''
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RECURRENT_UPDATE:
          return { ...state, [action.payload.prop]: action.payload.value };
        case RECURRENT_CREATE:
          return { ...state, ...INITIAL_STATE };
        case RECURRENT_UPDATE_SUCCESS:
          return { ...state, ...INITIAL_STATE };
        default:
          return state;
    }
  };
