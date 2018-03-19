import { Alert } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import {
  MAP_INITIALIZE,
  MAP_INITIALIZE_START,
  MAP_SEARCH
} from './types';

export const mapInitialize = () => {
  return (dispatch) => {
    dispatch({ type: MAP_INITIALIZE_START });

    RNGooglePlaces.getCurrentPlace()
      .then((results) => {
        const lat = results[0].latitude;
        const long = results[0].longitude;
        const name = results[0].name;
        const placeId = results[0].placeID;

        dispatch({
          type: MAP_INITIALIZE,
          payload: { lat, long, name, placeId }
        });
      })
      .catch((error) => console.log(error.message));
  };
};

export const mapSearch = () => {
  return (dispatch) => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        const lat = place.latitude;
        const long = place.longitude;
        const name = place.name;
        const address = place.address;
        const placeId = place.placeID;

        dispatch({
          type: MAP_SEARCH,
          payload: { lat, long, name, address, placeId }
        });
      })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  };
};
