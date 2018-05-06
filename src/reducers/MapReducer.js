import { Alert } from 'react-native';
import {
  MAP_SEARCH,
  PLACEID_SEARCH,
  LAT_LONG_SEARCH
} from '../actions/types';

const INITIAL_STATE = {
    latitude: 38.3553627,
    longitude: 38.33352470000001,
    latitudeDelta: 0,
    longitudeDelta: 0,
    name: '',
    address: '',
    placeId: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
