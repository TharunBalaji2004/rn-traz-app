import { StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QRCodeScreen from './components/QRCodeScreen';
import ScannedDataScreen from './components/ScannedDataScreen';
import BarcodeScreen from './components/BarcodeScreen';
import HomeScreen from './components/Home';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Asyncstorage: ...']); 
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function Scanner() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={HomeScreen} options={{
                    headerShown:false
                }} />
                <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} options={{
                    title: "QR Code Scanner",
                    headerStyle: {
                        backgroundColor: "#3474fb",
                    },
                    headerTintColor: "white"
                }} />
                <Stack.Screen name="ScannedDataScreen" component={ScannedDataScreen} options={{
                    title: "Product Details",
                    headerStyle: {
                        backgroundColor: "#3474fb",
                    },
                    headerTintColor: "white"
                }} />
                <Stack.Screen name="BarcodeScreen" component={BarcodeScreen} options={{
                    title: "Barcode Scanner",
                    headerStyle: {
                        backgroundColor: "#3474fb",
                    },
                    headerTintColor: "white"
                }} />
            </Stack.Navigator>
            <StatusBar style="light" backgroundColor={"#3474fb"} />
        </NavigationContainer>
    );
}

