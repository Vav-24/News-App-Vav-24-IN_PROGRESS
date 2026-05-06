import { Text, SafeAreaView, StyleSheet, View, FlatList, Image, TouchableOpacity, ScrollView, Button} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import {useState,useEffect} from 'react'
import {categoriesData} from './Data'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Linking, Alert} from 'react-native';
import {useSettings} from '../settingcontext'

export default function News (props){
  //Stylings Import
  const {darkmode, setDarkmode, name, setName, bgN, card, bgA, togglebordercolor, bgC, text_color, federal, tech, business, crime, sports} = useSettings();
  const [currentcatagory, setcurrentcatagory]=useState('Federal')
  const [data, setData] = useState([])
  
const Categories = [
  { id: '1', name: 'Federal', image: federal },
  { id: '2', name: 'Tech', image: tech },
  { id: '3', name: 'Business', image: business },
  { id: '4', name: 'Crime', image: crime },
  { id: '5', name: 'Sports', image: sports },
];

  async function Apicall(){
    let apidata= await fetch('https://api.thenewsapi.com/v1/news/top?api_token=re80rEF7q061lCAmSKuTjuUB5FcFNiUxsI2WfeiW&locale=us&limit=3') //or try https://api.thenewsapi.com/v1/news/top?api_token=doyVhdxC25CHu9ptFNnJ3W6UT7i3o5DlKb4EA2Cv&locale=us&limit=3
    let jsondata = await apidata.json()
    setData(jsondata)
    console.log(data)
  }

useEffect(()=>{
  Apicall()
  },[])

const sendmail=()=>{
  const tomail = 'vivaanmailer@gmail.com'
  const subject = 'Question from News App'
  const body = '' //user will edit this

  const mailtourl = `mailto:${tomail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  Linking.canOpenURL(mailtourl).then((supported)=>{
    if (supported){
      return Linking.openURL(mailtourl)
    }

    else{
      Alert.alert('No email app found on device')
    }
  })
}    

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgN }]}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        styles={{
          textInput: {
            backgroundColor: 'maroon',
            borderRadius: 20,
            fontWeight: '700',
            marginTop: 7,
            paddingHorizontal: 10,
          },
          textInputContainer: {
            backgroundColor: 'brown',
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            paddingHorizontal: 10,
          },
        }}
        renderLeftButton={() => (
          <View style={{ paddingLeft: 10 }}>
            <Ionicons name='location-sharp' size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View style={styles.rightButton}>
            <AntDesign name="clockcircle" size={15} style={styles.clockIcon} />
            <Text>Search</Text>
          </View>
        )}
      />

<View style={{height:10}}></View>

      <Text style={[styles.categoryTitle, {color:text_color}]}>Categories</Text>
      <FlatList
        data={Categories}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
          <TouchableOpacity onPress={()=>{setcurrentcatagory(item.name)}}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={[styles.categoryText, {color:text_color}]}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />
      
 <View style={{height:20}}></View>

<View style={{alignItems:'center'}}>
<Text style={{fontWeight:'bold', fontSize:20, color: text_color}}>Any Questions?</Text>
<TouchableOpacity style={{backgroundColor:'skyblue', borderRadius:5}} onPress={sendmail}>
<Text style={{fontWeight:'bold', fontSize:15}}>Contact Us!!</Text>
</TouchableOpacity>
</View>

<ScrollView style = {{marginTop: 50,}} showsVerticalScrollIndicator={false}>
      {data?.data?.map((News)=>(



        <View>

        
          <View style={{ backgroundColor: card, borderRadius: 4, borderWidth: 5, borderColor: 'black', padding: 10, margin: 20, height:60, width:200, marginBottom:30, alignContent:'center'}}>
<TouchableOpacity onPress={()=>{props.navigation.navigate('Description',{app:News})}}>


<Text style={{fontSize:10, marginTop:-5, overflow:'hidden', color: text_color}}>{News.title.slice()}......</Text>


      </TouchableOpacity>
</View>

      <View style={{borderRadius: 4, borderWidth: 5, borderColor: 'black', padding: 10, margin: 20, height:60, width:60, marginLeft:240, marginTop:-90, marginBottom:10, justifyContent:'Center', alignItems:'center', backgroundColor:'blue'}}>

<Image style={{height:40, width:50}} source={{uri: News.image_url}}></Image>

      </View>
      </View>
      ))}
     
    
     </ScrollView>



    </ScrollView>
    
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    padding: 8,
  },
  rightButton: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
    borderRadius: 20,
    alignItems: 'center',
    padding: 6,
    marginRight: 10,
  },
  clockIcon: {
    marginRight: 6,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    marginBottom:10,
    marginTop:30
  },
  categoryList: {
    marginTop: 10,
    paddingLeft: 10,
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
});