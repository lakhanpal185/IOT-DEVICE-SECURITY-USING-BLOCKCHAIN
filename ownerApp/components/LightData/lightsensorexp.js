import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const DataDashboard = ({ url }) => {
  const [illuminanceData, setIlluminanceData] = useState();
  const socketRef = useRef(null);
  
  const datasets = [];
  const timestamp = [];
  const ilData = [];

  useEffect(() => {    
    socketRef.current = new WebSocket(url);

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
     
      if (data && data.illuminance !== undefined){ 
        const illuminance = Number(data.illuminance);
        if (!isNaN(illuminance)) {
          ilData.push(illuminance);
          let pretime = new Date().getMonth();
          let cur = new Date().toJSON().slice(14,16);
          console.log(pretime);
          console.log(cur);
          if(pretime !== cur){
            pretime = cur;
            const tim = new Date().toJSON().slice(0,16);
            timestamp.push(tim);
            console.log(tim);
          }
          if(ilData.length === 100){
            datasets.push({
              ilData,
              color:(opacity = 1) => '#f77f00',
              strokeWidth:2,
            });
            setIlluminanceData({
              timestamp,
              datasets
            });
            console.log("stop");
          }
        }
      }
      
    };
    socketRef.current.onopen = () => {
      console.log('connected');
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
    <View style={styles.container}>
    {illuminanceData ? ( <LineChart
        data={illuminanceData}
        width={300}
        height={200}
        yAxisSuffix="lux"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />) : (<Text> loading...</Text>) }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default DataDashboard;
