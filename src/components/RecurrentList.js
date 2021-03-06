import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, Dimensions, Alert } from 'react-native';
import { List, ListItem, Button, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { taskFetch, taskDelete, errandFetch, errandDelete, recurrentFetch, recurrentDelete } from '../actions';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class RecurrentList extends Component {
  componentWillMount() {
    this.props.recurrentFetch();
    this.createDataSource(this.props);
    console.log(this.props.taskArray);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onRouteButtonPress() {
    const todayTasks = _.filter(this.dataSource, ['date', 'today']);

    //Alert.alert(JSON.stringify(todayTasks[1].taskName));
    this.props.distanceFetch({ todayTasks });
  }

  onDeleteTask(taskItem, secId, rowId, rowMap) {
    console.log(taskItem);
    const { uid, val } = taskItem;
    const { taskName } = val;
    console.log(uid);
    Alert.alert(
      'Delete this errand?',
      `${taskName}`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.props.recurrentDelete({ uid }) },
      ],
      { cancelable: false }
    ); 
  }
  
  createDataSource({ taskArray }) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.dataSource = ds.cloneWithRows(taskArray);
    console.log(`creating: ${this.dataSource}`);
  }

  convertDateToInterval(taskItem) {
    const d = new Date(taskItem.val.date);
    const dayOfWeek = d.getDay();
    
    if (taskItem.val.interval === 'day') {
      return 'Every Day';
    }

    if (taskItem.val.interval === 'month') {
      return 'Every Month';
    }

    if (taskItem.val.interval === 'week') {
      switch (dayOfWeek) {
        case 0:
          return 'Every Sunday';
        case 1:
          return 'Every Monday';
        case 2:
          return 'Every Tuesday';
        case 3:
          return 'Every Wednesday';
        case 4:
          return 'Every Thursday';
        case 5:
          return 'Every Friday';
        case 6:
          return 'Every Saturday';
      }
    }

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
      <View style={styles.container}>
          <List
            style={styles.list}
            dataSource={this.dataSource}
            renderRow={(taskItem) =>
              <ListItem style={styles.listItem} onPress={() => { console.log('pressed'); }}>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ textAlign: 'left', fontSize: 18 }}>{taskItem.val.taskName}</Text>
                  <Text style={{ textAlign: 'left', fontSize: 14 }}>{this.convertDateToInterval(taskItem)}</Text>
                </View>
              </ListItem>
            }
            renderLeftHiddenRow={(taskItem, secId, rowId, rowMap) =>
              <View style={{ alignSelf: 'stretch', backgroundColor: 'brown', flexDirection: 'row', alignItems: 'stretch' }}>
                
                <Button
                style={{ }} 
                full info onPress={() => { 
                  console.log(taskItem); 
                  Actions.recurrentComponent({
                    task: taskItem,
                    latDelta: LATITUDE_DELTA,
                    longDelta: LONGITUDE_DELTA
                  });
                }}
                >
                <Icon active name="create" />
                </Button>
                <Button full danger onPress={() => this.onDeleteTask(taskItem, secId, rowId, rowMap)}>
                  <Icon active name="trash" />
                </Button>

              </View>
            }
            leftOpenValue={100}
            //rightOpenValue={-100}
            swipeToOpenPercent={10}
            onRowOpen={() => { console.log('row opened'); }}    
          />
      </View>
      
    );
  }
}

const mapStateToProps = state => {

  console.log(state.recurrentList);
  const taskArray = _.map(state.recurrentList.payload, (val, uid) => {
    return { uid, val };
  });
  //const taskArray = state.taskList.payload.map((val, uid) => { return { ...val, uid }; });
  const { fetching } = state.recurrentList;
  console.log('recurrentArray');
  console.log(taskArray);
  return { taskArray, fetching };
};

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
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
  }
});

export default connect(mapStateToProps, { taskFetch, taskDelete, errandFetch, errandDelete, recurrentDelete, recurrentFetch })(RecurrentList);
