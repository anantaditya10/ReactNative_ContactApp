import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/Header';
import Home from '../screens/HomeScreen';
import UpdateContact from '../screens/UpdateContactScreen';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Contact List' navigation={navigation} />
      }
    },
  },
  UpdateContact: {
    screen: UpdateContact,
    navigationOptions: {
      headerTitle: 'Update Contact',
    }
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: '#f0f0f0', height: 100 }
  }
});

export default HomeStack;


