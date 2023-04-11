import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightSensor } from 'expo-sensors';


export default function LightSensorData({ip}) {
  const [connected, setConnected] = useState(false);
  const [lightData, setLightData] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    
    socketRef.current = new WebSocket(`ws://${ip}:8000/lightsensor/`);

    socketRef.current.onopen = () => {
      console.warn('connected 😂');
      setConnected(true);
    };
    socketRef.current.onclose = (event) => {
      console.error('WebSocket closed', event);
    };
    socketRef.current.onerror = (error) => {
      console.error(error);
    };


    const lightSubscription = LightSensor.addListener(lightData => {
      setLightData(lightData);
      if (socketRef.current.readyState === WebSocket.OPEN) {
        sendDataToServer('lightsensor', lightData); // Send the light data to the server 
      }
      
    });

    return () => {
      lightSubscription.remove();
      socketRef.current.close(); 
    };
  }, []);

  const formattedLightData = lightData ? `Illuminance: ${lightData.illuminance}` : 'Light sensor not available';


  const sendDataToServer = (sensorType, data) => {
    const formattedData = {
      sensor_name: sensorType,
      illuminance: data.illuminance,
    };
  
    try {
      console.warn(formattedData);
      socketRef.current.send(JSON.stringify(formattedData));
    } catch (error) {
      console.error('Error sending data:', error);
    }
    
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>illuminance : </Text>
      <Text style={styles.text}>{lightData ? lightData.illuminance:"error data not persent" }</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
