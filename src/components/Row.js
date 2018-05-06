import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated,
    Easing, Platform, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
    const {data, active, toggleRowActive} = this.props;
 
     return (
       <Animated.View style={[
         styles.row,
         this._style,
       ]}>
       {data.taskItem.type === 'errand' && (  
         <TouchableOpacity onLongPress={this.props.toggleRowActive} style={{ backgroundColor: 'white', }}>
          <View style={{ flex: 1, flexDirection: 'row', }}>
             <View style={{width:'95%'}}>
             <Text style={styles.listItem}> {data.taskItem.taskName}</Text>
             <Text>{data.taskItem.taskPlaceName} </Text>
             </View>
             <View style={{right:3}}>
             <Icon active name="ios-reorder"  style={{ marginRight: 10, color: '#E16E79',fontWeight: 'bold',fontSize: 40}} />
             </View>
             
             </View> 
             </TouchableOpacity>
     )}
     {data.taskItem.type !== 'errand' && (<View style={{ flex: 1, flexDirection: 'row' }}>
     <View style={{width:'95%'}}>
     <Text style={styles.listItem}> {data.taskItem.taskName}</Text>
             <Text>{data.taskItem.taskPlaceName}</Text>
             <Text> {data.taskItem.time}</Text>
             </View>
             <View style={{right:0}}>
             <Icon active name="md-lock" style={{ marginRight: 10, color: '#81D8D0',fontSize: 30 }} />
             </View>
             </View>
            
     )}
       </Animated.View>
 
     );
   }
 }

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
    backgroundColor: "white",
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
    flex: 1,
    flexDirection: "column",
   // alignItems: "center",
    // backgroundColor: "#FFFFFF",
    backgroundColor: 'white',
    padding: 16,
    width: 275,
    //height: 50,
    marginBottom:10,
    marginHorizontal: 10,
    borderRadius: 0,
    minHeight: 50,
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
  
  export { Row };
  