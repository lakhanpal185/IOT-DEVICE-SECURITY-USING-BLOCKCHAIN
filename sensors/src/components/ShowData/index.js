import { useState, useEffect } from "react";
import { View,Text,StyleSheet, SafeAreaView,FlatList } from "react-native";
import axios from "axios";

export default function ShowData() {
    const [hello, setHello] = useState("");
  
    axios.get('http://192.168.151.177:8000/sensorxyz')
    .then(response => {
      setHello(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  
    const renderItem = ( {item} ) => (
      <View style={{ padding: 10 }}>
        <Text>{item.sensor_name} - x:{item.x}, y:{item.y}, z:{item.z}</Text>
      </View>
    );
  
    return(
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, padding: 24 }}>
          <Text style={{ fontSize: 20 }}>Sensor Data</Text>
          <FlatList
            data={hello}
            renderItem={renderItem}
          />
       </View>
      </SafeAreaView>
    );}
  
   
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignContent:'center',
    },
  })