import {
  TASK_UPDATE,
  TASK_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  taskName: '',
  time: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case TASK_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
      case TASK_CREATE:
        return { ...state, ...INITIAL_STATE };
      default:
        return state;
  }
};
