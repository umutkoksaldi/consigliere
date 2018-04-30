import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,

} from 'react-native';
import { Button, Text } from 'native-base';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

class CustomCallout extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.bubble}>
          <View style={styles.amount}>
            {this.props.children}
          </View>
          <View>
            <Button small block style={styles.buttonStyle} ><Text>Add Task</Text></Button>
          </View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 140,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#4da2ab',
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonStyle: {
    padding: 0,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#265155',
    marginBottom: -10,
    backgroundColor: '#4da2ab'
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#4da2ab',
    alignSelf: 'center',
    marginTop: -32,
    marginBottom: -16
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

export { CustomCallout };
