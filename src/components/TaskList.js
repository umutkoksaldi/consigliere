import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import { List, ListItem, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { taskFetch, taskDelete } from '../actions';
import { Spinner } from './common';

class TaskList extends Component {
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

  onDeleteTask(taskItem, secId, rowId, rowMap) { 
    const { uid } = taskItem;
    console.log(uid);
    this.props.taskDelete({ uid });
  }
  createDataSource({ taskArray }) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.dataSource = ds.cloneWithRows(taskArray);
    console.log(`creating: ${this.dataSource}`);
  }
  
  render() {
    console.log(`props: ${this.props.fetching}`);
    if (this.props.fetching) {
      return <Spinner size="large" />;
    }

    return (
      <View style={styles.container}>
          <List
            style={styles.list}
            dataSource={this.dataSource}
            renderRow={(taskItem) =>
              <ListItem style={styles.listItem} onPress={() => { console.log('pressed'); }}>
                <View style={{ backgroundColor: 'aliceblue', marginLeft: 10 }}>
                  <Text style={{ textAlign: 'left', backgroundColor: 'brown', fontSize: 18 }}>{taskItem.taskName}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ textAlign: 'left', backgroundColor: 'crimson', marginLeft: 10, fontSize: 14 }}>{taskItem.taskName}</Text>
                </View>
              </ListItem>
            }
            renderLeftHiddenRow={(taskItem, secId, rowId, rowMap) =>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Button 
                  full info onPress={() => { 
                    console.log('pressed on right hidden row'); 
                    Actions.taskComponent();
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
  console.log(state.taskList);
  const taskArray = _.map(state.taskList.payload, (val, uid) => {
    return { ...val, uid };
  });
  const { fetching } = state.taskList;
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

export default connect(mapStateToProps, { taskFetch, taskDelete })(TaskList);
