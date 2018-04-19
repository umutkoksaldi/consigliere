import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
        PASSWORD_CHANGED,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_FAIL,
        LOGIN_USER_START,
        CHECK_SESSION_START, 
        CHECK_SESSION_FAIL } from './types';
        import {
          Alert
        } from "react-native";
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
      .catch((error) =>
       {
        loginUserFail(dispatch,error.description);
        flag=1
        if (email ==='' ||password=='' ) {
          flag=0
          Alert.alert('Login Error','Enter e-mail / password');
      } 
        if (error.code === 'auth/wrong-password' && flag===1) {
          Alert.alert('Login Error','Wrong password.');
        }
         
        if (error.code === 'auth/user-not-found'&& flag===1) {
          Alert.alert('Login Error','No user with this e-mail');
      } 
        //alert(error.description);
        Actions.auth();
      });
      
  };
  
};
export const checkSession = () => {
  return (dispatch) => {
    dispatch({ type: CHECK_SESSION_START });
    firebase.auth().onAuthStateChanged((user) => {
      if (user ) {
     // if (user && firebase.auth().currentUser.emailVerified) {
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
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
 // if( firebase.auth().currentUser.emailVerified)
  Actions.main({ type: 'reset' });
  //else
 // Alert.alert('Login Error','User not verified');
};
const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

export const signuprequest = () => {
  Actions.signup();

};
export const passwordforgot = () => {
  Actions.forgotpw();
};
export const returnlogin = () => {
  Actions.login();
};
export const logout = () => {
  firebase.auth().signOut() ;
  Actions.auth();
  //dispatch({ type: LOGOUT_USER_SUCCESS });
};