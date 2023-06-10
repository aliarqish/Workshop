/**
 * Custom search bar for searching data
 */

import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  Text,
} from 'react-native';
import {ImageConstants} from '../assets/ImageConstants';
import convertPixelToDp from '../utils/PixelConverter';
import {Colors, Fonts} from '../theme';

const SearchBar = props => {
  const [searchEnabled, setSearchEnabled] = useState(false); // State to check if user has tapped on search icon & enabled searching
  const pageTitle = 'Romantic Comedy';

  return (
    <ImageBackground
      source={ImageConstants.navBar}
      style={[styles.container, {height: convertPixelToDp(props?.height)}]}>
        <TouchableOpacity
          onPress={() => {
            setSearchEnabled(false);
            props?.onBack();
          }}>
          <Image
            source={ImageConstants.backButton}
            style={styles.backButtonStyle}
          />
        </TouchableOpacity>

      {searchEnabled ? (
        <TextInput
          autoFocus={true}
          autoCorrect={false}
          style={styles.inputs}
          selectionColor={Colors.white}
          underlineColorAndroid="transparent"
          onChangeText={props?.onChangeText}
          keyboardType="default"
        />
      ) : (
        <Text style={styles.inputs}>{pageTitle}</Text>
      )}

      <TouchableOpacity
        style={styles.searchIconContainer}
        onPress={() => {
          setSearchEnabled(true);
        }}>
        <Image
          source={ImageConstants.searchIcon}
          style={styles.searchIconStyle}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: convertPixelToDp(30),
  },
  backButtonStyle: {
    height: 20,
    width: 20,
  },
  searchIconStyle: {
    height: 20,
    width: 20,
  },
  inputs: {
    flex: 1,
    marginHorizontal: convertPixelToDp(30),
    color: Colors.white,
    fontFamily: Fonts.TitilliumWebRegular,
    fontSize: convertPixelToDp(58),
  },
  searchIconContainer: {
    alignContent: 'flex-end',
  },
  backButtonSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchBar;
