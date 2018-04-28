import _ from 'lodash';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  Linking
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Icon, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { mapInitialize, mapSearch, latLongSearch, getDirections, taskFetch } from '../actions';


const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapComponent extends Component {
  watchId: ?number = null

  state = {
    markerPress: false
  }
  componentWillMount() {
    this.props.taskFetch();
    // var test = new Date();
    // test = test.toISOString().split('T')[0];
    // console.log(`test ${test} todaytasks`);
    // console.log(this.props.todayTasks);
  }
  componentDidMount() {
    this.props.mapInitialize();
  }

  onSearchButtonPress() {
    this.props.mapSearch();
  }

  onLocateButtonPress() {
    this.props.mapInitialize();
  }
  onDirectionsButtonPress() {
    console.log('directionsbuttonpressed');
    this.props.getDirections(this.props.placeId, 'ChIJu-VSrb42dkARp4aCqANvr5M');
    console.log(this.props.placeId);
    console.log(this.props.coords);
    var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=Malatya&origin_place_id=${this.props.placeId}&destination=Malatya&destination_place_id=ChIJu-VSrb42dkARp4aCqANvr5M`;

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  onCalloutPress() {
    console.log(this.props.address);
    Actions.taskComponent({
      task: {
      taskPlaceName: this.props.name,
      taskName: '',
      time: '',
      uid: '',
      lat: this.props.latitude,
      long: this.props.longitude,
      placeId: this.props.placeId },
      latDelta: this.props.latitudeDelta,
      longDelta: this.props.longitudeDelta,
    });
  }
  onLongPress = (e) => {
    console.log(e.nativeEvent.coordinate);
    const longitude = e.nativeEvent.coordinate.longitude;
    const latitude = e.nativeEvent.coordinate.latitude;
    console.log(longitude, latitude);
    this.props.latLongSearch(latitude, longitude);
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
          onLongPress={this.onLongPress}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{ latitude: this.props.latitude,
                    longitude: this.props.longitude,
                    longitudeDelta: this.props.longitudeDelta,
                    latitudeDelta: this.props.latitudeDelta }}
        >
          {this.props.todayTasks.map((task, index) => (
                    <Marker
                        identifier={index.toString()}
                        coordinate={{ latitude: task.lat, longitude: task.long }}
                        key={task.taskName}
                        pinColor={'#003366'}
                    />
                ))}
            <Marker
                coordinate={{ latitude: this.props.latitude,
                              longitude: this.props.longitude }}
                //style={{ pinColor: '#9D1017' }}
            >

              <MapView.Callout  tooltip={true} onPress={this.onCalloutPress.bind(this)}>
                <View style={styles.calloutContainer}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {this.props.name}
                  </Text>
                </View>
              </MapView.Callout>

            </Marker>
            <MapView.Polyline 
              coordinates={this.props.coords}
              strokeWidth={2}
              strokeColor="red" 
            />
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
          style={styles.directionsButtonStyle}
          onPress={this.onDirectionsButtonPress.bind(this)}
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
  var test = new Date();
  var testnew = test.toISOString().split('T')[0];
  console.log(state.taskList.payload[testnew]);
  const todayTasks = _.map(state.taskList.payload[testnew], (val, uid) => {
    return { ...val, uid };
  });
  //Alert.alert(JSON.stringify(state.map.latitude));
  return {
    todayTasks,
    //todayTasks: state.taskList.payload[testnew],
    coords: state.directions.payload,
    latitude: state.map.latitude,
    longitude: state.map.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    name: state.map.name,
    address: state.map.address,
    loading: state.map.loading,
    placeId: state.map.placeId
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
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
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

  directionsButtonStyle: {
    backgroundColor: '#9D1017',
    width: 60,
    height: 60,
    marginBottom: 130,
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

export default connect(mapStateToProps, { mapInitialize, mapSearch, latLongSearch, getDirections, taskFetch })(MapComponent);
