import { combineReducers } from 'redux';
import LibraryReducer from './LibraryReducer';
import SelectionReducer from './SelectionReducer';
import AuthReducer from './AuthReducer';
import TaskFormReducer from './TaskFormReducer';
import MapReducer from './MapReducer';
import TaskListReducer from './TaskListReducer';

export default combineReducers({
  libraries: LibraryReducer,
  selectedLibraryId: SelectionReducer,
  auth: AuthReducer,
  taskForm: TaskFormReducer,
  map: MapReducer,
  taskList: TaskListReducer
});

