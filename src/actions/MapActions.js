import { Alert } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import axios from 'axios';
import {
  MAP_INITIALIZE,
  MAP_INITIALIZE_START,
  MAP_SEARCH,
  PLACEID_SEARCH,
  LAT_LONG_SEARCH
} from './types';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAhUH_qHOXnPrDiAz4SdIRFOGAUIiC4V0o';

export const mapInitialize = () => {
  return (dispatch) => {
    dispatch({ type: MAP_INITIALIZE_START });
    const lat = 38.3553627;
    const long = 38.33352470000001;
    const name = 'malatya';
    const placeId = 'ChIJrUs8kuQ2dkARG0hf3kjsU6A';

        dispatch({
          type: MAP_INITIALIZE,
          payload: { lat, long, name, placeId }
        });
    // RNGooglePlaces.getCurrentPlace()
    //   .then((results) => {
    //     const lat = results[0].latitude;
    //     const long = results[0].longitude;
    //     const name = results[0].name;
    //     const placeId = results[0].placeID;

    //     dispatch({
    //       type: MAP_INITIALIZE,
    //       payload: { lat, long, name, placeId }
    //     });
    //   })
    //   .catch((error) => console.log(error.message));
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

export const placeIdSearch = (placeId) => {
  return (dispatch) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_MAPS_API_KEY}`)
    .then(response => {
      const info = response.data.result.geometry.location;
      console.log(info);
      dispatch({
        type: PLACEID_SEARCH,
        payload: { lat: info.lat, long: info.lng, name: info.name, address: info.formatted_address, placeId: info.place_id } 
      });
    });
  };
};
export const latLongSearch = (lat, long) => {
  console.log({ lat, long });
  return (dispatch) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=50&key=${GOOGLE_MAPS_API_KEY}`)
    .then(response => {
      const info = response.data.results[0]; 
      dispatch({
        type: LAT_LONG_SEARCH,
        payload: { lat: info.geometry.location.lat, long: info.geometry.location.lng, name: info.name, address: info.vicinity, placeId: info.place_id } 
      });
    });
  };
};