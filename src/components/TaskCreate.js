import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { StyleSheet, Keyboard } from 'react-native';
import { Tabs, Tab } from 'native-base';
import { taskUpdate, taskCreate, errandUpdate } from '../actions';
import DateTaskCreate from './DateTaskCreate';
import ErrandCreate from './ErrandCreate';
import RecurrentCreate from './RecurrentCreate';


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
      this.props.errandUpdate({ prop, value });
    });
    //this.setState({ value: this.jsCoreDateCreator(`${this.props.date} ${this.props.time}`) });
    //console.log(this.props);
}
  // onDoneButtonPress() {
  //   const { taskName, time, placeId, date, lat, long, taskuid } = this.props;
  //   console.log(taskName, time, placeId, date, lat, long, taskuid);
  //   if (taskName.trim() === '' || placeId.trim() === '') {
  //     Alert.alert(
  //       'could not enter a task with blank fields',
  //       `${taskName}\n${time}`,
  //       [
  //         { text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'default' },
  //       ],
  //       { cancelable: false }
  //     );
  //   } else {
  //     this.props.taskCreate({ taskName, time, placeId, date, lat, long, uid: taskuid });
  //   }
  // }

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

      <Tabs
          locked
          initialPage={0}
          style={{ marginTop: 7 }}
          tabBarPosition='overlayTop'
          tabBarUnderlineStyle={{ borderWidth: 0, backgroundColor: '#E81721' }}
      >
        <Tab
            heading="Task"
            tabStyle={{
              backgroundColor: '#F8F8F8',
              borderBottomWidth: 3,
              borderColor: '#9CB4E8' }}
            activeTabStyle={{
              backgroundColor: '#F8F8F8',
              borderBottomWidth: 3,
              borderColor: '#E81721' }}
            textStyle={{ color: '#9CB4E8', fontWeight: 'bold' }}
            activeTextStyle={{ color: '#E81721', fontWeight: 'bold' }}
        >
            <DateTaskCreate latDelta={this.props.latDelta} longDelta={this.props.longDelta} />

        </Tab>

        <Tab
            heading="Errand"
            tabStyle={{
              backgroundColor: '#F8F8F8',
              borderBottomWidth: 3,
              borderColor: '#9CB4E8' }}
            activeTabStyle={{
              backgroundColor: '#F8F8F8',
              borderBottomWidth: 3,
              borderColor: '#E81721' }}
            textStyle={{ color: '#9CB4E8', fontWeight: 'bold' }}
            activeTextStyle={{ color: '#E81721', fontWeight: 'bold' }}
        >
            <ErrandCreate latDelta={this.props.latDelta} longDelta={this.props.longDelta} />

        </Tab>

        <Tab
            heading="Recurrent"
            tabStyle={{
              backgroundColor: '#F8F8F8',
              borderBottomWidth: 3,
              borderColor: '#9CB4E8' }}
            activeTabStyle={{
              backgroundColor: '#F8F8F8',
              borderBottomWidth: 3,
              borderColor: '#E81721' }}
            textStyle={{ color: '#9CB4E8', fontWeight: 'bold' }}
            activeTextStyle={{ color: '#E81721', fontWeight: 'bold' }}
        >
            <RecurrentCreate latDelta={this.props.latDelta} longDelta={this.props.longDelta} />

        </Tab>

      </Tabs>
    );
  }
}

const mapStateToProps = (state) => {
  const { taskName, time, date, lat, long, placeId, taskuid } = state.taskForm;
  // console.log('props');
  // console.log(taskName, time1, date, lat, long, placeId, taskuid);
  return { taskName, time, date, lat, long, placeId, taskuid };
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

export default connect(mapStateToProps, { taskUpdate, taskCreate, errandUpdate })(TaskCreate);
