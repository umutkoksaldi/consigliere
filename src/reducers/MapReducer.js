import { Alert } from 'react-native';
import {
  MAP_INITIALIZE,
  MAP_INITIALIZE_START,
  MAP_SEARCH,
  PLACEID_SEARCH,
  LAT_LONG_SEARCH
} from '../actions/types';

const INITIAL_STATE = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    name: '',
    address: '',
    loading: false,
    placeId: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case MAP_INITIALIZE:
        return {
          ...state,
          ...INITIAL_STATE,
          latitude: action.payload.lat,
          longitude: action.payload.long,
          name: action.payload.name,
          placeId: action.payload.placeId
        };
      case MAP_INITIALIZE_START:
        return {
          ...state,
          ...INITIAL_STATE,
          loading: true
        };
      case MAP_SEARCH:
        return {
          ...state,
          latitude: action.payload.lat,
          longitude: action.payload.long,
          name: action.payload.name,
          address: action.payload.address,
          placeId: action.payload.placeId
        };
      case PLACEID_SEARCH:
        return {
          ...state,
          latitude: action.payload.lat,
          longitude: action.payload.long,
          name: action.payload.name,
          address: action.payload.address,
          placeId: action.payload.placeId
        };
      case LAT_LONG_SEARCH:
        return {
          ...state,
          latitude: action.payload.lat,
          longitude: action.payload.long,
          name: action.payload.name,
          address: action.payload.address,
          placeId: action.payload.placeId
        };
      default:
        return state;
  }
};