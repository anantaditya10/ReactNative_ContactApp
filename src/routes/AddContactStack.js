import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/Header';
import AddContact from '../screens/AddContactScreen'

const screens = {
  AddContact: {
    screen: AddContact,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Add Contact' navigation={navigation} />
      }
    },
  },
}

const AddContactStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#f0f0f0', height: 100 },
  }
});

export default AddContactStack;