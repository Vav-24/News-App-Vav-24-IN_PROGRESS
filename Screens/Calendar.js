import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {useSettings} from '../settingcontext'

const importantDays = {
  //Style of flatlist:
     // 'YEAR-MONTH-DATE': {
          // marked: (Ture or False), Eg. Dot
          // dotColor: 'color',  (color of dot)
          // label: 'Title'
  //},

  // --- Original Dates ---
  '2026-02-16': {
    marked: true,
    dotColor: '#FFD700', // Gold
    label: 'Vivaans B-Day!!!'
  },

  // --- Global & News Events 2026 ---
  '2026-01-01': {
    marked: true,
    dotColor: '#FF5733', // Persimmon
    label: 'New Years Day - Global Celebrations'
  },
  '2026-01-20': {
    marked: true,
    dotColor: '#C70039', // Crimson
    label: 'Inauguration Day / Political Briefing'
  },
  '2026-02-06': {
    marked: true,
    dotColor: '#33FFBD', // Aquamarine
    label: 'Winter Olympics Opening Ceremony'
  },
  '2026-02-14': {
    marked: true,
    dotColor: '#FF33F6', // Hot Pink
    label: 'Valentines Day'
  },
  '2026-03-08': {
    marked: true,
    dotColor: '#8E44AD', // Deep Purple
    label: 'International Womens Day'
  },
  '2026-03-22': {
    marked: true,
    dotColor: '#3498DB', // Sky Blue
    label: 'World Water Day - Climate Report'
  },
  '2026-04-22': {
    marked: true,
    dotColor: '#27AE60', // Jungle Green
    label: 'Earth Day - Environmental Summit'
  },
  '2026-05-01': {
    marked: true,
    dotColor: '#E67E22', // Carrot Orange
    label: 'International Workers Day'
  },
  '2026-06-05': {
    marked: true,
    dotColor: '#16A085', // Sea Green
    label: 'World Environment Day'
  },
  '2026-06-08': {
    marked: true,
    dotColor: '#2C3E50', // Midnight Blue
    label: 'FIFA World Cup 2026 Starts'
  },
  '2026-07-04': {
    marked: true,
    dotColor: '#B03A2E', // Brick Red
    label: 'US Independence Day'
  },
  '2026-07-19': {
    marked: true,
    dotColor: '#5D6D7E', // Steel Grey
    label: 'FIFA World Cup Final'
  },
  '2026-09-21': {
    marked: true,
    dotColor: '#F39C12', // Orange Peel
    label: 'UN General Assembly Meeting'
  },
  '2026-10-24': {
    marked: true,
    dotColor: '#2980B9', // Belize Blue
    label: 'United Nations Day'
  },
  '2026-11-03': {
    marked: true,
    dotColor: '#D35400', // Pumpkin
    label: 'Election Day (US Midterms)'
  },
  '2026-12-10': {
    marked: true,
    dotColor: '#7D3C98', // Royal Purple
    label: 'Human Rights Day'
  },
  '2026-12-25': {
    marked: true,
    dotColor: '#229954', // Emerald
    label: 'Christmas Day'
  },
  '2026-12-31': {
    marked: true,
    dotColor: '#A04000', // Coffee
    label: 'New Years Eve'
  }
};

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  //Stylings Import
  const {darkmode, setDarkmode, name, setName, bgN, card, bgA, togglebordercolor, bgC, bgC2, text_color} = useSettings();

  const interactiveMarkedDates = Object.keys(importantDays).reduce((acc, date) => {
    acc[date] = {
      marked: importantDays[date].marked,
      dotColor: importantDays[date].dotColor,
      selected: date === selectedDate,
      selectedColor: '#3498db',
    };
    return acc;
  }, {});

  if (selectedDate && !interactiveMarkedDates[selectedDate]) {
    interactiveMarkedDates[selectedDate] = { selected: true, selectedColor: '#f0f0f0' };
  }

  return(
    <View style={[styles.container, { backgroundColor: bgC }]}>
    <Calendar
    style={{backgroundColor:bgC2}}
    markedDates = {interactiveMarkedDates}
    onDayPress={(day) => setSelectedDate(day.dateString)}
    theme = {{
      todayTextColor:'#e67e22', 
      arrowColor: '#3498db', 
      monthTextColor: 'white',
    }} />

    <Text style={styles.title}>Important Days</Text>

    <FlatList
    data = {Object.entries(importantDays)}
    keyExtractor = {(item) => item[0]}
    renderItem = {({item}) => (
      <TouchableOpacity 
        onPress={() => setSelectedDate(item[0])}
        style={[
          styles.eventItem,
          item[0] === selectedDate && styles.selectedEventItem
        ]}
      >
        <View>
          <Text style={styles.date}>{item[0]}</Text>
          <Text style={styles.label}>{item[1].label}</Text>
        </View>
      </TouchableOpacity>
    )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2CD60', 
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 12,
    color: '#2c3e50', 
  },

  eventItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#dcdde1' 
  },

  selectedEventItem: {
    backgroundColor: '#dff9fb', 
    borderRadius: 8,
    borderColor: '#3498db',
    borderBottomWidth: 1,
  },

  date: {
    fontWeight: 'bold',
    color: '#4DD7DC',
  },

  label: {
    color: '#E55812' 
  },
});