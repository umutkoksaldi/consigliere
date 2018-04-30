import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ImageBackground
} from 'react-native';
import { Button, Icon } from 'native-base';
import {
  Scene,
  Router,
  Actions,
  Drawer,
  DefaultRenderer
} from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import TaskCreate from './components/TaskCreate';
import MainPage from './components/MainPage';
import SignupForm from './components/SignupForm';
import ForgotPassword from './components/ForgotPassword';
import AccountSettings from './components/AccountSettings';
import MenuScreen from './components/MenuScreen';

//import MenuIcon from './img/menuicon.png';

//import {logout} from '../actions';
function openDrawer() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => Actions.refresh({ key: 'drawer', open: true })}
      >
        <Icon active name='md-more' style={{ color: '#FFF', fontSize: 30 }} />
      </TouchableOpacity>
    </View>
  );
}
const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key='auth' initial>
        <Scene
          sceneStyle={{ backgroundColor: 'transparent' }}
          key='login'
          component={LoginForm}
          hideNavBar={true}
          navTransparent
          title='Login'
          titleStyle={{ color: '#9D1017' }}
          navigationBarStyle={{
            opacity: 0.0,
            backgroundColor: '#9D1017',
            borderBottomWidth: 0
          }}
        />
        <Scene
          key='signup'
          component={SignupForm}
          title='Signup'
          hideNavBar={false}
          renderTitle={() => (
            <View>
              <Image
                style={styles.headerLogo}
                source={require('./img/forget.png')}
              />
            </View>
          )}
          navigationBarStyle={{
            backgroundColor: '#660507',
            borderBottomWidth: 0,
            borderBottomColor: '#660507',
            height: 120
          }}
          titleStyle={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Helvetica'
          }}
          leftButtonIconStyle={{ tintColor: '#FFFFFF', marginTop: 30 }}
        />
        <Scene
          key='forgotpw'
          component={ForgotPassword}
          title='Password Reset'
          hideNavBar={false}
          navTransparent={true}
          renderTitle={() => (
            <View>
              <Image
                style={styles.headerLogo}
                source={require('./img/forget.png')}
              />
            </View>
          )}
          navigationBarStyle={{
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            borderBottomColor: 'transparent',
            height: 120
          }}
          titleStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
          leftButtonIconStyle={{ tintColor: '#FFFFFF', marginTop: 30 }}
        />
      </Scene>

      <Scene key='main'>
        <Scene
          key='mainTab'
          renderRightButton={() => (
            <View>
              <TouchableOpacity onPress={() => Actions.taskComponent()}>
                <Icon
                  active
                  name='add'
                  style={{ color: '#FFFFFF', fontSize: 35, paddingBottom: 30 }}
                />
              </TouchableOpacity>
              <View style={{ width: 10 }} />
            </View>
          )}
          rightButtonStyle={styles.rightButtonStyle}
          renderTitle={() => (
            <View>
              <Image
                style={styles.headerLogo}
                source={require('./img/hdr.png')}
              />
            </View>
          )}
          renderLeftButton={() => (
            <View>
              <TouchableOpacity onPress={() => Actions.menu()}>
                <Icon active name='md-more' style={{color: '#FFFFFF',fontSize: 30,paddingBottom: 30,marginBottom: 5,marginLeft: 5}}
                />
              </TouchableOpacity>
              <View style={{ width: 10 }} />
            </View>
          )}
          //title='consigliere'
          //titleStyle={{ color: '#FFF', fontWeight: 'bold', fontSize: 20, marginBottom: 3, }}
          component={MainPage}
          navigationBarStyle={{
            backgroundColor: '#000',
            borderBottomWidth: 0,
            borderBottomColor: '#E81721',
            height: 75
          }}
        />

        <Scene
          key='taskComponent'
          component={TaskCreate}
          title='Task'
          navigationBarStyle={{
            backgroundColor: '#760609',
            borderBottomWidth: 0,
            borderBottomColor: '#E81721'
          }}
          titleStyle={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Helvetica'
          }}
          leftButtonIconStyle={{ tintColor: '#FFFFFF' }}
        />
       
    
        <Scene
          key='menu'
          component={MenuScreen}
          title='Menu'
          direction="leftToRight"
          //navTransparent={true}
          navigationBarStyle={{
            backgroundColor: '#000',
            borderBottomWidth: 0,
            height: 200,
            borderBottomColor: 'transparent'
          }}
          titleStyle={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Helvetica'
          }}
          renderBackButton={() => (
            <View>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Icon active name='md-more' style={{color: '#FFFFFF',fontSize: 30,paddingBottom: 30,marginBottom: 5,marginLeft: 5}}
                />
              </TouchableOpacity>
              <View style={{ width: 10 }} />
            </View>
          )}
          renderTitle={() => (
            <View>
            <ImageBackground style={styles.headerLogo}  source={require('./img/forget.png')} />
            </View>
          )}
        />
        <Scene
          key='AccountSettings'
          component={AccountSettings}
          title='Account Settings'
          navigationBarStyle={{
            backgroundColor: '#760609',
            borderBottomWidth: 0,
            borderBottomColor: '#760609'
          }}
          titleStyle={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Helvetica'
          }}
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
    width: '100%'
  }
});
export default RouterComponent;
