import { useState, useEffect } from "react";
import { View,Text,StyleSheet, SafeAreaView } from "react-native";
import CustomCamera from "./src/components/CustomCamera";

export default function App() {
  const [hello, setHello] = useState("");

  fetch('http://192.168.58.177:8000/')
  .then(response => response.json())
  .then(data => {console.log(data)})
  .catch(error => console.error(error));

  return(
    <SafeAreaView style={styles.container}>
      <CustomCamera/>
    </SafeAreaView>
  );}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})