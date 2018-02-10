import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { Router, Stack, Scene } from 'react-native-router-flux';

import reducerStore from './reducers';
import LoginForm from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAAhpk1ORxU333iqC8dDpMB_OH2xEyeaB8',
      authDomain: 'lastpage-7e6d7.firebaseapp.com',
      databaseURL: 'https://lastpage-7e6d7.firebaseio.com',
      projectId: 'lastpage-7e6d7',
      storageBucket: 'lastpage-7e6d7.appspot.com',
      messagingSenderId: '635400608170',
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={reducerStore}>
        <View style={{ flex: 1 }}>
          <Router>
            <Stack key="root">
              <Scene key="login" component={LoginForm} title="Login to Last Page" />
              <Scene key="showDashboard" component={Dashboard} title="Dashboard" />
            </Stack>
          </Router>
        </View>
      </Provider>
    );
  }
}

export default App;
