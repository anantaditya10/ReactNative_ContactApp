import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import HomeStack from './HomeStack';
import AddContactStack from './AddContactStack';

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Contacts: {
    screen: HomeStack,
  },
  AddContact: {
    screen: AddContactStack,
  },


}, {
  drawerBackgroundColor: '#fdfffc',


  contentOptions: {
    activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 50,
      fontSize: 20,

    },

  }
}

);

export default createAppContainer(RootDrawerNavigator);