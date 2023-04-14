import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataDesboard = ({ url }) => {
  const [illuminance, setIlluminance] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://192.168.42.177:8000/lightsensor/');
    
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data) {
        setIlluminance(`Illuminance: ${data.illuminance}`);
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

    return () => {
        socketRef.current.close(); 
    };
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Light Sensor Data</Text>
      {illuminance ? (
        <Text style={styles.data}>{illuminance} lux</Text>
      ) : (
        <Text style={styles.data}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  data: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DataDesboard;
