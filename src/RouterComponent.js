import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import TaskCreate from './components/TaskCreate';
import MapComponent from './components/MapComponent';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth" >
        <Scene
          key="login"
          component={LoginForm}
          title="Login"
          titleStyle={{ color: '#9D1017' }}
          navigationBarStyle={{
            backgroundColor: '#9D1017',
            borderBottomWidth: 0
          }}
          initial
        />
      </Scene>

      <Scene
        key="map"
        navigationBarStyle={{
          backgroundColor: '#9D1017',
          borderBottomWidth: 7,
          borderBottomColor: '#E81721' }}
        titleStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
      >
        <Scene
          key="mapComponent"
          component={MapComponent}
          title="Map"
        />
        <Scene
          key="taskComponent"
          component={TaskCreate}
          title="Task"
          leftButtonIconStyle={{ tintColor: '#FFFFFF' }}
        />

      </Scene>

    </Router>
  );
};

export default RouterComponent;
