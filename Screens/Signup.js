import {Text, View, TextInput, TouchableOpacity, Alert, Platform} from 'react-native'
import {WebView} from 'react-native-webview'
import {useRoute} from '@react-navigation/native'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Identifies desktop operating systems and web browsers
export const isComputer = ['macos', 'windows', 'linux', 'web'].includes(Platform.OS);

// Identifies standard mobile operating systems
export const isPhone = ['ios', 'android'].includes(Platform.OS);

// Helper string for easy reference
export const deviceType = isComputer ? 'computer' : 'phone';

//How to use above:
//  {isComputer 
//           ? "💻 You are viewing the Desktop interface." 
//           : "📱 You are viewing the Mobile interface."}

export default function Signup(props){

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmpassword, setConfirm_Password] = useState('');
const [loading, setLoading] = useState(false);

const Register = async () => {

        if (Platform.OS == 'web'){
  
        if (!email.trim() || !password.trim() || !confirmpassword.trim()) {
          alert('Missing Fields', 'Please enter your email, password, and confirm your password.');
          return;
        }

        if (!email.trim()) {
          alert('Missing Field', 'Please enter your email.');
          return;
        }

        if (!password.trim()) {
          alert('Missing Field', 'Please enter your password.');
          return;
        }

        if (!email.trim()) {
          alert('Missing Field', 'Please enter your email.');
          return;
        }

        if (!email.trim() || !password.trim()) {
          alert('Missing Fields', 'Please enter your email and password.');
          return;
        }

        if (!password.trim() || !confirmpassword.trim()) {
          alert('Missing Fields', 'Please enter your password and confirm your password.');
          return;
        }

        if (!email.trim() || !confirmpassword.trim()) {
          alert('Missing Fields', 'Please enter your email and confirm your password.');
          return;
        }

        if (password != confirmpassword) {
          alert('Please try again!', 'Those passwords did not match.');
          return;
        }

        if (!email.includes('@')) {
          alert('Invalid Email', "Please enter a valid email with '@'!");
          return;
        }

        if (password.length  < 6){
            alert('Weak Password', "Please enter a stronger password with more than 6 characters.");
          return;
        }
      }

        else{

        if (!email.trim() || !password.trim() || !confirmpassword.trim()) {
          Alert.alert('Missing Fields', 'Please enter your email, password, and confirm your password.');
          return;
        }

        if (!email.trim()) {
          Alert.alert('Missing Field', 'Please enter your email.');
          return;
        }

        if (!password.trim()) {
          Alert.alert('Missing Field', 'Please enter your password.');
          return;
        }

        if (!email.trim()) {
          Alert.alert('Missing Field', 'Please enter your email.');
          return;
        }

        if (!email.trim() || !password.trim()) {
          Alert.alert('Missing Fields', 'Please enter your email and password.');
          return;
        }

        if (!password.trim() || !confirmpassword.trim()) {
          Alert.alert('Missing Fields', 'Please enter your password and confirm your password.');
          return;
        }

        if (!email.trim() || !confirmpassword.trim()) {
          Alert.alert('Missing Fields', 'Please enter your email and confirm your password.');
          return;
        }

        if (password != confirmpassword) {
          Alert.alert('Please try again!', 'Those passwords did not match.');
          return;
        }

        if (!email.includes('@')) {
          Alert.alert('Invalid Email', "Please enter a valid email with '@'!");
          return;
        }

        if (password.length  < 6){
            Alert.alert('Weak Password', "Please enter a stronger password with more than 6 characters.");
          return;
        }
        }

        setLoading(true);
        try {
          await createUserWithEmailAndPassword(auth, email.trim(), password);
        } catch (err) {
          alert('Signup Failed', firebaseError(err.code));
        } finally {
          setLoading(false);
        }
      };

return(
<View style={{flex:1, backgroundColor:'#F95738'}}>
<View style={{height:40}}>
</View>
<View style={{height:40, alignItems:'center', backgroundColor:'green', borderRadius:100}}>
<Text style={{fontSize:30}}>Signup</Text>
<Text> {isComputer 
          ? "💻 You are viewing the Desktop interface." 
          : "📱 You are viewing the Mobile interface."}</Text>
</View>

<View style={{height:200}}>
</View>

<View style={{height:300, alignItems:'center', justifyContent:'center', backgroundColor:'#177E89', borderRadius:100}}>
<TextInput style={{borderColor:'black', borderWidth:3, borderRadius:20, paddingLeft:10, width:300}} placeholder="Email" value={email} onChangeText={setEmail}></TextInput>

<View style={{height:10}}>
</View>

<TextInput style={{borderColor:'black', borderWidth:3, borderRadius:20, paddingLeft:10, width:300}} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true}></TextInput>

<View style={{height:10}}>
</View>

<TextInput style={{borderColor:'black', borderWidth:3, borderRadius:20, paddingLeft:10, width:300}} placeholder="Confirm Password" value={confirmpassword} onChangeText={setConfirm_Password} secureTextEntry={true}></TextInput>

<View style={{height:20}}>
</View>

<TouchableOpacity style={{backgroundColor:'#9BC4CB', borderRadius:10, padding:5}} onPress={Register}>
<Text style={{fontSize:20}}>{loading ? "Signing Up..." : "Signup"}</Text>
</TouchableOpacity>

</View>

<View style={{height:150}}></View>

<View style={{alignItems:'center'}}>
<TouchableOpacity style={{backgroundColor:'red', width:75, marginLeft:7}}  onPress={()=>{props.navigation.navigate('Login')}}>
    <Text style={{fontSize:25}}>Login?</Text>
    </TouchableOpacity>
</View>

</View>
);
}

function firebaseError(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.';
    case 'auth/network-request-failed':
      return 'No internet connection.';
    default:
      return 'Something went wrong. Please try again.';
  }
}