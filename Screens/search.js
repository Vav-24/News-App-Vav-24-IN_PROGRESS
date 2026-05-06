import {Text, View} from 'react-native'
import {WebView} from 'react-native-webview'
import {useRoute} from '@react-navigation/native'

export default function Search(){

  const   route = useRoute()
  const web = route.params.app
  
return(
<View style={{flex:1}}>

<WebView source={{uri:`https://www.${web}.com`}}>
</WebView>


</View>
)
}