import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import * as Brightness from 'expo-brightness';
import Slider from "@react-native-community/slider";
import { SafeAreaView } from 'react-native-safe-area-context';

const DataDesboard = ({ip}) => {
    const [brightness, setBrightness] = useState(0.5); // default brightness value
    const socketRef = useRef();

    const [isEnabled, setIsEnabled] = useState(false);
   
    useEffect(()=>{
        socketRef.current = new WebSocket(`ws://${ip}:8000/actuators/`);
        socketRef.current.onopen = () => {
            console.warn('connected 😂');
        };
        socketRef.current.onclose = (event) => {
            console.error('WebSocket closed', event);
        };
        socketRef.current.onerror = (error) => {
            console.error(error);
        };

        return()=>{
            socketRef.current.close()
        };
    },[])
    

    const sendDataToServer = (actuatorType, data) => {
        const formattedData = {
            actuator_name:actuatorType,
            value:data,
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
    }

    const handleBrightnessChange = async (value) => {
        setBrightness(value);
        console.warn(value);
        sendDataToServer('brigthness',value);
    };
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        console.log(!isEnabled);
        sendDataToServer('torch',isEnabled)
    };

  return (
    <SafeAreaView >
      <Text style={styles.headertext}>Controllers</Text>  
      <View style={styles.container}>
        <Text style={styles.label}>Brightness</Text>
        <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={brightness}
            onValueChange={handleBrightnessChange}
            minimumTrackTintColor="#12ff"
            maximumTrackTintColor="#000"
            thumbTintColor="#000"
        />
        <Text style={styles.value}>{(brightness * 100).toFixed(0)}%</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Torch</Text>
        <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
        />
        <Text style={styles.value}>The current status {isEnabled ? ('ON'):("OFF")}</Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    margin:10,
    borderWidth:1,
    borderRadius:12,
    backgroundColor:'#fff',
    borderColor:'gray',
    padding:10,
  },
  headertext: {
    fontSize:24,
    fontWeight:'600',
    textAlign:'center',
    padding:10,
  },
  label: {
    paddingLeft:10,
    color: '#505151',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slider: {
    height: 20,
  },
  value: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DataDesboard;
