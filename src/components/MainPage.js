import React, { Component } from 'react';
import { Tab, Tabs } from 'native-base';
import TaskList from './TaskList';
import MapComponent from './MapComponent';

class MainPage extends Component {
  render() {
    return (
        <Tabs
          initialPage={0}
          style={{ marginTop: -11 }}
          tabBarPosition='overlayTop'
          tabBarUnderlineStyle={{ borderWidth: 0, backgroundColor: '#E81721' }}
        >
          <Tab
            heading="Map"
            tabStyle={{
              backgroundColor: '#F8F8F8',
              borderBottomWidth: 3,
              borderColor: '#9CB4E8' }}
            activeTabStyle={{
              backgroundColor: '#F8F8F8',
              borderBottomWidth: 3,
              borderColor: '#E81721' }}
            textStyle={{ color: '#9CB4E8', fontWeight: 'bold' }}
            activeTextStyle={{ color: '#E81721', fontWeight: 'bold' }}
          >
            <MapComponent />
          </Tab>
          <Tab
            heading="Tasks"
            tabStyle={{
              backgroundColor: '#F8F8F8',
              borderBottomWidth: 3,
              borderColor: '#9CB4E8' }}
            activeTabStyle={{
              backgroundColor: '#F8F8F8',
              borderBottomWidth: 3,
              borderColor: '#E81721' }}
            textStyle={{ color: '#9CB4E8', fontWeight: 'bold' }}
            activeTextStyle={{ color: '#E81721', fontWeight: 'bold' }}
          >
            <TaskList />
          </Tab>
        </Tabs>

    );
  }
}

export default MainPage;