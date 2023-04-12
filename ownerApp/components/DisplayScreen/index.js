import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const DataDesboard = ({ ip }) => {
  const [illuminance, setIlluminance] = useState(0);
  const [timestamp, setTimeStamp] = useState('');
  const socketRef = useRef(null);

  
  const [accx, setAccx] = useState(0);
  const [accy, setAccy] = useState(0);
  const [accz, setAccz] = useState(0);
  
  const [gyrx, setGyrx] = useState(0);
  const [gyry, setGyry] = useState(0);
  const [gyrz, setGyrz] = useState(0);
  
  const [magx, setMagx] = useState(0);
  const [magy, setMagy] = useState(0);
  const [magz, setMagz] = useState(0);
  const senxyz = useRef(null);

  useEffect(() => {
    senxyz.current = new WebSocket(`ws://${ip}:8000/sensorxyz/`);
    socketRef.current = new WebSocket(`ws://${ip}:8000/lightsensor/`);    
    
    senxyz.current.onmessage = (event) => {
      try{
        const data = JSON.parse(event.data);
         console.log(data.sensor_name);
        if (data && data.sensor_name === 'accelerometer') {  
          setAccx(data.x);
          setAccy(data.y);
          setAccz(data.z);
        }else if (data && data.sensor_name === 'magnetometer') {  
          setMagx(data.x);
          setMagy(data.y);
          setMagz(data.z);
        }else if (data && data.sensor_name === 'gyroscope') {  
          setGyrx(data.x);
          setGyry(data.y);
          setGyrz(data.z);
        }
      }catch (error){
        console.log("margya ");
      }
    };
    senxyz.current.onopen = () => {
      console.warn(' sensor xyz connected 😂');
    };
    senxyz.current.onclose = (event) => {
      console.error('WebSocket closed', event);
    };
    senxyz.current.onerror = (error) => {
        console.error(error);
    };
    
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data) {
        console.warn(data);
        setIlluminance(data.illuminance);
        setTimeStamp(`${new Date()}`);
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
        senxyz.current.close(); 
    };
  }, []);

  return (
     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Image source={require('../../assets/light.png')} style={styles.image}/>
        <Text style={styles.title}>Light Sensor Data</Text>
        <Text style={styles.description}>A light sensor is a type of sensor that is used to detect and measure the intensity of light in an environment. It works by converting the light energy into an electrical signal.</Text>
    
        {illuminance ? (
          <View>
            <Text style={styles.data}>{illuminance} lux</Text>
            <Text style={styles.data}>Timestamp: {timestamp}</Text>
          </View>
        ) : (
          <Text style={styles.data}>Loading...</Text>
        )}
      </View>


      <View style={styles.card}>
        <Image source={require('../../assets/accelerometer.png')} style={styles.image}/>
        <Text style={styles.title}>Accelerometer</Text>
        <Text style={styles.description}>The accelerometer measures the acceleration forces in three axes: X, Y, and Z. The X-axis measures the acceleration forces in the horizontal direction, the Y-axis measures the acceleration forces in the vertical direction, and the Z-axis measures the acceleration forces in the depth direction. </Text>
        {accx ? (
          <View>
            <Text style={styles.data}>x:    {accx} m/s^2</Text>
            <Text style={styles.data}>y:    {accy} m/s^2</Text>
            <Text style={styles.data}>z:    {accz} m/s^2</Text>
            <Text style={styles.data}>Timestamp: {timestamp}</Text>
          </View>
        ) : (
          <Text style={styles.data}>Loading...</Text>
        )}  
      </View>
      
      <View style={styles.card}>
        <Image source={require('../../assets/gyroscope.png')} style={styles.image}/>
        <Text style={styles.title}>Gyroscope</Text>
        <Text style={styles.description}>A gyroscope is a sensor that measures the rate of rotation around a particular axis. It is commonly used in navigation systems, such as in airplanes, spacecraft, and smartphones, to detect orientation and angular velocity</Text>
        {gyrx ? (
          <View>
            <Text style={styles.data}>x:    {gyrx} dps</Text>
            <Text style={styles.data}>y:    {gyry} dps</Text>
            <Text style={styles.data}>z:    {gyrz} dps</Text>
            <Text style={styles.data}>Timestamp: {timestamp}</Text>
          </View>
        ) : (
          <Text style={styles.data}>Loading...</Text>
        )}  
      </View>

      <View style={styles.card}>
        <Image source={require('../../assets/magnetometer.png')} style={styles.image}/>
        <Text style={styles.title}>Magnetometer</Text>
        <Text style={styles.description}>Margnetometer, a device can determine its position relative to the Earth's magnetic field, which allows for the creation of compasses and other location-based applications.</Text>
        {magx ? (
          <View>
            <Text style={styles.data}>x:    {magx} µT</Text>
            <Text style={styles.data}>y:    {magy} µT</Text>
            <Text style={styles.data}>z:    {magz} µT</Text>
            <Text style={styles.data}>Timestamp: {timestamp}</Text>
          </View>
        ) : (
          <Text style={styles.data}>Loading...</Text>
        )}  
      </View>
      
    </ScrollView>

    
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    marginTop:34,
    backgroundColor:'#fff'
  },
  card: {
    margin:10,
    borderRadius: 10,
    backgroundColor:'#ffe6cc',
    padding: 16,
    marginVertical: 10,
    elevation: 5,
  },
  image:{
      height:50,
      width:50,
      marginBottom:16,
  },
  title: {
    color:'#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  description:{
    fontSize:10,
    color:'gray', 
    marginBottom: 5,
  },
  data: {
    color:"#1F1F1F",
    fontSize: 12,
    fontWeight:'500',
    fontFamily: 'System',
    marginBottom: 2,
  },
});

export default DataDesboard;
