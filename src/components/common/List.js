import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView } from 'react-native';
import axios from 'axios';
import ListElementDetail from './ListElementDetail'; //import a component inside other component

//class-based component declaration
class List extends Component {
  //setting up default state
  state = { list: [] };

  componentWillMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
      .then(response =>  this.setState({ list: response.data }));
  }

  //map each state element(each list element) to a listElement to be expressed in JSX
  renderList() {
    return this.state.list.map(listElement =>
      <ListElementDetail key={listElement.title} element={listElement} />
    );
  }

  render() {
    return (
        <ScrollView>
          {this.renderList()}
        </ScrollView>
    );
  }
}

export { List };
