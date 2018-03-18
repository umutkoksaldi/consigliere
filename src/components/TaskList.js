import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'native-base';
import { connect } from 'react-redux';

import { taskFetch } from '../actions';

class TaskList extends Component {
  componentWillMount() {
    this.props.taskFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
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

export default connect(mapStateToProps, { taskFetch })(TaskList);
