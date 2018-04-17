
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import { Scene, Router, Actions, Drawer } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import TaskCreate from './components/TaskCreate';
import MainPage from './components/MainPage';
import SignupForm from './components/SignupForm';
import firebase from 'firebase';
import ForgotPassword from './components/ForgotPassword';
//import {logout} from '../actions';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
    <Scene key='auth' initial >
      <Scene sceneStyle={{backgroundColor: 'transparent'}}
        key='login'
        component={LoginForm}
        hideNavBar={true}
        navTransparent
        title='Login'
        titleStyle={{ color: '#9D1017' }}
        navigationBarStyle={{
          opacity:0.0,
          backgroundColor: '#9D1017',
          borderBottomWidth: 0
        }}
      />
     <Scene 
      key='signup'
      component={SignupForm}
      title='Signup'
      hideNavBar={false}

      navigationBarStyle={{
        backgroundColor: '#660507',
        borderBottomWidth: 0,
        borderBottomColor: '#660507' }}
      titleStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
      leftButtonIconStyle={{ tintColor: '#FFFFFF' }}
      />
      <Scene 
      key='forgotpw'
      component={ForgotPassword}
      title='Password Reset'
      hideNavBar={false}
      navTransparent={true}

      navigationBarStyle={{
        backgroundColor: '#760609',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent' }}
      titleStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
      leftButtonIconStyle={{ tintColor: '#000000' }}
      />
      </Scene>

      <Scene key='main' >
        <Scene
          key='mainTab'
          renderRightButton={() => 
            <View style={{ flex:1,flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => Actions.taskComponent()}>
                <Icon active name='add' style={{ color: '#FFF',fontSize:40 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10}}onPress={() => 
              {firebase.auth().signOut() 
                alert('logout success')
                Actions.auth()
            }}>
            <Icon active name='ios-power' style={{ color: '#FFF',fontSize:30 }} />

        </TouchableOpacity>
        </View>

          }
          renderLeftButton={() => 
            <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => Actions.taskComponent()}>
                <Icon active name='ios-menu' style={{ color: '#FFF',fontSize:30 }} />
            </TouchableOpacity>
        </View>

          }
          rightButtonStyle={styles.rightButtonStyle}
          renderTitle={() => (
            <View>
              <Image style={styles.headerLogo}  source={require('./img/header.png')} />
            </View>
          )}
          //title='consigliere'
          //titleStyle={{ color: '#FFF', fontWeight: 'bold', fontSize: 20, marginBottom: 3, }}
          component={MainPage}
          navigationBarStyle={{
            backgroundColor: '#760609',
            borderBottomWidth: 0,
            borderBottomColor: '#E81721' }}
        />
        
        <Scene
          key='taskComponent'
          component={TaskCreate}
          title='Task'
          navigationBarStyle={{
            backgroundColor: '#760609',
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
  headerLogo: {
    //marginTop:25,
    height: '100%',
    width: '100%',
    
  },

});
export default RouterComponent;
