import React, { Component } from "react";
import {
  Text,
  View,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  Icon
} from "react-native";
import { connect } from "react-redux";
import { Button, Spinner } from "native-base";
import { CardSection, Input } from "./common";
import firebase from "firebase";
import { Kaede, Hoshi } from "react-native-textinput-effects";

//import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      email: ""
    };
  }

  resetpassword() {
    this.setState({
      loaded: false
    });
    email1 = this.state.email;
    flag = 1;
    flag2 = 1;
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function() {
        alert("sent!");
      })
      .catch(function(error) {
        if (email1 == "") {
          flag2 = 0;
          flag = 0;
          Alert.alert(" Error", "Enter an email ");
        }
        if (error.code === "auth/invalid-email" && flag2 === 1) {
          flag = 0;
          Alert.alert(" Error", "No user found with this email address");
        } else {
          if (flag == 1)
            Alert.alert("Error", "Technical problem . Retry later.");
        }
      });

    this.setState({
      email: "",
      loaded: true
    });
  }

  render() {
    return (
      <ImageBackground
        source={require("../img/signup.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column"
            // justifyContent: 'space-between',
          }}
        >
          <View style={{ height: 100 }} />
          <Text style={styles.textStyle2}>Forgot your password?</Text>
          <Text style={styles.textStyle1}>
            Enter your registered email addres and we will send you a reset link
          </Text>

          <View style={styles.inputContainerStyle}>
            <Hoshi
              label={"E-mail Address"}
              borderColor={"#660507"}
                maskColor={'#FFFFFF'}
              inputStyle={{ color: "#000", fontSize: 15, fontWeight: "normal" }}
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </View>
          <View style={{ height: 20 }} />

          <Button
            style={styles.resetButton}
            onPress={this.resetpassword.bind(this)}
          >
            <Text style={styles.resetButtonText}> SEND LINK</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  textStyle1: {
    fontSize: 14,
    textAlign: "center",
    margin: 10,
    color: "#6C6C6C"
  },
  textStyle2: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "#6C6C6C"
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    borderColor: "#000000",
    height: 50,
    alignSelf: "stretch",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10
    // backgroundColor: "#eff0f2",
  },
  resetButton: {
    marginLeft: 20,
    marginRight: 30,
    alignSelf: "stretch",
    //backgroundColor: '#eff0f2'
    justifyContent: "center",
    alignItems: "center"
  },
  resetButtonText: {
    alignSelf: "center",
    color: "#FFFFFF",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 10
  }
});
export default ForgotPassword;
