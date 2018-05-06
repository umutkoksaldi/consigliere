import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Text, View, Alert, StyleSheet, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Body, ListItem, Left, Icon } from 'native-base';
import { taskUpdate, taskCreate, errandCreate, errandUpdate } from '../actions';

class ErrandCreate extends Component {
    state = {

    };

  componentWillMount() {
    if (this.props.task != null) {
      console.log(this.props.task);
      this.props.errandUpdate({ prop: 'taskuid', value: this.props.task.uid });
      _.each(this.props.task.val, (value, prop) => {
        //console.log(prop, value);
        this.props.errandUpdate({ prop, value });
      });
    }

    //this.setState({ value: this.jsCoreDateCreator(`${this.props.date} ${this.props.time}`) });
    //console.log(this.props);
}
  onDoneButtonPress() {
    const { taskName, time, placeId, date, lat, long, taskuid, taskPlaceName } = this.props;
    console.log(taskName, time, placeId, date, lat, long, taskuid);
    if (taskName.trim() === '' || placeId.trim() === '') {
      Alert.alert(
        'could not enter a task with blank fields',
        `${taskName}\n${time}`,
        [
          { text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'default' },
        ],
        { cancelable: false }
      );
    } else {
      this.props.errandCreate({ taskName, placeId, lat, long, uid: taskuid, taskPlaceName });
    }
  }

  onLongPress = (e) => {
    console.log(e.nativeEvent.coordinate);
  }

  jsCoreDateCreator = (dateString) => {
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
    const dateParam = dateString.split(/[\s-:]/);
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
    return new Date(...dateParam);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 20, borderColor: '#f4f4f4', }} />
        <ListItem style={styles.mapContainer}>
          <MapView
            onLongPress={this.onLongPress}
            provider={PROVIDER_GOOGLE}
            region={{ latitude: this.props.lat,
                      longitude: this.props.long,
                      longitudeDelta: this.props.longDelta,
                      latitudeDelta: this.props.latDelta }}
            style={styles.map}
          >
            <MapView.Marker
                coordinate={{ latitude: this.props.lat,
                              longitude: this.props.long }}
                pinColor={'#9D1017'}
            />
          </MapView>
        </ListItem>

        <View style={{ height: 10, borderColor: '#f4f4f4', }} />

        <ListItem icon style={{ height: 40, backgroundColor: '#FFF', borderColor: '#f4f4f4' }}>
          <Left>
            <Icon
              name="create"
              style={{ fontSize: 30, color: 'black', marginLeft: 10 }}
            />
          </Left>
          <Body>
            <TextInput
              label="taskName"
              placeholder="Description"
              value={this.props.taskName}
              onChangeText={value => this.props.errandUpdate({ prop: 'taskName', value })}
            />
          </Body>
        </ListItem>

        <View style={{ height: 20 }} />

        <ListItem style={styles.buttonContainer}>
          <Button
                block
                style={styles.button}
                onPress={this.onDoneButtonPress.bind(this)}
          >
                <Text style={styles.buttonText}>
                  Save
                </Text>
              </Button>
        </ListItem>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.errandForm);
  const { taskName, lat, long, placeId, taskuid } = state.errandForm;
  // console.log('props');
  // console.log(taskName, time1, date, lat, long, placeId, taskuid);
  return { taskName, lat, long, placeId, taskuid };
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    marginBottom: 50,
    width: '100%',
    borderColor: '#f4f4f4',
  },
  button: {
    backgroundColor: '#9CB4E8',
    marginLeft: '40%'
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  input: {
    //Color: '#939799',
    color: '#9CB4E8',
    fontSize: 20,
    fontWeight: 'normal',
    height: 30,
  },
  mapContainer: {
    height: 160,
    marginBottom: 20,
    width: '90%',
    borderWidth: 2,
    borderColor: '#9CB4E8',
    borderRadius: 5,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderColor: '#f4f4f4',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default connect(mapStateToProps, { taskUpdate, taskCreate, errandCreate, errandUpdate })(ErrandCreate);
