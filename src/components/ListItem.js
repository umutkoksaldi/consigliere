import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  Platform } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.spring();
    }
  }

  renderDescription() {
    if (this.props.expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1 }}>
            {this.props.libraryProp.description}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.libraryProp;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>

          {this.renderDescription()}

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.libraryProp.id;

  return { expanded };
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default connect(mapStateToProps, actions)(ListItem);
