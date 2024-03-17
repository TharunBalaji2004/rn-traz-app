import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

function BarcodeScreen({ navigation }) {
    const { productInfo } = route.params;
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    
    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted');
        })()
    };

    useEffect(() => {
        askForCameraPermission();
    }, []);

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting For Camera Permission</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 15 }}>No Access To Camera !</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(`BARCODE Scanner: ${data}`);

        if (productInfo["_id"] === data) {
            productInfo["verified"] = true;
        } else {
            productInfo["verified"] = false;
        }

        navigation.goBack({ productInfo, barcodeCheck: true });
    };

    return (
        <>
            <View style={styles.container}>
                <Image source={require("../assets/traz_logo.png")} style={{ width: 250, height: 80, marginBottom: 15 }} />
                <View style={styles.barcodebox}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{ height: 400, width: 400 }}
                    />
                </View>
                <Text style={{ fontSize: 22, margin: 25, textAlign: 'center' }}>Scan the Barcode on Product to verify hash</Text>
            </View>
        </>
    )
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


export default BarcodeScreen;