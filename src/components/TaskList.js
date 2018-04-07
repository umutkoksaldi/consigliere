import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { List, ListItem, Button, Icon } from 'native-base';
import { connect } from 'react-redux';

import { taskFetch, distanceFetch } from '../actions';

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

  createDataSource({ taskArray }) {
    this.dataSource = _.cloneDeep(taskArray);
  }

  render() {
    return (
      <View>
        <List
          dataArray={this.dataSource}
          renderRow={(taskItem) =>
            <ListItem>
              <Text>{taskItem.taskName}</Text>
            </ListItem>
          }
        >
        </List>
        <Button
          rounded
          style={styles.routeButton}
          onPress={this.onRouteButtonPress.bind(this)}
        >
          <Text
            style={styles.buttonText}
          >
            Route
          </Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const taskArray = _.map(state.taskList, (val, uid) => {
    return { ...val, uid };
  });

  return { taskArray };
};

const styles = {
  routeButton: {
    position: 'absolute',
    top: 400,
    right: 20,
    backgroundColor: '#9D1017',
    width: 120,
    height: 60,
    marginBottom: 100,
    marginLeft: '75%',
  },
  buttonText: {
    color: '#FFF',
    paddingLeft: 24,
    fontSize: 18,
    fontWeight: 'bold'
  }
};

export default connect(mapStateToProps, { taskFetch, distanceFetch })(TaskList);
