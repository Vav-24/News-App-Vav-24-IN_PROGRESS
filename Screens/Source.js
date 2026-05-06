import {View, Text, TouchableOpacity} from 'react-native'
import {WebView} from 'react-native-webview'
import { useRoute } from '@react-navigation/native';




const Source = (props) => {

const route = useRoute()
const data = route.params.app

  return (
    <View style={{flex:1}}>
    <TouchableOpacity style={{backgroundColor:'blue', width:100, marginLeft:7}}  onPress={()=>{props.navigation.navigate('News')}}>
    <Text style={{fontSize:25}} >Go Back</Text>
    </TouchableOpacity>
<WebView source={{uri:data.url}}></WebView>
    </View>
  )
}

export default Source