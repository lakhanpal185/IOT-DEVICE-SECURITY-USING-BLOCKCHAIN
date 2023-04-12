import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Brightness from 'expo-brightness';
import Slider from "@react-native-community/slider";

const DataDesboard = () => {
  const [brightness, setBrightness] = useState(0.5); // default brightness value
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestPermissionAsync = async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
        Brightness.setBrightnessAsync(brightness);
      } else {
        console.log('Brightness permission not granted');
      }
    };
    requestPermissionAsync();
  }, []);

  const handleBrightnessChange = async (value) => {
    setBrightness(value);
    await Brightness.setBrightnessAsync(value);
  };

  if (!permissionGranted) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Requesting permission to adjust brightness...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Brightness</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        value={brightness}
        onValueChange={handleBrightnessChange}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#aaa"
        thumbTintColor="#fff"
      />
      <Text style={styles.value}>{(brightness * 100).toFixed(0)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slider: {
    height: 40,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default DataDesboard;
