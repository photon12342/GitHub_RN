import React from "react";
import {Provider} from 'react-redux';
import AppNavigator from './js/navigator/AppNavigator';
import store from './js/store';

const App = () => {
  const App = AppNavigator();

  return <Provider store={store}>{App}</Provider>
}

export default App;