import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TaskFormReducer from './TaskFormReducer';
import MapReducer from './MapReducer';
import TaskListReducer from './TaskListReducer';
import DirectionsReducer from './DirectionsReducer';

export default combineReducers({
  directions: DirectionsReducer,
  auth: AuthReducer,
  taskForm: TaskFormReducer,
  map: MapReducer,
  taskList: TaskListReducer
});
