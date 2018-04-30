import firebase from 'firebase';
import axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNGooglePlaces from 'react-native-google-places';
import Polyline from '@mapbox/polyline';
import {
  TASK_UPDATE,
  TASK_CREATE,
  TASK_FETCH,
  TASK_FETCH_SUCCESS,
  DISTANCE_FETCH_SUCCESS,
  DIRECTIONS_FETCH_SUCCESS,
  DIRECTIONS_FETCH,
  TASK_UPDATE_SUCCESS,
  ERRAND_FETCH_SUCCESS,
  ERRAND_FETCH,
  ERRAND_CREATE,
  ERRAND_UPDATE_SUCCESS,
  ERRAND_UPDATE,
  RECURRENT_FETCH_SUCCESS,
  RECURRENT_CREATE,
  RECURRENT_UPDATE_SUCCESS,
  RECURRENT_UPDATE,
} from './types';


export const taskUpdate = ({ prop, value }) => {
  return {
    type: TASK_UPDATE,
    payload: { prop, value }
  };
};
export const recurrentUpdate = ({ prop, value }) => {
  return {
    type: RECURRENT_UPDATE,
    payload: { prop, value }
  };
};

export const errandUpdate = ({ prop, value }) => {
  return {
    type: ERRAND_UPDATE,
    payload: { prop, value }
  };
};

export const taskCreate = ({ taskName, time, placeId, date, lat, long, uid, taskPlaceName }) => {
  const { currentUser } = firebase.auth();
  const datenew = date.toISOString().split('T')[0];
  const time1 = time.toLocaleTimeString();
  if (uid.trim() === '') {
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/tasks/${datenew}`)
      .push({ taskName, time1, placeId, lat, long, taskPlaceName });

      dispatch({
        type: TASK_CREATE,
      });

      Actions.mainTab({ type: 'reset' });
    };
  }
    return (dispatch) => {
      firebase.database().ref(`users/${currentUser.uid}/tasks/${datenew}/${uid}`)
          .set({ taskName, time1, placeId, lat, long, taskPlaceName })
          .then(() => {
              dispatch({ type: TASK_UPDATE_SUCCESS });
              Actions.mainTab({ type: 'reset' });
      }); 
    };
};

export const errandCreate = ({ taskName, placeId, lat, long, uid }) => {
  const { currentUser } = firebase.auth();

  if (uid.trim() === '') {
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/errands/`)
      .push({ taskName, placeId, lat, long, type: 'errand' });

      dispatch({
        type: ERRAND_CREATE,
      });

      Actions.mainTab({ type: 'reset' });
    };
  }
    return (dispatch) => {
      firebase.database().ref(`users/${currentUser.uid}/errands/${uid}`)
          .set({ taskName, placeId, lat, long })
          .then(() => {
              dispatch({ type: ERRAND_UPDATE_SUCCESS });
              Actions.mainTab({ type: 'reset' });
      }); 
    };

};

export const recurrentCreate = ({ taskName, time, placeId, date, lat, long, uid, interval }) => {
  const { currentUser } = firebase.auth();
  var time1 = '';
  var datenew = '';
  console.log(interval);
  if (date !== '') {
    datenew = date.toISOString().split('T')[0];
  }
    
  if (time !== ''){
    time1 = time.toLocaleTimeString();
  }

  if (uid.trim() === '') {
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/recurrents/`)
      .push({ taskName, date: datenew, time: time1, placeId, lat, long, type: 'recurrent', interval });

      dispatch({
        type: RECURRENT_CREATE,
      });

      Actions.mainTab({ type: 'reset' });
    };
  }
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/recurrents/`)
          .set({ taskName, date: datenew, time: time1, placeId, lat, long, type: 'recurrent', interval })
          .then(() => {
              dispatch({ type: RECURRENT_UPDATE_SUCCESS });
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

export const errandFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: ERRAND_FETCH });
    firebase.database().ref(`/users/${currentUser.uid}/errands`)
      .on('value', snapshot => {
        dispatch({
          type: ERRAND_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const recurrentFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: TASK_FETCH });
    firebase.database().ref(`/users/${currentUser.uid}/recurrents`)
      .on('value', snapshot => {
        dispatch({
          type: RECURRENT_FETCH_SUCCESS,
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

export const getDirections = (startId, endId) => {
  console.log(startId, endId);
  return (dispatch) => {
    dispatch({ type: DIRECTIONS_FETCH });
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?mode='driving'&origin=place_id:${startId}&destination=place_id:${endId}&key=AIzaSyAhUH_qHOXnPrDiAz4SdIRFOGAUIiC4V0o`)
    .then((response) => {
      const points = Polyline.decode(response.data.routes[0].overview_polyline.points);
      const coords = points.map((point, index) => {
        return {
            latitude: point[0],
            longitude: point[1]
        };
    });
    console.log(coords);
    dispatch({ type: DIRECTIONS_FETCH_SUCCESS, payload: coords });
      // return (dispatch) => {
      //   dispatch({
      //     type: DIRECTIONS_FETCH_SUCCESS,
      //     payload: coords
      //   });
      // };
    });
  };
};

export const errandDelete = ({ uid }) => {
  console.log('deleteErrand');
  const { currentUser } = firebase.auth();
  console.log(`users/${currentUser.uid}/errands/${uid}`);
  //const datenew = date.toISOString().split('T')[0];
    return () => {
        firebase.database().ref(`users/${currentUser.uid}/errands/${uid}`)
            .remove();
    };
};

export const taskDelete = ({ uid, date }) => {
  console.log('deletetask');
  const { currentUser } = firebase.auth();
  console.log(`users/${currentUser.uid}/tasks/${date}/${uid}`);
  //const datenew = date.toISOString().split('T')[0];
    return () => {
        firebase.database().ref(`users/${currentUser.uid}/tasks/${date}/${uid}`)
            .remove();
    };
};

export const recurrentDelete = ({ uid }) => {
  console.log('deleteRecurrent');
  const { currentUser } = firebase.auth();
  console.log(`users/${currentUser.uid}/recurrents/${uid}`);
  //const datenew = date.toISOString().split('T')[0];
    return () => {
        firebase.database().ref(`users/${currentUser.uid}/recurrents/${uid}`)
            .remove();
    };
};
