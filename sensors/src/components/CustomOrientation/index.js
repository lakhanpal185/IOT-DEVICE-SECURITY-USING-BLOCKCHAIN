import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function CustomOrientation() {
  const [ data, setData] = useState("");

    useEffect(()=>{
       var orientation = ScreenOrientation.getOrientationAsync();
       setData(orientation);
    },[]);

  return(
    <View style={styles.container}>
        <Text> {data} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});