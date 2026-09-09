import { Text, SafeAreaView, StyleSheet, View, FlatList, Image, TouchableOpacity, ScrollView, Button, Switch, TextInput, Modal, Alert, Linking} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSettings } from '../settingcontext';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updatePassword, updateProfile, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

export default function Account() {
  //Stylings Import
  const { darkmode, setDarkmode, listmode, setListmode, name, setName, bgN, card, bgA, togglebordercolor, bgC, bgC2, headerC, text_color, federal, tech, business, crime, sports, nameboxcolor, description_bg, source_bg, goback, image_bg, header_bg, calender_mode } = useSettings();
  // States for toggles
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [toggle5, setToggle5] = useState(false);
  const [toggle6, setToggle6] = useState(false);
  const [toggle7, setToggle7] = useState(false);
  const [toggle8, setToggle8] = useState(false);

  const defaultimage =
    'https://thumbs.dreamstime.com/b/group-people-logo-handshake-circle-teamwork-icon-vector-illustrator-150899205.jpg';
  const [imageurl, setimageurl] = useState(defaultimage);
  const [showimagemodal, setshowimagemodal] = useState(false);
  const [newimage, setnewimage] = useState('');

  // States for updating credentials
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const auth = getAuth();

  const saveimage = async (url) => {
    await AsyncStorage.setItem('profile', url);
  };
  const loadimage = async () => {
    const temp = await AsyncStorage.getItem('profile');
    if (temp) setimageurl(temp);
  };
  // Styles
  const styles = StyleSheet.create({
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: togglebordercolor,
      borderWidth: 5,
      marginTop: 5,
    },
    settingText: {
      fontSize: 20,
      color: text_color,
    },
    switch: {
      marginTop: 7.5,
    },
  });

  // State for user name

  // Functions to store and retrieve user name
  const storeUser = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(name));
    } catch (error) {
      console.log(error);
    }
    
  };


  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      setName(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    loadimage();
  }, []);

  // const bgN = darkmode ? 'darkpurple' : 'purple' //Note to self: Change later
  //   const card = darkmode ? 'darkorange' : 'orange'
  // const bgA = darkmode ? 'darkblue' : 'blue' //Note to self: Change later
  //   const togglebordercolor = darkmode ? 'darkred' : 'red' //Note to self: Change later
  // const bgC = darkmode ? 'darkyellow' : 'yellow' //Note to self: Change later
  // const text = darkmode ? 'white' : 'black' //Global, except for calendar

const handlesaveimg = () => {
  if(newimage.trim()){
    setimageurl(newimage)
    saveimage(newimage)
    setnewimage('')
  }
  else{
    Alert.alert('Please enter a valid image url')
  }
}
const handledownloadimg = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Need permission to access photos');
    return;
  }
  
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });
  
  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    setimageurl(imageUri);
    saveimage(imageUri);
  }
};

const handleUpdateCredentials = async () => {
  const user = auth.currentUser;
  if (!user) {
    Alert.alert("Error", "No user is currently logged in.");
    return;
  }

  if (!currentPassword) {
    Alert.alert("Error", "Please enter your current password to confirm changes.");
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    if (newUsername.trim()) {
      await updateProfile(user, { displayName: newUsername });
      setName(newUsername);
    }

    Alert.alert("Success", "Account details updated successfully!");
    setNewUsername('');
    setCurrentPassword('');
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: bgA }}>
      <View style={{ backgroundColor: nameboxcolor, flexDirection: 'row' }}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>setshowimagemodal(true)}>
          <Image
            source={{
              uri: imageurl,
            }}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </TouchableOpacity>
        <View style={{ width: 300 }}>
          {' '}
          ,
          <TextInput
            onChangeText={(value) => {
              setName(value);
            }}
            style={{ fontSize: 20 }}
            placeholder="Name"
          />
        </View>
      </View>

      <Modal
        visible={showimagemodal}
        transparent
        onRequestClose={() => setshowimagemodal(false)}>
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}> {/* Outer View For Position*/}
        <View style={{backgroundColor: togglebordercolor, justifyContent:'center', alignItems:'center', height:200, width:300}}> {/* Style background and other stuff here */}
        <Text style={{color:'green', fontWeight:'bold', fontSize:30}}>Custom Image!!</Text>
        <TouchableOpacity onPress={handlesaveimg}><Text style={{color:'blue'}}>Save Image</Text></TouchableOpacity>
        <TextInput placeholder='URL' value={newimage} onChangeText={setnewimage} style={{borderColor:'black', borderRadius:5, borderWidth:3, width:200}}></TextInput>
        <TouchableOpacity onPress={handledownloadimg}><Text style={{color:'blue'}}>Download Image</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setshowimagemodal(false)}><Text style={{color:'blue'}}>Cancel</Text></TouchableOpacity>
        </View>
        </View>
        </Modal>

      {/* Toggle Settings */}
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          style={styles.switch}
          onValueChange={(value) => setDarkmode(value)}
          value={darkmode}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>*</Text>
        <Switch
          style={styles.switch}
          onValueChange={(value) => setListmode(value)}
          value={listmode}
        />
      </View>
      <View style={{height:100}}></View>
<View style ={{alignItems:'center'}}>
      <View style={{alignItems:'center', borderColor:'black', borderWidth:'25', backgroundColor:'purple', width:500, borderRadius:50}}>
        <Text style={{fontWeight:'bold', color:'#5796ee'}}></Text>
        <TextInput style={{borderWidth:3, borderRadius:30}} placeholder='Username' value={newUsername} onChangeText={setNewUsername}/>
        <View style={{height:5}}></View>
        <TextInput style={{borderWidth:3, borderRadius:30}} placeholder='Password' secureTextEntry={true} value={currentPassword} onChangeText={setCurrentPassword}/>
        <View style={{height:5}}></View>
        <TouchableOpacity style={{backgroundColor:'#5796ee, borderRadius:30, borderWidth:3'}}><Text style={{backgroundColor:'#5796ee', borderRadius:30}}>Update Username and Password</Text></TouchableOpacity>
      </View>
</View>

    </ScrollView>
  );
}