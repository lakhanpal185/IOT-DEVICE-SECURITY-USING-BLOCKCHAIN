import React from "react";
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Desboard = () => {
    const navigation = useNavigation();

    const handleController= ()=>{
    console.warn("hll");
    navigation.navigate('Controller');
   }
   
   const handleDisplay= ()=>{
    console.warn("hll");
    navigation.navigate('Display');
   }

   
   const handlecharts= ()=>{
    console.warn("hll");
    navigation.navigate('Display');
   }
   return(
    <View style={styles.container}>
        <Text style={styles.head}>Desboard</Text>
        <View style={styles.buttonbox}>
            <TouchableOpacity style={styles.button} onPress={handleDisplay}><Text>Display</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleController}><Text>Controllers</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDisplay}><Text>charts</Text></TouchableOpacity> 
        </View>
    </View>
   )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent:'center',
        justifyContent: 'center',
    },
    head:{
        fontSize:18,
        alignSelf:'center',
        fontWeight:'700',
    },
    buttonbox:{
        flexDirection:'row',
        alignSelf:'center',
        borderWidth:2,
        borderRadius:20,
        padding:5,
        backgroundColor: '#DDDDDD',
    },
    button:{
        marginHorizontal:10,
        alignItems: 'center',
    }
});

export default Desboard;