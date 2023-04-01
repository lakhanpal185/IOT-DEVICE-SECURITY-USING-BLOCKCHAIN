import { useState, useEffect } from "react";
import { View,Text,StyleSheet, SafeAreaView,FlatList } from "react-native";
import LightSensorData from "./mobileSensors/LightSensorData";
import SensorData from "./mobileSensors/SensorData";
import CustomCamera from "./src/components/CustomCamera";
import ShowData from "./src/components/ShowData";

export default function App() {

  return(
    <SafeAreaView style={styles.container}>
      <LightSensorData/>
    </SafeAreaView>
  );}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
  },
})