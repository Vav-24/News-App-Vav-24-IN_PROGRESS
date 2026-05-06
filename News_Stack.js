// Navigation - Jump from one screen to another screen
// we need two component for this
// 1. NavigationContainer 2. createStackNavigator
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// we need to import all the screens
import Description from './Screens/Description'
import News from './Screens/News'
import Source from './Screens/Source'

// we need to create instance for createStackNavigator


const Stack = createStackNavigator();

// createStackNavigator is responsible to tell that which navigation we are using and how many screens we are having and what is name  

export default function News_Stack(){
  return(
  
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name = 'News' component={News}></Stack.Screen>
         <Stack.Screen options={{headerShown: false}} name = 'Description' component={Description}></Stack.Screen>

         <Stack.Screen options={{headerShown: false}} name = 'Source' component={Source}></Stack.Screen>
      </Stack.Navigator> 
  )
}