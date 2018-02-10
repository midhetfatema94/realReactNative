import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import { API_LOADING, API_FAILURE, API_SUCCESS } from './types';


const serviceLoading = () => ({
  type: API_LOADING,
});

const serviceSuccess = data => ({
  type: API_SUCCESS,
  payload: data,
});

const serviceFailure = error => ({
  type: API_FAILURE,
  payload: error,
});

export const fetchUserData = () => (dispatch) => {
  dispatch(serviceLoading());
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/${currentUser.uid}/attendance`)
    .on('value', (snapshot) => {
      console.log('user data', snapshot.val());
      dispatch(serviceSuccess(snapshot.val()));
    });
};

export const google = () => (dispatch) => {
  dispatch(serviceLoading());
  // Using a popup.
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider)
    .then((result) => {
      // This gives you a Google Access Token.
      // const token = result.credential.accessToken;
      // The signed-in user info.
      dispatch(serviceSuccess(result.user));
    })
    .catch(error => dispatch(serviceFailure(error)));
};
