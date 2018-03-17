import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Button, Item, Input } from 'native-base';
import { taskUpdate, taskCreate } from '../actions';
import { CardSection } from './common';

class TaskCreate extends Component {

  onDoneButtonPress() {
    const { name, phone } = this.props;

    this.props.taskCreate({ name, phone });
  }

  render() {
    return (
      <View>
        <Item underline style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}>
          <Input
            label="Name"
            placeholder="Visit Grandma"
            style={styles.input}
            value={this.props.name}
            onChangeText={value => this.props.taskUpdate({ prop: 'name', value })}
          />
        </Item>

        <Item underline style={{ marginLeft: 20, marginRight: 20 }}>
          <Input
            label="Phone"
            placeholder="5 pm"
            style={styles.input}
            value={this.props.phone}
            onChangeText={value => this.props.taskUpdate({ prop: 'phone', value })}
          />
        </Item>

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
                style={{ pinColor: '#9D1017' }}
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

        <Button
          block
          style={styles.saveButton}
          onPress={this.onDoneButtonPress.bind(this)}
        >
          <Text style={styles.buttonText}>
            Save
          </Text>
        </Button>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone } = state.taskForm;

  return { name, phone };
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
  saveButton: {
    backgroundColor: '#9D1017',
    marginTop: 25
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
    placeholderTextColor: '#939799',
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

