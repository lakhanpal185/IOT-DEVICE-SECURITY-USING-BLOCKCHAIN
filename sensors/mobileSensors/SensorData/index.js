import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
import axios from 'axios';



const SensorData = ({ip}) =>{
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const socketRef = useRef();


  useEffect(() => {
    socketRef.current = new WebSocket(`ws://${ip}:8000/sensorxyz/`);
  
    socketRef.current.onopen = () => {
      console.warn('connected 😂');
    };

    socketRef.current.onclose = (event) => {
      console.error('WebSocket closed', event);
    };
    socketRef.current.onerror = (error) => {
      console.error(error);
    };

    const accelerometerSubscription = Accelerometer.addListener(accelerometerData => {
      setAccelerometerData(accelerometerData);
      sendDataToServer('accelerometer', accelerometerData); // Send the accelerometer data to the server
    });
    
    const gyroscopeSubscription = Gyroscope.addListener(gyroscopeData => {
      setGyroscopeData(gyroscopeData);
      sendDataToServer('gyroscope', gyroscopeData); // Send the gyroscope data to the server
    });

    const magnetometerSubscription = Magnetometer.addListener(magnetometerData =>{
      setMagnetometerData(magnetometerData);
      sendDataToServer("magnetometer",magnetometerData)
    });
       
    
    const sendDataToServer = (sensorType, data) => {
      const formattedData = {
        sensor_name:sensorType,
        x: data.x,
        y: data.y,
        z: data.z
      };

      try{
        socketRef.current.send(JSON.stringify(formattedData));
        socketRef.current.onmessage = (event) =>{
          const data = JSON.parse(event.data);
          console.log(event.data);
        } 
      }
      catch (error){
          console.error("Error sending data:",error);
      }

    //   // axios.post(url, formattedData)
    //   //   .then(response => {
    //   //     console.log(response.data);
    //   //   })
    //   //   .catch(error => {
    //   //     console.log(error);
    //   //   });
    };
      
    return () => {
      accelerometerSubscription.remove(); // Remove the accelerometer listener when the component is unmounted
      gyroscopeSubscription.remove(); // Remove the gyroscope listener when the component is unmounted
      magnetometerSubscription.remove();
    };

  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer Data:</Text>
      <Text style={styles.text}>X: {accelerometerData.x}</Text>
      <Text style={styles.text}>Y: {accelerometerData.y}</Text>
      <Text style={styles.text}>Z: {accelerometerData.z}</Text>
      
      <Text style={styles.text}>{'\n\n'}Gyroscope Data:</Text>
      <Text style={styles.text}>X: {gyroscopeData.x}</Text>
      <Text style={styles.text}>Y: {gyroscopeData.y}</Text>
      <Text style={styles.text}>Z: {gyroscopeData.z}</Text>

      
      <Text style={styles.text}>{'\n\n'}Magnetometer Data:</Text>
      <Text style={styles.text}>X: {magnetometerData.x}</Text>
      <Text style={styles.text}>Y: {magnetometerData.y}</Text>
      <Text style={styles.text}>Z: {magnetometerData.z}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});


export default SensorData;