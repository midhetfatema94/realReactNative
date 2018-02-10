import axios from 'axios';
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

export const emailLogin = (username, password) => (dispatch) => {
  dispatch(serviceLoading());
  firebase.auth().signInWithEmailAndPassword(username, password)
    .then((user) => {
      console.log('user details', user)
      dispatch(serviceSuccess(user));
      Actions.showDashboard();
    })
    .catch((error) => {
      dispatch(serviceFailure(error));
    });
};

export const facebookLogin = token => (dispatch) => {
  //   console.log('service success 1', token);
  dispatch(serviceLoading());
  axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}`)
    .then((response) => {
      // console.log('response', response.data.data);
      dispatch(serviceSuccess(response.data.data));
    })
    .catch(error => dispatch(serviceFailure(error)));
};

export const googleLogin = () => (dispatch) => {
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
