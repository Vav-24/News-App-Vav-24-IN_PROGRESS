//placeholder="Email"
          //value={email}
          //onChangeText={setEmail}
          //keyboardType="email-address"
          //autoCapitalize="none"

//placeholder="Password"
          // value={password}
          // onChangeText={setPassword}
          // secureTextEntry={false}

// onPress={Auth}
//           disabled={loading}

import { Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
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

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const Auth = async () => {

    if (Platform.OS == 'web'){

    if (!email.trim() || !password.trim()) {
      alert('Missing Fields', 'Please enter your email and password.');
      return;
    }
    if (!email.includes('@')) {
      alert('Invalid Email', "Please enter a valid email with '@'!");
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
      }

    else{
      
      if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', "Please enter a valid email with '@'!");
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
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      alert('Login Failed', firebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };


  return(
<View style={{flex:1, backgroundColor:'#F95738'}}>
<View style={{height:40}}>
</View>
<View style={{height:40, alignItems:'center', backgroundColor:'green', borderRadius:100}}>
<Text style={{fontSize:30}}>Login</Text>
<Text> {isComputer 
          ? "💻 You are viewing the Desktop interface." 
          : "📱 You are viewing the Mobile interface."}</Text>
</View>

<View style={{height:40}}></View>

<View>
{/* <Image style={{height:300, borderRadius:'100%'}} source={require('')}/> */}
</View>

<View style={{height:40}}></View>

<View style={{height:200, alignItems:'center', justifyContent:'center', backgroundColor:'#177E89', borderRadius:100}}>
<TextInput style={{borderColor:'black', borderWidth:3, borderRadius:20, paddingLeft:10, width:300}} placeholder="Username" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"></TextInput>

<View style={{height:10}}>
</View>

<TextInput style={{borderColor:'black', borderWidth:3, borderRadius:20, paddingLeft:10, width:300}} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true}></TextInput>

<View style={{height:20}}>
</View>

<TouchableOpacity style={{backgroundColor:'#9BC4CB', borderRadius:10, padding:5}} onPress={Auth} disabled={loading}>
<Text style={{fontSize:20}}>Login</Text>
</TouchableOpacity>

</View>

<View style={{height:120}}></View>

<View style={{alignItems:'center'}}>
<TouchableOpacity style={{backgroundColor:'red', width:90, marginLeft:7}}  onPress={()=>{props.navigation.navigate('Signup')}}>
    <Text style={{fontSize:25}}>Signup?</Text>
    </TouchableOpacity>
</View>

</View>
);
}


function firebaseError(code) {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait and try again.';
    case 'auth/network-request-failed':
      return 'No internet connection.';
    default:
      return 'Something went wrong. Please try again.';
  }
}