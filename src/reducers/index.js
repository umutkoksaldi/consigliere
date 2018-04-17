import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TaskFormReducer from './TaskFormReducer';
import MapReducer from './MapReducer';
import TaskListReducer from './TaskListReducer';

export default combineReducers({
  auth: AuthReducer,
  taskForm: TaskFormReducer,
  map: MapReducer,
  taskList: TaskListReducer
});
