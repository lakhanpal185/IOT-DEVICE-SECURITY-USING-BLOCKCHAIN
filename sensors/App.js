import { useState, useEffect, useRef } from "react";
import { View,Text,StyleSheet, SafeAreaView,Image } from "react-native";
import LightSensorData from "./mobileSensors/LightSensorData";
import SensorData from "./mobileSensors/SensorData";
import CustomCamera from "./src/components/CustomCamera";
import ShowData from "./src/components/ShowData";
import ShowLight from "./src/components/ShowLight";
import { ScrollView } from "react-native";
import * as Brightness from 'expo-brightness'


export default function App() {
  const [brightness, setBrightness] = useState(0.0); // default brightness value
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const socketRef = useRef();
  const ip = '192.168.45.177';
  
  useEffect(() => {
    socketRef.current = new WebSocket(`ws://${ip}:8000/actuators/`);

    const requestPermissionAsync = async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
        Brightness.setBrightnessAsync(brightness);
      } else {
        console.log('Brightness permission not granted');
      }
    };
    requestPermissionAsync();
   
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data && data.actuator_name === 'torch') {
        setIsTorchOn(data.value);
        console.warn(isTorchOn);

      }
      else if (data && data.actuator_name === 'brightness') {
        setBrightness(()=>data.value);
        Brightness.setBrightnessAsync(data.value);
        console.warn(brightness);
       }
    };
    socketRef.current.onopen = () => {
      console.warn('connected 😂');
    };
    socketRef.current.onclose = (event) => {
      console.error('WebSocket closed', event);
    };
    socketRef.current.onerror = (error) => {
        console.error(error);
    };

  }, []);

  return(
    <SafeAreaView style={styles.container}>
        <SensorData />
        <LightSensorData />
        {isTorchOn === true ?
        (<Image source={require("./assets/torchon.png")} style={styles.image}/>):(<Image source={require("./assets/torchoff.png")}style={styles.image}/>)}      
       
    </SafeAreaView>
  );}


const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
  },
  image:{
      alignSelf:'center',
      height:50,
      width:50,
  
  },
})