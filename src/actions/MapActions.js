import { Alert } from 'react-native';
import axios from 'axios';
import RNGooglePlaces from 'react-native-google-places';
import {
  MAP_INITIALIZE,
  MAP_INITIALIZE_START,
  MAP_UPDATE_SUCCESS,
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

        dispatch({
          type: MAP_INITIALIZE,
          payload: { lat, long, name }
        });
      })
      .catch((error) => console.log(error.message));
  };
};


export const mapUpdate = () => {
    return (dispatch) => {
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=kentpark')
        .then((response) => {
          const responseStr = JSON.stringify(response.data);
          const responseObj = JSON.parse(responseStr);
          const lat = responseObj.results[0].geometry.location.lat;
          const long = responseObj.results[0].geometry.location.lng;

          //Alert.alert(JSON.stringify(long));

          mapUpdateSuccess(dispatch, lat, long);
        }
      );
    };
};

const mapUpdateSuccess = (dispatch, lat, long) => {
  //Alert.alert(JSON.stringify(long));
  dispatch({
    type: MAP_UPDATE_SUCCESS,
    payload: { lat, long }
  });
};

export const mapSearch = () => {
  return (dispatch) => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        const lat = place.latitude;
        const long = place.longitude;
        const name = place.name;
        const address = place.address;

        dispatch({
          type: MAP_SEARCH,
          payload: { lat, long, name, address }
        });
      })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  };
};
