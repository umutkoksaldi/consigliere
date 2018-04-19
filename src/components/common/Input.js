import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, containerStyle, labelStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput 
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                
            />
        </View>
    );
};

const styles = {
    inputStyle: { 
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center' 
    }
};

export { Input };
// import React from 'react';
// import { TextInput, View, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Input = ({ value, icon, iconSize, iconColor, onChangeText, placeholder, placeholderTextColor, secureTextEntry }) => {
//   const { viewStyle, inputStyle, iconStyle } = styles;

//   return (
//     <View style={viewStyle}>
//       <Icon style={iconStyle} size={iconSize} color={iconColor} name={icon} />

//       <TextInput
//         secureTextEntry={secureTextEntry}
//         underlineColorAndroid='transparent'
//         placeholder={placeholder}
//         //placeholderTextColor={placeholderTextColor}
//         autoCorrect={false}
//         value={value}
//         onChangeText={onChangeText}
//         style={inputStyle}
//       />
//     </View>
//   );
// };

// const styles = {
//   viewStyle: {
//     height: 40,
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   iconStyle: {
//     flex: 1,
//     paddingLeft: 10,
//     paddingBottom: 5,
//     marginLeft: 5
//   },
//   inputStyle: {
//     color: '#FFFFFF',
//     paddingRight: 5,
//     paddingLeft: 5,
//     fontSize: 16,
//     fontWeight: '600',
//     lineHeight: 23,
//     flex: 7
//   }
// };

// export { Input };
