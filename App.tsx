/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store'

import Navigator from 'features/navigation/Navigator'
import { makeServer } from 'mock/server'

function App(): React.JSX.Element {

  // if (
  //   process.env.NODE_ENV === 'development'
  // ) {
  //   makeServer();
  // }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
