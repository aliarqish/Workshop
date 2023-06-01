/**
 * Workshop - React Native Application for listing of Posters along with their title
 *
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screenModules/HomeScreen';
import {Colors} from './src/theme';

const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});

export default App;
