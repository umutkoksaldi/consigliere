import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert, StyleSheet, Keyboard } from 'react-native';
import MapView from 'react-native-maps';
import { Button, Item, Input } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { taskUpdate, taskCreate } from '../actions';

class TaskCreate extends Component {
  state = {
    isDateTimePickerVisible: false,
  };

  onDoneButtonPress() {
    const { taskName, time, placeId } = this.props;

    this.props.taskCreate({ taskName, time, placeId });
  }

  onTimeFocus() {
    this.setState({ isDateTimePickerVisible: true });
  }

  hideDateTimePicker() {
    this.setState({ isDateTimePickerVisible: false });
    Keyboard.dismiss();
  }

  handleDatePicked = (date) => {
    this.hideDateTimePicker();
    const value = date.toLocaleTimeString();
    this.props.taskUpdate({ prop: 'time', value });
  };


  render() {
    return (
      <View>
        <Item underline style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}>
          <Input
            label="taskName"
            placeholder="task name..."
            style={styles.input}
            value={this.props.taskName}
            onChangeText={value => this.props.taskUpdate({ prop: 'taskName', value })}
          />
        </Item>

        <Item underline style={{ marginLeft: 20, marginRight: 20 }}>
          <Input
            label="time"
            placeholder="time..."
            style={styles.input}
            value={this.props.time}
            onFocus={this.onTimeFocus.bind(this)}
          />
        </Item>

        <DateTimePicker
          mode='time'
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />

        <View style={styles.mapContainer}>
          <MapView
            region={{ latitude: this.props.lat,
                      longitude: this.props.long,
                      longitudeDelta: this.props.longDelta,
                      latitudeDelta: this.props.latDelta }}
            style={styles.map}
          >
            <MapView.Marker
                coordinate={{ latitude: this.props.lat,
                              longitude: this.props.long }}
                //style={{ pinColor: '#9D1017' }}
            >
            </MapView.Marker>
          </MapView>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            block
            style={styles.button}
            onPress={this.onDoneButtonPress.bind(this)}
          >
            <Text style={styles.buttonText}>
              Set Reminder
            </Text>
          </Button>

          <Button
            block
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Change Type
            </Text>
          </Button>
        </View>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { taskName, time } = state.taskForm;

  return { taskName, time };
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    width: '50%',
    marginLeft: '25%'
  },
  button: {
    backgroundColor: '#9D1017',
    marginTop: 15
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
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: '30%',
    width: '90%',
    borderWidth: 5,
    borderColor: '#9D1017',
    marginLeft: '5%',
    marginTop: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default connect(mapStateToProps, { taskUpdate, taskCreate })(TaskCreate);
