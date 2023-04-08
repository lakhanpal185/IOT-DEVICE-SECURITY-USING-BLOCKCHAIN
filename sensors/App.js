import { useState, useEffect } from "react";
import { View,Text,StyleSheet, SafeAreaView,FlatList } from "react-native";
import LightSensorData from "./mobileSensors/LightSensorData";
import SensorData from "./mobileSensors/SensorData";
import CustomCamera from "./src/components/CustomCamera";
import ShowData from "./src/components/ShowData";
import ShowLight from "./src/components/ShowLight";
import { ScrollView } from "react-native";

export default function App() {

  return(
    <SafeAreaView style={styles.container}>
        <CustomCamera/>
        <SensorData/>
        <LightSensorData/>
       
    </SafeAreaView>
  );}


const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
  },
})