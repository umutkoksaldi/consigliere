import { Alert } from 'react-native';
import {
  MAP_INITIALIZE,
  MAP_INITIALIZE_START,
  MAP_UPDATE_SUCCESS,
  MAP_SEARCH
} from '../actions/types';

const INITIAL_STATE = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    name: '',
    address: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case MAP_INITIALIZE:
        return {
          ...state,
          ...INITIAL_STATE,
          latitude: action.payload.lat,
          longitude: action.payload.long,
          name: action.payload.name
        };
      case MAP_INITIALIZE_START:
        return {
          ...state,
          ...INITIAL_STATE,
          loading: true
        };
      case MAP_UPDATE_SUCCESS:
        // Alert.alert('In mapUpdateSuccess Reducer');
        return {
          ...state,
          latitude: action.payload.lat,
          longitude: action.payload.long
        };
      case MAP_SEARCH:
        return {
          ...state,
          latitude: action.payload.lat,
          longitude: action.payload.long,
          name: action.payload.name,
          address: action.payload.address
        };
      default:
        return state;
  }
};
