import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 5, //for the corner of the container
    borderColor: '#9D1017',
    borderBottomWİdth: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export { Card };
