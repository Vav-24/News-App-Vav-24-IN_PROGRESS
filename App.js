// Navigation - Jump from one screen to another screen
// we need two component for this
// 1. NavigationContainer 2. createStackNavigator
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SettingsProvider} from './settingcontext'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useEffect, useState } from 'react'; import { View, ActivityIndicator } from 'react-native';


// we need to import all the screens
import Signup from './Screens/Signup'
import DRAWER from './DRAWER'
import Login from './Screens/Login'

// we need to create instance for createStackNavigator


const Stack = createStackNavigator();


// createStackNavigator is responsible to tell that which navigation we are using and how many screens we are having and what is name  

export default function App(){

   const [user, setUser] = useState(undefined);
   useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#900303' }}>
        <ActivityIndicator size="large" color="#040f8a" />
      </View>
    );
  }


  return(
    <SettingsProvider>
  <NavigationContainer>
      <Stack.Navigator /*initialRouteName="Login*/>
        {user ? (
          <Stack.Screen options={{headerShown: false}} name = 'DRAWER' component={DRAWER}></Stack.Screen>
        ) : (
          <>
          <Stack.Screen options={{headerShown: false}} name = 'Login' component={Login}></Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name = 'Signup' component={Signup}></Stack.Screen>
          </>
        )
      }

      </Stack.Navigator> 
  </NavigationContainer>
  </SettingsProvider>
  )
}