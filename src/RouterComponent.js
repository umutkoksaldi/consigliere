import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';
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
          renderRightButton={() => 
            <TouchableOpacity onPress={() => Actions.taskComponent()}>
                <Icon active name="add" style={{ color: '#FFF' }} />
            </TouchableOpacity>
          }
          rightButtonStyle={styles.rightButtonStyle}
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
const styles = StyleSheet.create({
  rightButtonStyle: {
    marginBottom: 0,
    marginRight: 5
  },


});
export default RouterComponent;
