import { Text, View, TouchableOpacity, Image} from 'react-native';
import WebView from 'react-native-webview';
import React from 'react'
import { useRoute } from '@react-navigation/native';
import {useSettings} from '../settingcontext'

export default function Description(props) {
const {darkmode, setDarkmode, name, setName, bgN, card, bgA, togglebordercolor, bgC, bgC2, headerC, text_color, federal, tech, business, crime, sports, nameboxcolor, description_bg, source_bg, goback, image_bg, header_bg} = useSettings();
const route = useRoute()
const data = route.params.app
  return (
    <View style={{flex:1, backgroundColor: bgN}}>

    <TouchableOpacity style={{backgroundColor: goback, width:100, marginLeft:7}}  onPress={()=>{props.navigation.navigate('News')}}>
    <Text style={{fontSize:25, color: text_color}} >Go Back</Text>
    </TouchableOpacity>

    <View style={{borderWidth:1, width:"98%",height:100,alignSelf:'center', backgroundColor: header_bg}}><Text style={{color: text_color}}>{data.title}</Text></View>
    <View style={{ flex: 1, flexDirection:'row'}}>
      <View style={{ flex: 1 }}>
        

        <View style={{marginLeft:10,borderWidth:1, flex: 2, marginTop:10,marginBottom:10, backgroundColor: description_bg}}><Text style={{color: text_color}}>{data.description}</Text></View>
      </View>

      <View style={{flex: 1,marginTop:10,}}>
        <View style={{borderWidth:1, flex: 1, marginLeft:10,marginRight:10, backgroundColor: image_bg, justifyContent:'center'}}><Image style={{height:140, width:140, alignSelf:'center'}} source={{uri: data.image_url}}></Image></View>

        <TouchableOpacity onPress={()=>{props.navigation.navigate('Source',{app:data})}} style={{borderWidth:1, marginLeft:10, marginTop:10,marginRight:10,marginBottom:10, height:100, backgroundColor: source_bg}}>
        <Text style={{fontSize:50, color: text_color}}>Source</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

