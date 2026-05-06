import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import './pollyfield';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {useSettings} from './settingcontext'

import News from './Screens/News';
import Account from './Screens/Account';
import CalendarScreen from './Screens/Calendar';
import News_Stack from './News_Stack';

const Drawer = createDrawerNavigator();

export default function DRAWER() {
  //Stylings Import
  const {darkmode, setDarkmode, name, setName, bgN, card, bgA, togglebordercolor, bgC, headerC, text_color} = useSettings();
  return (
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerIcon: ({ color, size }) => {
            // Define icons based on the route name
            if (route.name === 'News') {
              return <Ionicons name="newspaper-outline" size={size} color={color}/>;
            } else if (route.name === 'Account') {
              return <Ionicons name="person-circle-outline" size={size} color={color}/>;
            } else if (route.name === 'Calendar') {
              return <Ionicons name="calendar-outline" size={size} color={color}/>;
            } else if (route.name === 'Signout') {
              return <Ionicons name="exit-outline" size={size} color={color} />;
              
            }
          },
          drawerActiveTintColor: 'black', // Customize active item color
          drawerInactiveTintColor: 'gray', // Customize inactive item color
        })}
        initialRouteName="News"
      >
        <Drawer.Screen name="News" component={News_Stack} options={{headerShown: true ,headerStyle: {backgroundColor: bgN}, headerTintColor: text_color}}/>
        <Drawer.Screen name="Account" component={Account} options={{headerStyle: {backgroundColor: bgA}, headerTintColor: text_color}}/>
        <Drawer.Screen name="Calendar" component={CalendarScreen} options={{headerStyle: {backgroundColor: headerC}, headerTintColor: text_color}} />
      </Drawer.Navigator>
  );
}
