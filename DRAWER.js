import {Alert, Platform} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'; 
import './pollyfield';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {useSettings} from './settingcontext'
import {signOut} from 'firebase/auth'
import {auth} from './firebaseConfig'

import Account from './Screens/Account';
import CalendarScreen from './Screens/Calendar';
import News_Stack from './News_Stack';


const Drawer = createDrawerNavigator();

//TERMINATE:
// const handleSignout = () => { Alert.alert('Sign Out', 'Are you sure you want to sign out?', [ { text: 'Cancel', style: 'cancel' }, { text: 'Sign Out', style: 'destructive', onPress: () => signOut(auth), // No navigation needed — App.js listener handles it automatically }, ]); };
//V2 below
//const handleSignout = () => { alert('Sign Out', 'Are you sure you want to sign out?', [ { text: 'Cancel', style: 'cancel' }, { text: 'Sign Out', style: 'destructive', onPress: () => signOut(auth), /*props.navigation.navigate('Login')*/  }, ]); };

function CustomDrawerContent(props) {
  const handleSignout = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to sign out?');
      if (confirmed) {
        signOut(auth); /*props.navigation.navigate('Login')*/
      }
    } else {
      Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => signOut(auth) /*props.navigation.navigate('Login')*/ },
      ]);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Signout"
        icon={({ color, size }) => <Ionicons name="exit-outline" size={size} color={color} />}
        onPress={handleSignout}
      />
    </DrawerContentScrollView>
  );
}



export default function DRAWER() {
  //Stylings Import
  const {darkmode, setDarkmode, name, setName, bgN, card, bgA, togglebordercolor, bgC, headerC, text_color} = useSettings();
  return (
      <Drawer.Navigator
      drawerContent={(props)=><CustomDrawerContent {...props}></CustomDrawerContent>}
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
        initialRouteName="Account"
      >
        <Drawer.Screen name="News" component={News_Stack} options={{headerShown: true ,headerStyle: {backgroundColor: bgN}, headerTintColor: text_color}}/>
        <Drawer.Screen name="Account" component={Account} options={{headerStyle: {backgroundColor: bgA}, headerTintColor: text_color}}/>
        <Drawer.Screen name="Calendar" component={CalendarScreen} options={{headerStyle: {backgroundColor: headerC}, headerTintColor: text_color}} />
      </Drawer.Navigator>
  );
}