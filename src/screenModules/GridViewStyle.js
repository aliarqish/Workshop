/**
 * Contains StyleSheet for custom Grid View
 */

import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../theme';
import convertPixelToDp from '../utils/PixelConverter';

export const Styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    marginBottom: convertPixelToDp(90),
  },
  gridText: {
    fontFamily: Fonts.TitilliumWebLight,
    fontSize: convertPixelToDp(48), // 36pt as per design which equals to 48px
    color: Colors.white,
    marginTop: convertPixelToDp(24),
  },
});
