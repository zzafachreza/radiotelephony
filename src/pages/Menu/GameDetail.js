import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { colors, fonts, windowWidth } from '../../utils';
import { MyButton, MyHeader } from '../../components';
import Tts from 'react-native-tts';
import SoundPlayer from 'react-native-sound-player'
import { initializeTtsListeners, playTTS } from '../../utils/ttslisteners';
export default function GameDetail({ navigation, route }) {
    const TIPE = route.params.tipe;

    const InitialTTS = async () => {
        Tts.voices().then(voices => {
            let tmpArr = [];
            let nomor = 3;
            voices.map((i, index) => {
                tmpArr.push(i);
                console.log(index + '-' + i.language)
            });

            console.log(tmpArr[nomor])
            Tts.setDefaultLanguage(tmpArr[nomor].language);
            Tts.setDefaultVoice(tmpArr[nomor].id);
        });




        // Tts.addEventListener('tts-start', (event) => console.log("start", event));
        // Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
        // Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
        // Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));

    }

    useEffect(() => {

        InitialTTS()

        // return () => {
        //     InitialTTS();
        // }

    }, []);






    const readText = async (text, tipe) => {

        Tts.setDefaultRate(0.5);
        Tts.setDefaultPitch(tipe == 'PILOT' ? 1 : 2);
        Tts.speak(text, {
            androidParams: {
                KEY_PARAM_PAN: +1,
                KEY_PARAM_VOLUME: 1,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
        });
    };


    return (
        <ImageBackground source={require('../../assets/bggame1.png')} style={{
            flex: 1,
        }}>
            <View style={{
                padding: 10,
                alignItems: 'center',
                backgroundColor: colors.primary,
                opacity: 0.8
            }}>
                <Image source={TIPE == 'PILOT' ? require('../../assets/pilot.png') : require('../../assets/atc.png')} style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'contain'
                }} />
            </View>

            <MyButton title="CEK SOUND" onPress={() => readText('Citilink QG Nine Seven Seven', 'ATC')} />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})