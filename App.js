/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Text} from 'react-native';
import {Provider} from 'react-redux';

import Home from './app/containers/Home';

//Redux
import store from './app/stores';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
