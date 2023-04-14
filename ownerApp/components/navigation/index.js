import React from "react";
import { Text,View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Desboard from "../Desboard";
import ControllerScreen from "../ControllerScreen";
import DisplayScreen from "../DisplayScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
   return(
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Desboard" component={Desboard}/>
            <Stack.Screen name="Display" component={DisplayScreen}/>
            <Stack.Screen name="Controller" component={ControllerScreen}/> 
        </Stack.Navigator>
       
    </NavigationContainer>
   )
}


export default Navigation;