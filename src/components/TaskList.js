import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, Dimensions, Alert } from 'react-native';
import { List, ListItem, Button, Icon, Spinner, Container,Content,SwipeRow } from 'native-base';
import { Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { taskFetch, taskDelete, taskFetchByDate } from '../actions';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class TaskList extends Component {
  state={
    items: {},
  }
  componentWillMount() {
    this.props.taskFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onRouteButtonPress() {
    const todayTasks = _.filter(this.dataSource, ['date', 'today']);
    //Alert.alert(JSON.stringify(todayTasks[1].taskName));
    this.props.distanceFetch({ todayTasks });
  }

  onDeleteTask(taskItem) {
    const { taskuid, taskName, time1, date } = taskItem;
    console.log(taskuid);
    Alert.alert(
      'Delete this task?',
      `${taskuid}\n${time1}`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.props.taskDelete({ uid: taskuid, date }) },
      ],
      { cancelable: false }
    );
  }

  createDataSource({ taskArray }) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.dataSource = ds.cloneWithRows(taskArray);

    const newDataSource = this.dataSource._dataBlob.s1;
    console.log('newDataSource');
    console.log(newDataSource);

    if (newDataSource.length !== 0) {
      console.log(newDataSource[0].val);
      console.log(newDataSource[0].uid);
      for (let i = 0; i < newDataSource.length; i++) {
        this.state.items[newDataSource[i].uid] = [];
        for (let j = 0; j < newDataSource[i].val.length; j++) {
           this.state.items[newDataSource[i].uid].push({

                taskItem: { ...newDataSource[i].val[j], date: newDataSource[i].uid },
                height: 40,
               });
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }
  }

  timeToString(time) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  renderEmptyDate() {
    return (
       <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  renderItem(item) {
    return (
 
        <SwipeRow
          leftOpenValue={100}
          left={
            <View style={{ alignSelf: 'stretch', backgroundColor: 'brown', flexDirection: 'row', alignItems: 'stretch' }}>
                
                <Button
                style={{ }} 
                full info onPress={() => { 
                  console.log('item');
                  console.log(item); 
                  Actions.taskComponent({
                    task: { ...item.taskItem, time: item.taskItem.time1 },
                    latDelta: LATITUDE_DELTA,
                    longDelta: LONGITUDE_DELTA
                  });
                }}
                >
                <Icon active name="create" />
                </Button>
                <Button full danger onPress={() => this.onDeleteTask(item.taskItem)}>
                  <Icon active name="trash" />
                </Button>
              </View>
          }
          body={
            <View styles={StyleSheet.item}>
              <Text style={styles.listItem}>{item.taskItem.taskName}</Text>
            </View>
          }
        />

    );
  }

  render() {
    console.log(`props: ${this.props.fetching}`);
    if (this.props.fetching) {
      return (
        <View style={styles.spinnerStyle}>
          <Spinner color='red' size='large' />
        </View>
      );
    }

    return (
      <Agenda
        items={this.state.items}
        selected={new Date()} //idk how but returns the current UTC+0 date, have to fix this to UTC+3
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }
}

const mapStateToProps = state => {
  console.log('tasklist');
  console.log(state.taskList);
  const taskArray = _.map(state.taskList.payload, (val, uid) => {
    return { uid, val: _.map(val, (taskval, taskuid) => { return { ...taskval, taskuid }; }) };
  });
  //const taskArray = state.taskList.payload.map((val, uid) => { return { ...val, uid }; });
  const { fetching } = state.taskList;
  console.log('taskArray');
  console.log(taskArray);

  return { taskArray, fetching };
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start'
  },
  spinnerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    ...StyleSheet.absoluteFillObject,
  },
  listItem: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

export default connect(mapStateToProps, { taskFetch, taskDelete })(TaskList);
