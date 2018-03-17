import React from 'react';
import { TextInput, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({ value, icon, iconSize, iconColor, onChangeText, placeholder, placeholderTextColor, secureTextEntry }) => {
  const { viewStyle, inputStyle, iconStyle } = styles;

  return (
    <View style={viewStyle}>
      <Icon style={iconStyle} size={iconSize} color={iconColor} name={icon} />

      <TextInput
        secureTextEntry={secureTextEntry}
        underlineColorAndroid='transparent'
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
      />
    </View>
  );
};

const styles = {
  viewStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStyle: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 5,
    marginLeft: 5
  },
  inputStyle: {
    color: '#FFFFFF',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23,
    flex: 7
  }
};

export { Input };
