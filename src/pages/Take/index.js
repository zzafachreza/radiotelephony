import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ActivityIndicator,
    PermissionsAndroid,
    ScrollView,
} from 'react-native';
import WebView from 'react-native-webview';
import { colors } from '../../utils/colors';
import { getData, urlWeb } from '../../utils/localStorage';
import { MyHeader } from '../../components';
import { fonts } from '../../utils';

export default function Take({ route }) {

    const item = route.params;
    const [user, setUser] = useState({});
    const [visible, setVisible] = useState(true);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        requestCameraPermission();
    }, [])


    const hideSpinner = () => {
        setVisible(false);
    };

    const myUrl = 'https://skinnoia.okeadmin.com/tensor';
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.white,
                // padding: 10,
            }}>
            <MyHeader title="Deteksi Kondisi Kulit" />
            <View style={{
                flex: 1,
                padding: 16
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    textAlign: 'center',
                    fontSize: 20,
                }}>{route.params.name}</Text>

                <WebView

                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    onLoad={hideSpinner}
                    injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); `}
                    scalesPageToFit={false}
                    source={{
                        uri: myUrl,
                    }}
                />

            </View>
            {/* {visible && (
                <View
                    style={{
                        flex: 1,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFF',
                        width: '100%',
                        tåop: 0,
                        opacity: 0.7,
                        height: '100%',
                    }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            )} */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
