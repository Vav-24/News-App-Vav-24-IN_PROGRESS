import { Text, View, TouchableOpacity, Image} from 'react-native';
import WebView from 'react-native-webview';
import React from 'react'
import { useRoute } from '@react-navigation/native';

export default function Description(props) {
const route = useRoute()
const data = route.params.app
  return (
    <View style={{flex:1}}>

    <TouchableOpacity style={{backgroundColor:'blue', width:100, marginLeft:7}}  onPress={()=>{props.navigation.navigate('News')}}>
    <Text style={{fontSize:25}} >Go Back</Text>
    </TouchableOpacity>

    <View style={{borderWidth:1, width:"98%",height:100,alignSelf:'center', backgroundColor:'red'}}><Text>{data.title}</Text></View>
    <View style={{ flex: 1, flexDirection:'row'}}>
      <View style={{ flex: 1 }}>
        

        <View style={{marginLeft:10,borderWidth:1, flex: 2, marginTop:10,marginBottom:10, backgroundColor:'orange'}}><Text>{data.description}</Text></View>
      </View>

      <View style={{flex: 1,marginTop:10,}}>
        <View style={{borderWidth:1, flex: 1, marginLeft:10,marginRight:10, backgroundColor:'yellow', justifyContent:'center'}}><Image style={{height:140, width:140, alignSelf:'center'}} source={{uri: data.image_url}}></Image></View>

        <TouchableOpacity onPress={()=>{props.navigation.navigate('Source',{app:data})}} style={{borderWidth:1, marginLeft:10, marginTop:10,marginRight:10,marginBottom:10, height:100, backgroundColor:'green'}}>
        <Text style={{fontSize:50}}>Source</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

