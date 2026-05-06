import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"

export default function AuthScreen({navigation}) {
  const[email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "", //Link

      {
        method: "POST",
        headers: {"Content-Type": "app;ication/json"},
        body: JSON.stringfy({email, password}),
      }
      ); // fetch closing tag
      const data = await response.json();

      if (response.ok) {
        await AsynStorage.setItem("token", data.token)
        navigation.replace("DRAWER");
      }
      else {
        Alert.alert(data.message || "Login Failed");
      }
    } // try block closing tag

    catch {
      Alert.alert("Server Error")
    } // catch block closing tag
  }; //handleLogin closing tag
} // MAIN AuthScreen funtion closing tag !!!