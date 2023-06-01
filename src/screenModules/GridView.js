/**
 * Custom Grid View used for listing on HomeScreen
 */

import React from 'react';
import {Image, Text, View} from 'react-native';
import {Styles} from './GridViewStyle';
import {ImageConstants} from '../assets/ImageConstants';

const GridView = props => {
  const updatedImageName = props?.imageName?.slice(0, -4); // Remove ".jpg" from poster_image key we get in API response for better naming convention & easy use

  return (
    <View style={Styles.gridContainer}>
      <Image
        defaultSource={ImageConstants.placeholder}
        source={
          ImageConstants[updatedImageName]
            ? ImageConstants[updatedImageName]
            : ImageConstants.placeholder
        }
        style={{height: props?.height, width: props?.width}}
      />
      <Text
        numberOfLines={2} // If poster title exceeds 2 lines then truncate it with (...)
        ellipsizeMode="tail"
        style={[Styles.gridText, {width: props?.width}]}>
        {props?.name}
      </Text>
    </View>
  );
};

export default GridView;
