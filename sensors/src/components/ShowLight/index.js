import { useState, useEffect, useRef } from "react";
import { View,Text,StyleSheet, SafeAreaView,FlatList } from "react-native";

export default function ShowLight() {
    const [message, setMessage] = useState('');
    const socketRef = useRef(null);
   
    useEffect(() => {
        socketRef.current = new WebSocket('ws://192.168.42.177:8000/lightsensor/');
    
        socketRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data && data.sensor_name === 'lightsensor') {
            setMessage(`Illuminance: ${data.illuminance}`);
          }
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
  
    return(
        <View>
            <Text>{message || 'Waiting for data...'}</Text>
        </View> 
);}
   
  const styles = StyleSheet.create({
    
  });