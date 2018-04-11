import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
        PASSWORD_CHANGED,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_FAIL,
        LOGIN_USER_START,
        CHECK_SESSION_START, 
        CHECK_SESSION_FAIL } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};

export const checkSession = () => {
  return (dispatch) => {
    dispatch({ type: CHECK_SESSION_START });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        loginUserSuccess(dispatch, user);
      }
      else {
        checkSessionFail(dispatch);
      }
    });
  };
}

const checkSessionFail = (dispatch) => {
  dispatch({ type: CHECK_SESSION_FAIL });
}

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main({ type: 'reset' });
};
