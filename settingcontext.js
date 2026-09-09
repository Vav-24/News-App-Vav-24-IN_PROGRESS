import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [darkmode, setDarkmode] = useState(false);
  const [name, setName] = useState('');


  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem('appsettings');
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          setDarkmode(parsed.darkmode ?? false);
          setName(parsed.name ?? '');
        }
      } catch (e) {
        console.log(e);
      }
    };
    load();
  }, []);

 
  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem('appsettings', JSON.stringify({ darkmode, name }));
      } catch (e) {
        console.log(e);
      }
    };
    save();
  }, [darkmode, name]);


 const bgN = darkmode ? '#18035e' : 'purple' //Note to self: Change later
  const card = darkmode ? '#913d01' : 'orange'
const bgA = darkmode ? 'darkblue' : 'blue' //Note to self: Change later
  const togglebordercolor = darkmode ? '#470101' : '#FF0000' //Note to self: Change later
  const nameboxcolor = darkmode ? '#634101' : '#FFA500' //Note to self: Change later
const bgC = darkmode ? '#806b32' : '#F2CD60' //Note to self: Change later
const bgC2 = darkmode ? '#360108' : '#96031A' //Note to self: Change later
const headerC = darkmode ? '#06402B' : 'green' //Note to self: Change later
const text_color = darkmode ? 'white' : 'black' //Global, except for calendar
const description_bg = darkmode ? '#ffa60080' : 'orange'
const header_bg = darkmode ? '#ff000063' : 'red'
const source_bg = darkmode ? '#0dff0045' : 'green'
const image_bg = darkmode ? '#ffff00ac' : 'yellow'
const goback = darkmode ? '#0026ff58' : 'blue'
const federal = darkmode ? 'https://dummyimage.com/600x600/8B0000/ffffff.jpg&text=Federal' : 'https://dummyimage.com/600x600/ff0000/ffffff.jpg&text=Federal' 
const tech = darkmode ? 'https://dummyimage.com/600x600/C76E00/ffffff.jpg&text=Tech' : 'https://dummyimage.com/600x600/ff8c00/ffffff.jpg&text=Tech' 
const business = darkmode ? 'https://dummyimage.com/600x500/BA8E23/ffffff.jpg&text=Business' : 'https://dummyimage.com/600x500/f6bd00/ffffff.jpg&text=Business'
const crime = darkmode ? 'https://dummyimage.com/600x600/006400/ffffff.jpg&text=Crime' : 'https://dummyimage.com/600x600/00ff00/ffffff.jpg&text=Crime'
const sports = darkmode ? 'https://dummyimage.com/600x600/00008B/ffffff.jpg&text=Sports' : 'https://dummyimage.com/600x600/0000ff/ffffff.jpg&text=Sports'

  return (
    <SettingsContext.Provider value={{ darkmode, setDarkmode, name, setName, bgN, card, bgA, togglebordercolor, bgC, bgC2, headerC, text_color, federal, tech, business, crime, sports, nameboxcolor, description_bg, source_bg, goback, image_bg, header_bg }}>
      {children}
    </SettingsContext.Provider>
  );
}


export function useSettings() {
  return useContext(SettingsContext);
}