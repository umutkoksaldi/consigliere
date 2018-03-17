import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import { Button, Icon, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { mapInitialize, mapUpdate, mapSearch } from '../actions';


const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapComponent extends Component {
  watchId: ?number = null

  componentDidMount() {
    this.props.mapInitialize();
  }

  onSearchButtonPress() {
    this.props.mapSearch();
  }

  onLocateButtonPress() {
    this.props.mapInitialize();
  }

  onCalloutPress() {
    Actions.taskComponent();
  }

  render() {
    if (this.props.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color='#9D1017' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{ latitude: this.props.latitude,
                    longitude: this.props.longitude,
                    longitudeDelta: this.props.longitudeDelta,
                    latitudeDelta: this.props.latitudeDelta }}
        >
            <MapView.Marker
                coordinate={{ latitude: this.props.latitude,
                              longitude: this.props.longitude }}
                style={{ pinColor: '#9D1017' }}
            >

              <MapView.Callout onPress={this.onCalloutPress.bind(this)}>
                <View style={styles.calloutContainer}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {this.props.name}
                  </Text>
                </View>
              </MapView.Callout>

            </MapView.Marker>
        </MapView>

        <Button
          rounded
          iconleft
          style={styles.searchButtonStyle}
          onPress={this.onSearchButtonPress.bind(this)}
        >
          <Icon name='search' style={{ fontSize: 30, paddingLeft: 4 }} />
        </Button>

        <Button
          rounded
          iconleft
          style={styles.locateButtonStyle}
          onPress={this.onLocateButtonPress.bind(this)}
        >
          <Icon name='locate' style={{ fontSize: 30, paddingLeft: 1 }} />
        </Button>

      </View>
    );
  }

}

const mapStateToProps = state => {
  //Alert.alert(JSON.stringify(state.map.latitude));
  return {
    latitude: state.map.latitude,
    longitude: state.map.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    name: state.map.name,
    address: state.map.address,
    loading: state.map.loading
  };

  // Alert.alert(JSON.stringify(state.map.latitude));
  //Alert.alert(JSON.stringify(initialRegion.latitudeDelta));
  //return initialRegion;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end'
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  calloutContainer: {
    flex: 1,
    width: 100,
    height: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  marker: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
    borderWidth: 3,
    borderColor: 'white',
  },

  searchButtonStyle: {
    backgroundColor: '#9D1017',
    width: 60,
    height: 60,
    marginBottom: 10,
    marginLeft: '75%'
  },

  locateButtonStyle: {
    backgroundColor: '#9D1017',
    width: 60,
    height: 60,
    marginBottom: 70,
    marginLeft: '75%'
  },

  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps, { mapInitialize, mapUpdate, mapSearch })(MapComponent);