/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import sagas from './sagas';
import tvReducer from './slices/tvSlice';
const App: () => React$Node = () => {

  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      tv: tvReducer,
    },
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(sagas);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#14131C',
      text: 'white',
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        {<AppNavigation />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
