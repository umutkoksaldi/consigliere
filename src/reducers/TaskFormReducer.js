import {
  TASK_UPDATE,
  TASK_CREATE,
  TASK_UPDATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  taskName: '',
  time: '',
  placeId: '',
  uid: '',
  lat: 0,
  long: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case TASK_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
      case TASK_CREATE:
        return { ...state, ...INITIAL_STATE };
      case TASK_UPDATE_SUCCESS:
        return { ...state, ...INITIAL_STATE };
      default:
        return state;
  }
};
