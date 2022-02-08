import React from 'react';
import { Provider as ContactProvider } from './src/context/ContactContext';
import { setNavigator } from './src/navigationRef'
import Navigator from './src/routes/Drawer';

const App = Navigator
export default () => {
  return <ContactProvider>
    <App ref={(navigator) => { setNavigator(navigator) }} />
  </ContactProvider>
};

