import React, { Component } from 'react';  // 'react' inside node_modules folder installed by npm
import {
  Text,
  View,
  Alert
} from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Spinner } from 'native-base';
import reducers from './src/reducers';
import RouterComponent from './src/RouterComponent';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
const firebaseConfig = {
  apiKey: 'AIzaSyBu2bhqY4JW3NhbIuMTXaYSg_2Grujv5dY',
  authDomain: 'consigliere-app.firebaseapp.com',
  databaseURL: 'https://consigliere-app.firebaseio.com',
  projectId: 'consigliere-app',
  storageBucket: 'consigliere-app.appspot.com',
  messagingSenderId: '456626256285'
};

//Create a component
class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  onButtonPress() {
    firebase.auth.signOut().then(() => {
      Alert.alert('Signed Out');
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Provider store={store}>
              <RouterComponent />
          </Provider>
        );
      case false:
        return <Spinner color='#000000' />;
      default:
        return <Spinner color="#FFFFFF" />;
    }
  }


  render() {
    return (
      <Provider store={store}>
          <RouterComponent />
      </Provider>
    );
  }

}

export default App;
