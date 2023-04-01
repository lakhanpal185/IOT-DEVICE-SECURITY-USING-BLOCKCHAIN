import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightSensor } from 'expo-sensors';
import axios from 'axios';

export default function LightSensorData() {
  const [lightData, setLightData] = useState(null);

  useEffect(() => {
    const lightSubscription = LightSensor.addListener(lightData => {
      setLightData(lightData);
      sendDataToServer('lightsensor', lightData); // Send the light data to the server
    });

    return () => {
      lightSubscription.remove();
    };
  }, []);

  const formattedLightData = lightData ? `Illuminance: ${lightData.illuminance}` : 'Light sensor not available';

  const sendDataToServer = (sensorType, data) => {
    const formattedData = {
      sensor_name: sensorType,
      illuminance: data.illuminance
    };
    
    axios.post('http://192.168.143.177:8000/lightsensor', formattedData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formattedLightData}</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
