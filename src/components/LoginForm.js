import React, { Component } from 'react';
import { Text, View, Keyboard, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Spinner } from 'native-base';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection, Input } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    Keyboard.dismiss();
    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <Spinner
          color='#FFFFFF'
          style={{ marginLeft: '45%' }}
        />
      );
    }

    return (
      <Button
        transparent
        style={styles.buttonStyle}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={styles.buttonTextStyle} >
          Login
        </Text>
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.loginFormStyle}>
        <View style={styles.inputContainerStyle}>
          <Input
            icon={'envelope'}
            iconSize={18}
            iconColor={'rgb(255, 255, 255)'}
            placeholder={'Email Address'}
            //placeholderTextColor='#FFFFFF'
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </View>

        <View style={styles.inputContainerStyle}>
          <Input
            icon={'lock'}
            iconSize={23}
            iconColor={'rgb(255, 255, 255)'}
            placeholder={'Password'}
            //placeholderTextColor='#FFFFFF'
            secureTextEntry
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </View>

        <Text>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

      </View>

    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

const styles = StyleSheet.create({
  loginFormStyle: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#9D1017',
    justifyContent: 'center',
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    height: 50,
    alignSelf: 'stretch',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    marginLeft: '43%',
    marginTop: 5
  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }

});

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
