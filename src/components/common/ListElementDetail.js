import React from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { Button } from 'native-base';
import Card from './Card';
import CardSection from './CardSection';

const ListElementDetail = ({ element }) => {
  // destructuring props object above in the argument and 'element' object below
  const { title, artist, thumbnail_image, image, url } = element;

  const { thumbnailStyle, textContainerStyle, thumbnailContainerStyle,
  titleTextStyle, bodyStyle } = styles;

  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: thumbnail_image }}
          />
        </View>
        <View style={textContainerStyle}>
          <Text style={titleTextStyle}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </CardSection>

      <CardSection>
        <View style={bodyStyle}>
          <Image
            style={bodyStyle}
            source={{ uri: image }}
          />
        </View>
      </CardSection>

      <CardSection>
        <Button onPressProp={() => Linking.openURL(url)}>
          Done
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  textContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  titleTextStyle: {
    fontSize: 18
  },
  bodyStyle: {
    height: 350,
    flex: 1,
    width: null
  }
};

export { ListElementDetail };
