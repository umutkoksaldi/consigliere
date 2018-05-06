import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, Dimensions, Alert, Platform , TouchableOpacity } from 'react-native';
import { Button, Icon, Spinner, SwipeRow } from 'native-base';
import { Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SortableList from 'react-native-sortable-list';
import { taskFetch, taskDelete, recurrentFetch } from '../actions';
import { Row } from './Row';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class TaskList extends Component {
  state = {
    items: {},
    test: {},
    testItems: {},
    order: [],
    dragenabled: false,
    flag: true,
    dateflag: true,
    date: new Date()
  };
  componentWillMount() {
    this.props.taskFetch();
    this.props.recurrentFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onRouteButtonPress() {
    const todayTasks = _.filter(this.dataSource, ["date", "today"]);
    //Alert.alert(JSON.stringify(todayTasks[1].taskName));
    this.props.distanceFetch({ todayTasks });
  }

  onDirectionsButtonPress() {
    console.log('directionsbuttonpressed');
    // this.props.getDirections(this.props.placeId, 'ChIJu-VSrb42dkARp4aCqANvr5M');
    console.log(this.props.placeId);
    console.log(this.props.coords);
    // var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=Malatya&origin_place_id=${this.props.placeId}&destination=Malatya&destination_place_id=ChIJu-VSrb42dkARp4aCqANvr5M`;
    var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=${this.props.latitude},${this.props.longitude}&destination=Malatya&destination_place_id=ChIJu-VSrb42dkARp4aCqANvr5M`;
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  onDeleteTask(taskItem) {
    const { taskuid, taskName, time, date, type } = taskItem;
    console.log(taskuid);
    Alert.alert(
      "Delete this task?",
      `${taskuid}\n${time}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => this.props.taskDelete({ uid: taskuid, date, type })
        }
      ],
      { cancelable: false }
    );
  }
  _renderRow = ({ data, active, toggleRowActive }) => {
    return <Row data={data} active={active} toggleRowActive={toggleRowActive} />;
  };

  createDataSource({ mergedArray }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(mergedArray);

    const newDataSource = this.dataSource._dataBlob.s1;
    console.log("newDataSource");
    console.log(newDataSource);

    if (newDataSource.length !== 0) {
      console.log(newDataSource[0].val);
      console.log(newDataSource[0].uid);
      for (let i = 0; i < newDataSource.length; i++) {
        this.state.items[newDataSource[i].uid] = [];
        this.state.testItems[newDataSource[i].uid] = [];
        for (let j = 0; j < newDataSource[i].val.length; j++) {
          if (j === 0) {
            this.state.testItems[newDataSource[i].uid].push({
              taskItem: {
                ...newDataSource[i].val[j],
                date: newDataSource[i].uid
              },
              height: 40
            });
          }
          this.state.items[newDataSource[i].uid].push({
            taskItem: {
              ...newDataSource[i].val[j],
              date: newDataSource[i].uid
            },
            height: 40
          });
        }
      }
      const newItems = {};
      console.log("This is new items");

      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
        newItems[key].sort((a, b) => a.taskItem.time1 > b.taskItem.time1);
      });


      console.log(newItems);

      this.setState({
        items: newItems
      });
    }
    console.log(this.state.testItems);
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  renderItem(item) {
    if (this.state.test[this.state.date] || this.state.items[this.state.date] ) {
      return (
        <View style={styles.spinnerStyle}>
          <Spinner color="red" size="large" />
        </View>
      );
    }
    return (
      <View>
      <View style={{ height: 8 }} />
      <SortableList
        style={styles.list}
        data={this.state.test}
        manuallyActivateRows
        renderRow={this._renderRow}
        order={this.state.order}
        onChangeOrder={this._onChangeOrder}
        autoscrollAreaSize = {5}
        rowActivationTime = {100}
        showsVerticalScrollIndicator
      />
      </View>

    );
  }
  getStyle(type) {
    if (type === 'errand') {
      return { backgroundColor: '#F3BF56',alignSelf: 'stretch', flexDirection: 'row', alignItems: 'stretch' ,marginTop:10,marginLeft:10,marginRight: 20, minHeight: 50 };
    } else if ( type === 'task') {   
       return {alignSelf: 'stretch', flexDirection: 'row',backgroundColor: '#81D8D0', alignItems: 'stretch' ,marginTop:10,marginLeft:10,marginRight: 20, minHeight: 50 };
    }
      return {alignSelf: 'stretch', flexDirection: 'row',backgroundColor: '#C0a8bf', alignItems: 'stretch' ,marginTop:10,marginLeft:10,marginRight: 20, minHeight: 50 };
  }

  renderItem2(item) {
    if (!this.state.flag) {
      return (
        <View style={styles.spinnerStyle}>
          <Spinner color="red" size="large" />
        </View>
      );
    }
    return (
      <View 
        //style={{ alignSelf: 'stretch', backgroundColor: 'white', flexDirection: 'row', alignItems: 'stretch', marginTop: 10, marginLeft: 10, marginRight: 20 }}
        style={this.getStyle(item.taskItem.type)}
        //style={styles.row}
      >
      <SwipeRow
        style={{ flex: 1, marginRight: 15 }}
        leftOpenValue={100}
        left={
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor:'red' }}>
            <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'blue', alignItems:'center', justifyContent:'center' }} 
             onPress={() => { 
              console.log('item');
              console.log(item); 
              Actions.taskComponent({
                task: { ...item.taskItem, time: item.taskItem.time },
                latDelta: LATITUDE_DELTA,
                longDelta: LONGITUDE_DELTA
              });
            }}
            >
            <Icon style={{ color: 'white' }} active name="create" />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: 'blue', alignItems:'center', justifyContent:'center' }}  onPress={() => this.onDeleteTask(item.taskItem)}>
              <Icon style={{ color: 'white' }} active name="trash" />
            </TouchableOpacity>
          </View>
        }
        body={
          <View style={{ flex: 1, flexDirection: 'row', justifyContent:'flex-start', paddingLeft: 16, minHeight: 50 }}>
            <View>
              <Text style={styles.listItem}>{item.taskItem.taskName}</Text>
              <Text>{item.taskItem.taskPlaceName} </Text>
              <Text> {item.taskItem.time}</Text>
            </View>
          </View>
        }
      />
    </View>
  );
  }
  loadItems(day) {
    setTimeout(() => {
      for (let i = -60; i < 60; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          // || this.state.items[strTime].length === 0
          this.state.items[strTime] = [];
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }
  _onChangeOrder = nextOrder => {
   // this.setState({ order: nextOrder });
   this.state.flag= false;
     newItems = this.state.items[this.state.date.dateString];
     console.log(newItems);
     newwItems= []
     for (i = 0; i < nextOrder.length; i++) { 
       key= nextOrder[i]
       newwItems[i]= newItems[key]
  }
  
    console.log(newwItems);
    this.state.items[this.state.date.dateString]=newwItems
    this.setState({ test: newwItems });
    this.state.flag= true;
  };

  onDayPress(day) {
    dateflag=false
    const newarr = this.state.items[day.dateString];
    if(newarr===undefined){
      order = [];
    } else {    
       order = newarr.map(x => x.taskItem.taskuid);
       order = Object.keys(newarr);

    }
   // newarr.sort((a, b) => a.taskItem.time1 > b.taskItem.time1);
    //const order = newarr.keys();
    console.log("This is the newarr");

    console.log(newarr);
    console.log("This is the order");

    console.log(order);

    this.setState({
      test: newarr,
      order: order,
      date:day
    });
  }
  render() {
    // console.log(`props: ${this.props.fetching}`);
    if (this.props.fetching) {
      return (
        <View style={styles.spinnerStyle}>
          <Spinner color="red" size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container3}>
      {this.state.dragenabled && (
        <Agenda
        items={this.state.testItems}
        selected={this.state.dateflag? this.state.date: new Date()}
        loadItemsForMonth={this.loadItems.bind(this)} //irem will write this function
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        onDayPress={this.onDayPress.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
      )}
      {!this.state.dragenabled && (
        <Agenda
        items={this.state.items}
        selected={this.state.date}
        //loadItemsForMonth={this.loadItems.bind(this)} //irem will write this function
        renderItem={this.renderItem2.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        onDayPress={this.onDayPress.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
      )}
      <View style= {{ flexDirection: "row",height:50}}>

    <Button  style={styles.ButtonStyle}
      iconRight             
      onPress={() =>this.setState({ dragenabled: !this.state.dragenabled })
      }
      >
      <Icon
      name="ios-reorder" style={{  color: "black" }}
      />
      <Text style={styles.buttonTextStyle} >
      Reorder Tasks
      </Text>

      </Button>
      <Button style={{flex:1}} 
      iconRight             
      onPress={this.onDirectionsButtonPress.bind(this)}
      >
      <Icon
      name="arrow-forward" style={{  color: "black" }}
      />
      <Text style={styles.buttonTextStyle} >
      Route!
      </Text>

      </Button>
      </View>
  </View>

     );
  }
}

const mapStateToProps = state => {
  console.log("tasklist");
  console.log(state.recurrentList);
  const today = new Date();
  const taskArray = _.map(state.taskList.payload, (val, uid) => {
    return {
      uid,
      val: _.without(
        _.map(val, (taskval, taskuid) => {
          if (taskuid !== 'errands' && taskuid !== 'recurrents') {
            return { ...taskval, taskuid };
          }
        }),
        undefined
      )
    };
  });
  console.log(taskArray);
  const errandsArray = _.map(state.taskList.payload, (val, uid) => {
    return {
      uid,
      val: _.without(
        _.map(val.errands, (taskval, taskuid) => {
          return { ...taskval, taskuid };
        }),
        undefined
      )
    };
  });
  console.log(errandsArray);
  const recurrentArray = _.map(state.recurrentList.payload, (val, uid) => {
    // const newVal = [val];
    if (val.interval === 'day') {
      return val;
    }
    if (val.interval === 'month' && 
        val.date.substring(val.date.length - 1, val.date.length) === today.getDate().toString()) {
      return val;
    }
    if (val.interval === 'week') {
      const d = new Date(val.date);
      const dayOfWeek = d.getDay();
      const dayOfWeek2 = today.getDay();

      if (dayOfWeek === dayOfWeek2) {
        return val; 
      }
    }
  });
  
  console.log(recurrentArray);
  const filteredRecArray = { uid: today.toISOString().split('T')[0], val: recurrentArray.filter((n) => { return n != undefined; }) };
  //const taskArray = state.taskList.payload.map((val, uid) => { return { ...val, uid }; });
  console.log(filteredRecArray);
  const mergedArray = _.zipWith(
    taskArray,
    errandsArray,
    filteredRecArray,
    (taskElem, errandsElem, filteredRecArrayElem) => {
      if (filteredRecArray.length === 0) {
        return {
          uid: taskElem.uid,
          val: taskElem.val.concat(errandsElem.val)
        };
      }
        return {
          uid: taskElem.uid,
          val: taskElem.val.concat(errandsElem.val).concat(filteredRecArray.val)
        };
    }
  );

  console.log('testArray');
  console.log(errandsArray);
  console.log(taskArray);
  console.log(filteredRecArray);
  console.log(mergedArray);
  const { fetching } = state.taskList;
  return { taskArray, fetching, mergedArray };
};

export default connect(mapStateToProps, { taskFetch, taskDelete, recurrentFetch })(TaskList);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    width: 400,
    height: 1000,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start"
  },
  spinnerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    ...StyleSheet.absoluteFillObject,
    height: 500,
  },
  listItem: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    minWidth: 100,

  },
  item: {
    flexDirection: 'column',
    backgroundColor: "red",
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
  },
  container3: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   backgroundColor: "#fff",

    ...Platform.select({
      ios: {
        paddingTop: 20
      }
    })
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: "#999999"
  },

  list: {
    height: 500,
    width: window.width
  },

  contentContainer: {
    ...Platform.select({
      ios: {
        paddingVertical: 30,
        width: 200,
        height: 500
      },

      android: {
        paddingVertical: 0
      }
    })
  },

  row: {
    flexDirection: 'row',
    flex: 1,
   // alignItems: "center",
    backgroundColor: '#FFFFFF',
    padding: 0,
    width: 275,
    minHeight: 50,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 0,

    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2
      },

      android: {
        elevation: 0,
        marginHorizontal: 30
      }
    })
  },

  image: {
    width: 50,
    height: 50,
    marginBottom: 15,
    borderRadius: 25
  },

  text: {
    fontSize: 18,
    color: "#222222"
  },
  ButtonStyle: {
    marginLeft: 5,
    //marginRight: 30,
   // alignSelf: 'stretch',
    backgroundColor: 'transparent',
    //justifyContent: 'center',
    //alignItems: 'center'
  },

  buttonTextStyle: {
    //alignSelf: 'center',
    color: '#000',
    fontSize: 16,
    //fontWeight: '200',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Helvetica'

  },

  
});
