import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Text, View, Alert, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Item, Input } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { taskUpdate, taskCreate } from '../actions';

class TaskCreate extends Component {
    state = {
      isDateTimePickerVisible: false,
      dateText: 'Choose Date',
      timeText: 'Choose Time',
      mode: 'date',
      //value: ''
    };
  
  componentWillMount() {
    _.each(this.props.task, (value, prop) => {
      //console.log(prop, value);
      this.props.taskUpdate({ prop, value });
    });
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
      this.props.taskCreate({ taskName, time, placeId, date, lat, long, uid: taskuid, taskPlaceName });
    }
  }

  onTimeFocus = () => {
    this.setState({ mode: 'time', isDateTimePickerVisible: true });
    console.log(this.props.time);
    console.log(this.props.date);
    //console.log(this.state.value);
  }

  onDateFocus = () => {
    this.setState({ mode: 'date', isDateTimePickerVisible: true });
    console.log(this.state.value);
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

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
    Keyboard.dismiss();
  }


  handleDatePicked = (value) => {
    this.hideDateTimePicker();
    if (this.state.mode === 'time') {
      const timeValue = value.toLocaleTimeString();
      this.props.taskUpdate({ prop: 'time', value });
      this.setState({ timeText: timeValue });
    } else { //if (this.state.mode === 'date') {
      const dateValue = value.toLocaleDateString();
      this.props.taskUpdate({ prop: 'date', value });
      this.setState({ dateText: dateValue });
    }
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

        <Item underline style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}>
          <TouchableOpacity onPress={this.onDateFocus}>
           <Text style={styles.input}> {this.state.dateText} </Text>
          </TouchableOpacity>
        </Item>

        <Item underline style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}>
          <TouchableOpacity onPress={this.onTimeFocus}>
           <Text style={styles.input}> {this.state.timeText} </Text>
          </TouchableOpacity>
        </Item>

        <DateTimePicker
          mode={this.state.mode}
          //date={this.state.value}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <View style={styles.mapContainer}>
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
                //style={{ pinColor: '#9D1017' }}
            />
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
  const { taskName, time, date, lat, long, placeId, taskuid, taskPlaceName } = state.taskForm;
  // console.log('props');
  // console.log(taskName, time1, date, lat, long, placeId, taskuid);
  return { taskName, time, date, lat, long, placeId, taskuid, taskPlaceName };
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
    fontWeight: 'normal',
    height: 45
  },
  mapContainer: {
    height: '50%',
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
