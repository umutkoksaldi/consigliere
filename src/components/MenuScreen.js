import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button, Icon, Content } from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
//import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      email: ''
    };
  }
  
onLogoutPress() {
  Alert.alert(
    'Sign out',
    'Are you sure you want to sign out?',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'OK', onPress: () => this.logoutfunc() },
    ],
    { cancelable: true }
  );
}
logoutfunc() {
    firebase.auth().signOut();
    //Alert.alert('Sign out','Successfully signed out');
      Actions.auth();
  }
AddressSettingsPress() {
  
}
RecurringPress() {
  
}
AccountSettingsPress() {
  Actions.AccountSettings();
}
  
  render() {
    return (
     // <ImageBackground
     // source={require('../img/forget.png')}
     // style={{ width: '100%', height: '100%' }}
   // >
   // <Content style={{backgroundColor: '#696968'}} >
    <Content style={{ backgroundColor: '#FFF' }} >
    <View style={{ height: 200 }} />   
        <View style={styles.container}>   
        <CardSection>
        <Button iconLeft style={styles.ButtonStyle} onPress={Actions.main({ type: 'reset' })}>
        <Icon name='home' style={{ fontSize: 30, color: 'black', marginRight: 10 }} />
        <Text style={styles.buttonTextStyle}>Home</Text>
        </Button>
        </CardSection>
      <CardSection>
      <Button iconLeft style={styles.ButtonStyle} onPress={this.AccountSettingsPress.bind(this)}>
      <Icon name='contact' style={{ fontSize: 30, color: 'black', marginRight: 10 }} />
      <Text style={styles.buttonTextStyle}>Account Settings</Text>
      </Button>
      </CardSection>

      <CardSection>
      <Button iconLeft style={styles.ButtonStyle} onPress={this.AddressSettingsPress.bind(this)}>
      <Icon name='navigate' style={{ fontSize: 30, color: 'black', marginRight: 10 }} />
      <Text style={styles.buttonTextStyle}>Address Settings</Text>
      </Button>
      </CardSection>
      <CardSection>
      <Button iconLeft style={styles.ButtonStyle} onPress={this.RecurringPress.bind(this)} >
      <Icon name='calendar' style={{ fontSize: 30, color: 'black', marginRight: 10 }} />
      <Text style={styles.buttonTextStyle}>Manage Recurring Tasks</Text>
      </Button>
      </CardSection>
      <CardSection>
      <Button iconLeft style={styles.ButtonStyle} onPress={this.onLogoutPress.bind(this)} >
      <Icon name='power' style={{ fontSize: 30, color: 'black', marginRight: 10 }} />
      <Text style={styles.buttonTextStyle}>Sign Out</Text>
      </Button>
      </CardSection>
        </View>
    </Content>
   // </ImageBackground>

    );
  }
}
const styles = StyleSheet.create({
  textStyle1: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    color: '#6C6C6C',
    backgroundColor: 'transparent',

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'transparent',
        borderWidth: 0,
    borderColor: 'red',
  },
  ButtonStyle: {
    marginLeft: 20,
    marginRight: 30,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    //justifyContent: 'center',
    //alignItems: 'center'
  },

  buttonTextStyle: {
    //alignSelf: 'center',
    color: '#000',
    fontSize: 16,
    //fontWeight: '200',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Helvetica'

  }
});
export default MenuScreen;
