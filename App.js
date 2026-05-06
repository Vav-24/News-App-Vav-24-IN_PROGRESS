// Navigation - Jump from one screen to another screen
// we need two component for this
// 1. NavigationContainer 2. createStackNavigator
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SettingsProvider} from './settingcontext'

// we need to import all the screens
import Signup from './Screens/Signup'
import DRAWER from './DRAWER'
import Login from './Screens/Login'

// we need to create instance for createStackNavigator


const Stack = createStackNavigator();


// createStackNavigator is responsible to tell that which navigation we are using and how many screens we are having and what is name  

export default function App(){
  return(
    <SettingsProvider>
  <NavigationContainer>
      <Stack.Navigator initialRouteName="DRAWER">

         <Stack.Screen options={{headerShown: false}} name = 'Signup' component={Signup}></Stack.Screen>

         <Stack.Screen options={{headerShown: false}} name = 'Login' component={Login}></Stack.Screen>

         <Stack.Screen options={{headerShown: false}} name = 'DRAWER' component={DRAWER}></Stack.Screen>

      </Stack.Navigator> 
  </NavigationContainer>
  </SettingsProvider>
  )
}