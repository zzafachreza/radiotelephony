import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { MyButton, MyGap, MyHeader } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

export default function Cek({ navigation }) {

    const img = new Animated.Value(0.5);
    const text = new Animated.Value(50);
    Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
    }).start();

    Animated.timing(text, {
        toValue: 0,
        duration: 750,
        useNativeDriver: true,
    }).start();

    const DATA = [

        {
            name: 'Kulit Fair (Cerah)',
            image: '',
        },
        {
            name: 'Kulit Neutral',
            image: '',
        },
        {
            name: 'Kulit Tan (Sawo Matang)',
            image: '',
        },
        {
            name: 'Kulit Olive (Coklat)',
            image: '',
        },
        {
            name: 'Kulit Afro (Gelap)',
            image: '',
        },
    ]



    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 0,
            backgroundColor: colors.white,
            justifyContent: 'center',
            position: 'relative'

        }}>

            <LinearGradient style={{
                flex: 1,
            }} start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0, 0.5, 0.6]}
                colors={[colors.primary, colors.secondary]}>
                <MyHeader title="Pilihan Warna Kulit" />
                <FlatList data={DATA} renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Take', {
                            name: item.name
                        })} style={{
                            padding: 12,
                            marginHorizontal: 16,
                            borderWidth: 1,
                            borderRadius: 10,
                            marginVertical: 10,
                            borderColor: colors.white,
                            backgroundColor: colors.white,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[800],
                                fontSize: 20,
                                color: colors.black
                            }}>{item.name}</Text>

                            <Icon type='ionicon' name='camera-outline' />
                        </TouchableOpacity>
                    )
                }} />
            </LinearGradient>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
