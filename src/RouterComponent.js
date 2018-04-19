import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import TaskCreate from './components/TaskCreate';
import MainPage from './components/MainPage';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth" initial >
        <Scene
          key="login"
          component={LoginForm}
          title="Login"
          titleStyle={{ color: '#9D1017' }}
          navigationBarStyle={{
            backgroundColor: '#9D1017',
            borderBottomWidth: 0
          }}
        />
      </Scene>

      <Scene key="main" >
        <Scene
          key="mainTab"
          title="consigliere"
          titleStyle={{ color: '#FFF', fontWeight: 'bold', fontSize: 20, marginBottom: 3 }}
          component={MainPage}
          navigationBarStyle={{
            backgroundColor: '#9D1017',
            borderBottomWidth: 0,
            borderBottomColor: '#E81721' }}
        />
        <Scene
          key="taskComponent"
          component={TaskCreate}
          title="Task"
          navigationBarStyle={{
            backgroundColor: '#9D1017',
            borderBottomWidth: 0,
            borderBottomColor: '#E81721' }}
          titleStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
          leftButtonIconStyle={{ tintColor: '#FFFFFF' }}
        />
      </Scene>

    </Router>
  );
};

export default RouterComponent;
