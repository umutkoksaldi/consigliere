import { Alert } from 'react-native';
import {  
    MAP_INITIALIZE,
    MAP_INITIALIZE_START,
} from '../actions/types';

const INITIAL_STATE = {
    latitude: 0,
    longitude: 0,
    name: '',
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
        default:
          return state;
    }
};
