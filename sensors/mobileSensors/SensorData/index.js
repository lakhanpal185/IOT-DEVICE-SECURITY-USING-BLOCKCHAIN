import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
import axios from 'axios';

const SensorData = () =>{
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  
  useEffect(() => {
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
    
    return () => {
      accelerometerSubscription.remove(); // Remove the accelerometer listener when the component is unmounted
      gyroscopeSubscription.remove(); // Remove the gyroscope listener when the component is unmounted
      magnetometerSubscription.remove();
    };
  }, []);
  
  const sendDataToServer = (sensorType, data) => {
    const formattedData = {
      sensor_name:sensorType,
      x: data.x,
      y: data.y,
      z: data.z
    };
    
    axios.post('http://192.168.151.177:8000/sensorxyz', formattedData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});


export default SensorData;