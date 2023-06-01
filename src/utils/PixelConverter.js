/**
 * Helps to convert the pixel values into dp which is the default unit in React Native app designing
 * Using this throughtout the app for styling as pixel values cannot be passed as input in React Native
 */

import React from 'react';
import {PixelRatio} from 'react-native';

const convertPixelToDp = pixelValue => {
  return pixelValue / PixelRatio.get();
};

export default convertPixelToDp;
