import firebase from 'firebase';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
// import { View, Text } from 'react-native';
import reducers from './reducers';
// import LoginForm from './components/LoginForm';
import Router from './Router';


class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyDDDwj4rsT9IiGXCW6WKAk3ScCWnL77XI4',
            authDomain: 'manager-2788b.firebaseapp.com',
            databaseURL: 'https://manager-2788b.firebaseio.com',
            projectId: 'manager-2788b',
            storageBucket: '',
            messagingSenderId: '330746040322'
        };

        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
