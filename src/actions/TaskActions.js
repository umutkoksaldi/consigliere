import firebase from 'firebase';
import axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNGooglePlaces from 'react-native-google-places';
import {
  TASK_UPDATE,
  TASK_CREATE,
  TASK_FETCH,
  TASK_FETCH_SUCCESS,
  DISTANCE_FETCH_SUCCESS,
  TASK_UPDATE_SUCCESS
} from './types';

export const taskUpdate = ({ prop, value }) => {
  return {
    type: TASK_UPDATE,
    payload: { prop, value }
  };
};

export const taskCreate = ({ taskName, time, placeId, lat, long, uid }) => {
  const { currentUser } = firebase.auth();
  if (uid.trim() === '') {
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/tasks`)
        .push({ taskName, time, placeId, lat, long });

      dispatch({
        type: TASK_CREATE,
      });

      Actions.mainTab({ type: 'reset' });
    };
  }
    return (dispatch) => {
      firebase.database().ref(`users/${currentUser.uid}/tasks/${uid}`)
          .set({ taskName, time, placeId, lat, long })
          .then(() => {
              dispatch({ type: TASK_UPDATE_SUCCESS });
              Actions.mainTab({ type: 'reset' });
      }); 
    };
};

export const taskFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: TASK_FETCH });
    firebase.database().ref(`/users/${currentUser.uid}/tasks`)
      .on('value', snapshot => {
        dispatch({
          type: TASK_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const distanceFetch = ({ todayTasks }) => {
  const placeId1 = todayTasks[0].placeId;

  RNGooglePlaces.getCurrentPlace()
    .then((results) => {
      this.currentPlaceId = results[0].placeID;
    });

  axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?mode='driving'&origins=place_id:${this.currentPlaceId}&destinations=place_id:${placeId1}&key=AIzaSyDuEG5mXcudxwDqnMlAy8GktKS-D0lf4P0`)
  .then((response) => {
    const now = new Date();
    const durationValue = (response.data.rows[0].elements[0].duration.value) * 1000;
    const durationText = response.data.rows[0].elements[0].duration.text;
    const estimatedArrivalValue = now.valueOf() + durationValue;
    const estimatedArrivalTime = new Date(estimatedArrivalValue);
    const alertMessage = `Current Time: ${now.toTimeString()} \nDuration: ${durationText} \nEstimated Arrival: ${estimatedArrivalTime.toTimeString()}`;
    Alert.alert('Task Details', alertMessage);
    //Alert.alert(JSON.stringify(response.data.rows[0].elements[0].duration.text));
  });

  return (dispatch) => {
    dispatch({
      type: DISTANCE_FETCH_SUCCESS
    });
  };
};

export const taskDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`users/${currentUser.uid}/tasks/${uid}`)
            .remove();
    };
};
