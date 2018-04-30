import React, { Component } from 'react';
import {
  Text,
  View,
  Keyboard,
  StyleSheet,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Spinner } from 'native-base';
import { Hoshi } from 'react-native-textinput-effects';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  signuprequest,
  passwordforgot,
  checkSession
} from '../actions';
import { CardSection } from './common';


class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress1() {
    const { email, password } = this.props;
    Keyboard.dismiss();
    this.props.loginUser({ email, password });
  }
  onButtonPress2() {
    Keyboard.dismiss();
    signuprequest();
  }
  onButtonPress3() {
    Keyboard.dismiss();
    passwordforgot();
  }
  componentWillMount() {
    this.props.checkSession();
  }
  renderButton1() {
    if (this.props.loading) {
      //return <Spinner color='#000000' style={{ marginLeft: '45%' }} />;
    }

    return (
      <Button
        style={styles.loginButtonStyle}
        onPress={this.onButtonPress1.bind(this)}
      >
        <Text style={styles.loginTextStyle}>Login</Text>
      </Button>
    );
  }

  render() {
    if (!this.props.session)
      return (
        <ImageBackground
          source={require('../img/bglogin2.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'stretch',
              flex: 1,
              flexDirection: 'column'
            }}
          >
            <View style={{ height: 15 }} />

            <View style={styles.inputContainerStyle}>
              <Hoshi
                label={'E-mail Address'}
                borderColor={'#660507'}
                maskColor={'transparent'}
                //backgroundColor={'transparent'}
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='email-address'
                clearButtonMode='while-editing'
                inputStyle={{
                  color: '#000',
                  fontSize: 15,
                  fontWeight: 'normal'
                }}
              />
            </View>

            <View style={styles.inputContainerStyle}>
              <Hoshi
                label={'Password'}
                borderColor={'#660507'}
                maskColor={'transparent'}
                //backgroundColor={'transparent'}
                inputStyle={{
                  color: '#000',
                  fontSize: 15,
                  fontWeight: 'normal'
                }}
                secureTextEntry
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
                clearButtonMode='while-editing'
                autoCorrect={false}
                autoCapitalize='none'
              />
            </View>
            <View style={{ height: 30 }} />

            {this.renderButton1()}
            <CardSection>
              <Text style={styles.textStyle}>Forgot your login details?</Text>
            </CardSection>
            <CardSection>
              <TouchableHighlight
                style={styles.forgotButtonStyle}
                underlayColor='white'
                onPress={this.onButtonPress3.bind(this)}
              >
                <Text style={styles.forgotTextStyle}>Get help signing in.</Text>
              </TouchableHighlight>
            </CardSection>
          </View>
          <View style={{ height: 10 }} />
          <View style={styles.container}>
            <Text style={styles.textStyle2}>Don't have an account?</Text>
            <TouchableHighlight
              style={styles.SignupButtonStyle}
              underlayColor='white'
              onPress={this.onButtonPress2.bind(this)}
            >
              <Text style={styles.signupTextStyle}>Sign up!</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      );
    else return <Spinner color='#9D1017' style={{ flex: 1 }} />;
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    session: state.auth.session
  };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50
  },
  backGroundImageStyle: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center'
  },
  inputContainerStyle: {
    borderColor: 'transparent',
    height: 50,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 30,
    marginTop: 20,
    backgroundColor: 'transparent'
  },
  SignupButtonStyle: {
    justifyContent: 'space-between',
    flex: 1
  },
  forgotButtonStyle: {
    marginLeft: '30%',
    marginTop: 5,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  loginButtonStyle: {
    marginLeft: 20,
    marginRight: 30,
    backgroundColor: '#00688b',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotTextStyle: {
    alignSelf: 'center',
    color: '#00688b',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 0,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupTextStyle: {
    alignSelf: 'flex-start',
    color: '#00688b',

    fontSize: 14,
    fontWeight: '600',
    paddingTop: 0,
    paddingBottom: 10
  },
  loginTextStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  textStyle: {
    fontWeight: 'normal',
    fontSize: 14,
    marginLeft: 100,
    marginTop: 5,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle2: {
    fontWeight: 'normal',
    fontSize: 14,
    flex: 1,
    marginLeft: 70,
    backgroundColor: 'transparent'
  }
});

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  checkSession
})(LoginForm);
