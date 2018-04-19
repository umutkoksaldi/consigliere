import React, { Component } from "react";
import {
  Text,
  View,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Button, Spinner } from "native-base";
import { CardSection, Input } from "./common";
import firebase from "firebase";
import { returnlogin } from "../actions";
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';



//import { signuprequest } from '../actions';
class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      email: "",
      password: "",
      name: "",
      surname: "",
      confirmpw: ""
    };
  }

  signupuser = () => {
    if (this.state.confirmpw == this.state.password) {
      this.setState({
        loaded: false
      });//stte change
      let currentComp = this;
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function() {
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          Alert.alert('A confirmation has been sent to your email')
          returnlogin();
        }).catch(function(error) {
          alert(error.message);
                  });

      })//then
      .catch(function(error) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Sign up Error','E-mail already in use.');
        }
         
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Sign up Error','invalid email');
      } 
      if (error.code === 'auth/weak-password') {
        Alert.alert('Sign up Error','Password is weak');
        currentComp.setState({
          loaded: true,
          password: "",
          confirmpw: ""
        });
    } 
      })//catch
    }//if 
    
    else{
      alert("Passwords don't match");
      this.setState({
        confirmpw: "",
        password: ""
      });

    }//else
  }//function end
  handlePress1() {
    console.log("Pressed!");
    signupuser();
  }

  render() {
    const isinvalid =
    this.state.password !== this.state.confirmpw ||
    this.state.password === '' ||
    this.state.email === '' ||
    this.state.name === '' ||this.state.surname ==='';
    return (
      <ImageBackground
        source={require("../img/signup.png")}
        style={{ width: "100%", height: "100%" }}
      >
      <GiftedForm
        formName='signupForm'
        openModal={(route) => {
          navigator.push(route); 
        }}
        clearOnClose={false} 
        validators={{
          Name: {
            title: 'Name',
            validate: [{
              validator: 'isLength',
              arguments: [2, 23],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            },{
              validator: 'matches',
              arguments: /^[a-zA-Z]*$/,
              message: '{TITLE} can contain only letters'
            }]
          },
          Surname: {
            title: 'Surname',
            validate: [{
              validator: 'isLength',
              arguments: [2, 23],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            },{
              validator: 'matches',
              arguments: /^[a-zA-Z]*$/,
              message: '{TITLE} can contain only letters'
            }]
          },
          password: {
            title: 'Password',
            validate: [{
              validator: 'isLength',
              arguments: [6, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          confirmpassword: {
            title: 'Confirm Password',
            validate: [{
              validator: (...args) => {
                if (!args[0] || args[0] === GiftedFormManager.getValue('signupForm', 'password')) {
                  return true;
                }
                return false;
              },
              message: '{TITLE} should match password',
            }]
          },
          emailAddress: {
            title: 'Email address',
            validate: [{
              validator: 'isLength',
              arguments: [6, 255],
            },{
              validator: 'isEmail',
            }]
          },
        }}
      >
        <GiftedForm.SeparatorWidget />
        <GiftedForm.TextInputWidget
        name='emailAddress' 
        title='Email'
        placeholder='example@example.com'
        autoCapitalize="none"
        keyboardType='email-address'
        clearButtonMode='while-editing'
        autoCorrect={false}
        image={require("../img/mailicon.png")}
        onChangeText={text => this.setState({ email: text })}
        value={this.state.email}      
        widgetStyles={{
          rowContainer: {backgroundColor:'transparent',borderColor: 'transparent'}
        }}
        />
        <GiftedForm.TextInputWidget
          name='Name' // mandatory
          title='Name'
          image={require("../img/usericon.png")}
          placeholder='John'
          autoCorrect={false}
          clearButtonMode='while-editing'
          onChangeText={text => this.setState({ name: text })}
          value={this.state.name}
          widgetStyles={{
            rowContainer: {backgroundColor:'transparent',borderColor: 'transparent'}
          }}
        />

        <GiftedForm.TextInputWidget
        name='Surname' 
        title='Surname'
        image={require("../img/usericon.png")}
        placeholder='Doe'
        autoCorrect={false}
        clearButtonMode='while-editing'
        onChangeText={text => this.setState({ surname: text })}
        value={this.state.surname}
        widgetStyles={{
          rowContainer: {backgroundColor:'transparent',borderColor: 'transparent'}
        }}
      />

        <GiftedForm.TextInputWidget
          name='password' 
          title='Password'
          placeholder='******'
          clearButtonMode='while-editing'
          secureTextEntry={true}
          image={require("../img/lockicon.png")}
          autoCorrect={false}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          widgetStyles={{
            rowContainer: {backgroundColor:'transparent',borderColor: 'transparent'}
          }}
        />
        <GiftedForm.TextInputWidget
        name='confirmpassword' 
        title=' Password'
        placeholder='Confirm Password'
        clearButtonMode='while-editing'
        secureTextEntry={true}
        autoCorrect={false}
        image={require("../img/lockicon.png")}
        onChangeText={text => this.setState({ confirmpw: text })}
        value={this.state.confirmpw}
        widgetStyles={{
          rowContainer: {backgroundColor:'transparent',borderColor: 'transparent'},
          textInputTitleInline: { fontSize:15}
        }}
      />
        <GiftedForm.SeparatorWidget />

        <GiftedForm.ErrorsWidget/>

        <Button
        style={styles.submitButton}
        onPress={this.signupuser.bind(this)}
        disabled={isinvalid} 
      >
        <Text style={styles.submitButtonText}> SIGN UP FOR FREE </Text>
      </Button>

        <GiftedForm.NoticeWidget
          title='By signing up, you agree to the Terms of Service and Privacy Policy.'
          widgetStyles={{
            noticeTitle: {color:'#000'}
          }}
        />

        <GiftedForm.HiddenWidget name='tos' value={true} />
      </GiftedForm>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderBottomWidth: 0,
    borderColor: "#000000",
    height: 50,
    alignSelf: "stretch",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    backgroundColor: "#eff0f2",
    opacity: 0.5
  },
  submitButton: {
    marginLeft: 20,
    marginRight: 30,
    marginTop: 5,
    alignSelf: "stretch",
    //backgroundColor: 'transparent',
    justifyContent: "center",
    alignItems: "center"
  },
  submitButtonText: {
    color: "white"
  },
  textStyle: {
    fontWeight: "normal",
    fontSize: 14,
   // marginLeft: 50,
    alignSelf: "stretch",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  wrapper: {
    flex: 1,
    marginTop: 0,
    marginLeft: 0,

  },
});
export default SignupForm;
