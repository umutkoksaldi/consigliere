import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, autoCapitalize,color }) => {
    const { inputStyle, containerStyle, labelStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput 
            placeholderTextColor = {color}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                clearButtonMode = 'while-editing'
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                textAlign = 'left'
                
            />
        </View>
    );
};

const styles = {
    inputStyle: { 
        color: '#000000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 16,
        lineHeight: 23,
        flex: 2,
        textAlign: 'center'
    },
    labelStyle: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',   
        fontFamily: 'HelveticaNeue',
        paddingLeft: 0,
        flex: 1,
        textAlign: 'center'
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center' ,
        
    }
};

export { Input };

