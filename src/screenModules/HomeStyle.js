/**
 * Contains StyleSheet for the Home Screen
 */

import {StyleSheet} from 'react-native';
import {Colors} from '../theme';
import convertPixelToDp from '../utils/PixelConverter';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  flatlistContainerStyle: {
    marginStart: convertPixelToDp(30),
    paddingBottom: convertPixelToDp(90 + 24 + 48), // 90 & 24 as directed in design and including 48 as the text size
  },
});
