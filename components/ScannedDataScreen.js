import { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Button, SafeAreaView } from 'react-native';

function ScannedDataScreen({ navigation, route }) {
    const { scannedData } = route.params;
    const { barcodeCheck } = route.params;
    const [productInfo, setProductInfo] = useState(null);
    
    if (!barcodeCheck) {
        useEffect(() => {
            const apiUrl = `https://mongodb-api-production-2b24.up.railway.app/product/${scannedData}`;
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setProductInfo(data);
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                });
        }, []); 
    } 

    if (barcodeCheck) {
        setProductInfo(route.params.productInfo);
    }
  
    return (
        <SafeAreaView>
            <View style={styles.scancontainer}>
            <Text style={styles.scanheader}>Product ID:</Text>
            <Text>{scannedData}</Text>
            {productInfo && (
                <View style={styles.scancontainer}>
                    <Text style={styles.scanheader}>Product Name:</Text>
                    <Text>{productInfo["name"]}</Text>
                    <Text style={styles.scanheader}>Product Description:</Text>
                    <Text>{productInfo["description"]}</Text>
                    <Text style={styles.scanheader}>Product Current Stage:</Text>
                    <Text>{productInfo["stage"]}</Text>
                    <Text style={styles.scanheader}>Raw Material Supplier:</Text>
                    <Text>{productInfo["RMSid"] === 0 ? "NA" : "Raw Material Supplied"}</Text>
                    <Text style={styles.scanheader}>Manufacturer:</Text>
                    <Text>{productInfo["MANid"] === 0 ? "NA" : "Product Manufactured"}</Text>
                    <Text style={styles.scanheader}>Distributor:</Text>
                    <Text>{productInfo["DISid"] === 0 ? "NA" : "Product DIstributed"}</Text>
                    <Text style={styles.scanheader}>Retailer:</Text>
                    <Text>{productInfo["RETid"] === 0 ? "NA" : "Prodcut Retailed"}</Text>
                    <Text style={styles.scanheader}>Product Hash:</Text>
                    <Text>{productInfo["_id"]}</Text>

                    { !barcodeCheck && (
                        <Button
                            title="Verify Product Hash"
                            onPress={() => navigation.navigate('BarcodeScreen', { productInfo })}
                            />
                        )
                    }

                    { barcodeCheck && (
                        <>
                            {productInfo["verified"] ? (
                                <>
                                    <Text style={styles.scanheader}>Product Verification Sucessful</Text>
                                    <Text>This is an authentic produict</Text>
                                </>         
                            ) : (
                                <>
                                    <Text style={styles.scanheader}>Product verification Unsuccessful</Text>
                                    <Text>This product could be counterfeit</Text>
                                </>   
                            )}
                        </>
                    )}
                    
                </View>
            )}
        </View>
        </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    scancontainer: {
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10
    },
    scanheader: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default ScannedDataScreen;