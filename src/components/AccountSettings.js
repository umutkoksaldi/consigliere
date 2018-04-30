import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  Alert
} from "react-native";
import { connect } from "react-redux";
import {
  Button,
  Spinner,
  Icon,
  ListItem,
  List,
  Left,
  Body,
  Right,
  Switch,
  Item,
  Input
} from "native-base";
import { CardSection } from "./common";
import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import { Kaede, Hoshi } from "react-native-textinput-effects";
//import Accordion from 'react-native-accordion';

class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      email: "",
      currentpw: "",
      newpw: "",

      state1: false,
      state2: false
    };
  }
  onChangePassword() {
    /*     this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newpw).then(() => {
        console.log("Password updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); }); */
    user = firebase.auth().currentUser;
    user
      .updatePassword(this.state.email)
      .then(function() {
        Alert.alert("Change Password", "Successfully changed password");
        console.log("Successfully deleted user");
      })
      .catch(function(error) {
        Alert.alert(
          "Error",
          "Your new password must be different from your previous password"
        );
      });
  }
  onEmailChange() {
    user = firebase.auth().currentUser;
    user
      .updateEmail(this.state.email)
      .then(function() {
        Alert.alert("Change E-mail", "Successfully changed e-mail. Verify it");
        console.log("Successfully changed email");
      })
      .catch(function(error) {
        Alert.alert("Error", error.message);
      });
  }
  deleteaccount() {
    user = firebase.auth().currentUser;
    user
      .delete()
      .then(function() {
        Alert.alert("Delete Account", "Successfully deleted account");
        console.log("Successfully deleted user");
      })
      .catch(function(error) {
        Alert.alert("Delete Account", error.message);

        console.log("Error deleting user:", error);
      });
    firebase.auth().signOut();
    Actions.auth();
  }
  onDelete() {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.deleteaccount() }
      ],
      { cancelable: true }
    );
  }
  render() {
    const isinvalid1 =
      this.state.currentpw !== this.state.newpw || this.state.currentpw === "";
    // const isinvalid1 =
    //  this.state.currentpw !== this.state.newpw ||
    //   this.state.currentpw === '';
    return (
      //<ImageBackground
      // source={require('../img/test2.png')}
      // style={{ width: '100%', height: '100%' }}
      //>
      <View style={styles.container}>
        <View style={{ height: 20, backgroundColor: "#f4f4f4" }} />
        <ListItem itemDivider>
          <Text>Account Settings</Text>
        </ListItem>
        <ListItem icon style={{ height: 40, backgroundColor: "#FFF" }}>
          <Left>
            <Icon
              name="key"
              style={{ fontSize: 30, color: "black", marginLeft: 10 }}
            />
          </Left>
          <Body>
            <Text style={{ fontSize: 15 }}>Change Password</Text>
          </Body>
          <Right>
            <TouchableOpacity
              iconLeft
              onPress={() =>
                this.setState({ state1: !this.state.state1, state2: false })
              }
            >
              <Icon
                name="arrow-down"
                style={{ marginRight: 5, color: "black" }}
              />
            </TouchableOpacity>
          </Right>
        </ListItem>
        {this.state.state1 && (
          <View style={{ height: 200, backgroundColor: "#f4f4f4" }}>
            <View style={styles.inputContainerStyle}>
              <Item
                underline
                style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}
              >
                <Input
                  label="password1"
                  placeholder="Current Password"
                  secureTextEntry={true}
                  style={styles.inputContainerStyle}
                  onChangeText={text => this.setState({ currentpw: text })}
                  value={this.state.currentpw}
                />
              </Item>
            </View>
            <View style={styles.inputContainerStyle}>
              <Item
                underline
                style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}
              >
                <Input
                  label="password2"
                  placeholder="New Password"
                  secureTextEntry={true}
                  style={styles.inputContainerStyle}
                  onChangeText={text => this.setState({ newpw: text })}

                  value={this.state.newpw}
                />
              </Item>
            </View>

            <Button
              style={styles.changeButtonStyle}
              onPress={this.onChangePassword.bind(this)}
              disabled={isinvalid1}
            >
              <Text style={styles.changeTextStyle}>Change Password</Text>
            </Button>
          </View>
        )}
        <ListItem icon style={{ height: 40, backgroundColor: "#FFF" }}>
          <Left>
            <Icon
              name="mail"
              style={{ fontSize: 30, color: "black", marginLeft: 10 }}
            />
          </Left>
          <Body>
            <Text style={{ fontSize: 15 }}>Change E-mail Address</Text>
          </Body>
          <Right>
            <TouchableOpacity
              iconLeft
              onPress={() =>
                this.setState({ state2: !this.state.state2, state1: false })
              }
            >
              <Icon
                name="arrow-down"
                style={{ marginRight: 5, color: "black" }}
              />
            </TouchableOpacity>
          </Right>
        </ListItem>
        {this.state.state2 && (
          <View style={{ height: 130, backgroundColor: "#f4f4f4" }}>
            <View style={styles.inputContainerStyle}>
              <Item
                underline
                style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}
              >
                <Input
                  label="email"
                  placeholder="New E-mail Address"
                  secureTextEntry={false}
                  autoCapitalize="none"
                  style={styles.inputContainerStyle}
                  onChangeText={text => this.setState({ email: text })}
                  value={this.state.email}
                />
              </Item>
            </View>
            <Button
              style={styles.changeButtonStyle}
              onPress={this.onEmailChange.bind(this)}
            >
              <Text style={styles.changeTextStyle}>Submit</Text>
            </Button>
          </View>
        )}

        <View style={{ height: 40, backgroundColor: "#f4f4f4" }} />
        <ListItem itemDivider>
          <Text>Notification Settings</Text>
        </ListItem>
        <ListItem icon style={{ height: 40, backgroundColor: "#FFF" }}>
          <Left>
            <Icon name="notifications" />
          </Left>
          <Body>
            <Text style={{ fontSize: 15 }}>Notifications</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>

        <Button
          iconLeft
          style={styles.ButtonStyle}
          onPress={this.onDelete.bind(this)}
        >
          <Icon
            name="power"
            style={{ fontSize: 30, color: "white", marginRight: 10 }}
          />
          <Text style={styles.buttonTextStyle}>Deactivate Account</Text>
        </Button>
      </View>
      //   </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  textStyle1: {
    fontSize: 14,
    textAlign: "center",
    margin: 10,
    color: "#6C6C6C",
    backgroundColor: "transparent"
  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: "#f4f4f4",
    borderWidth: 0,
    marginTop: 0,
    borderColor: "red"
  },
  container2: {
    flex: 1,
    height: 30,
    // justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: "#f4f4f4",
    borderWidth: 0,
    borderColor: "red"
  },
  ButtonStyle: {
  marginLeft: 60,
    marginRight: 60,
    alignSelf: "stretch",
    backgroundColor: "#760609",
    position: "absolute",
    bottom: 70,
    width:250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    borderColor: "#000000",
    height: 40,
    fontSize: 15,
    fontFamily: "Helvetica",
    // alignSelf: "stretch",
    // marginLeft: 30,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10
  },
  buttonTextStyle: {
    //alignSelf: 'center',
    color: "#FFF",
    fontSize: 16,
    //fontWeight: '200',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,

    fontFamily: "Helvetica"
  },
  changeButtonStyle: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 30,
    backgroundColor: "#00688b",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },

  changeTextStyle: {
    //alignSelf: 'center',
    color: "#FFF",
    fontSize: 13,
    //fontWeight: '200',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Helvetica"
  }
});
export default MenuScreen;
