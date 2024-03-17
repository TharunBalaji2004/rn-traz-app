import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

function QRCodeScreen({ navigation }) {
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(`Type: ${type}, Data: ${data}`);

        navigation.navigate('ScannedDataScreen', { scannedData: data, barcodeCheck: false });
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/traz_logo.png")} style={{ width: 250, height: 80, marginBottom: 15 }} />
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }}
                />
            </View>
            <Text style={{ fontSize: 22, margin: 25, textAlign: 'center' }}>Scan the QR on Product</Text>

            {scanned && <Button title={'Scan Again ?'} onPress={() => setScanned(false)} color='tomato' />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodebox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 340,
        width: 340,
        overflow: 'hidden'
    }
});

export default QRCodeScreen;