import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { TASK_UPDATE, TASK_CREATE, TASK_FETCH, TASK_FETCH_SUCCESS } from './types';

export const taskUpdate = ({ prop, value }) => ({
    type: TASK_UPDATE,
    payload: { prop, value }
  });

export const taskCreate = ({ taskName, time, placeId, date }) => {
  const { currentUser } = firebase.auth();
const datenew = date.toDateString();
const timenew = time.toLocaleTimeString();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/tasks/${datenew}`)
      .push({ taskName, timenew, placeId });

    dispatch({
      type: TASK_CREATE,
    });

    Actions.mainTab({ type: 'reset' });
  };
};

export const taskFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/tasks`)
      .on('value', snapshot => {
        dispatch({
          type: TASK_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};
