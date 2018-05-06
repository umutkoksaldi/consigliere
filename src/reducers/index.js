import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TaskFormReducer from './TaskFormReducer';
import MapReducer from './MapReducer';
import TaskListReducer from './TaskListReducer';
import DirectionsReducer from './DirectionsReducer';
import ErrandListReducer from './ErrandListReducer';
import ErrandFormReducer from './ErrandFormReducer';
import RecurrentFormReducer from './RecurrentFormReducer';
import RecurrentListReducer from './RecurrentListReducer';
import LocationReducer from './LocationReducer';

export default combineReducers({
  directions: DirectionsReducer,
  auth: AuthReducer,
  taskForm: TaskFormReducer,
  map: MapReducer,
  location: LocationReducer,
  taskList: TaskListReducer,
  errandList: ErrandListReducer,
  errandForm: ErrandFormReducer,
  recurrentForm: RecurrentFormReducer,
  recurrentList: RecurrentListReducer
});
