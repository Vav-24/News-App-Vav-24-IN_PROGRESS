import {Text, View, TextInput, TouchableOpacity} from 'react-native'
import {WebView} from 'react-native-webview'
import {useRoute} from '@react-navigation/native'

export default function Login(props){
  
return(
<View style={{flex:1, backgroundColor:'#F95738'}}>
<View style={{height:40}}>
</View>
<View style={{height:40, alignItems:'center', backgroundColor:'green', borderRadius:100}}>
<Text style={{fontSize:30}}>Login</Text>
</View>

<View style={{height:250}}>
</View>

<View style={{height:200, alignItems:'center', justifyContent:'center', backgroundColor:'#177E89', borderRadius:100}}>
<TextInput style={{borderColor:'black', borderWidth:3, borderRadius:20, paddingLeft:10, width:300}} placeholder="Username"></TextInput>

<View style={{height:10}}>
</View>

<TextInput style={{borderColor:'black', borderWidth:3, borderRadius:20, paddingLeft:10, width:300}} placeholder="Password"></TextInput>

<View style={{height:20}}>
</View>

<TouchableOpacity style={{backgroundColor:'#9BC4CB', borderRadius:10, padding:5}}>
<Text style={{fontSize:20}}>Login</Text>
</TouchableOpacity>

</View>

<View style={{height:150}}></View>

<View style={{alignItems:'center'}}>
<TouchableOpacity style={{backgroundColor:'red', width:90, marginLeft:7}}  onPress={()=>{props.navigation.navigate('Signup')}}>
    <Text style={{fontSize:25}}>Signup?</Text>
    </TouchableOpacity>
</View>

</View>
)
}