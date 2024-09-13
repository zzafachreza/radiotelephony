import { Alert, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import axios from 'axios';
import { apiURL, MYAPP } from '../../utils/localStorage';
import { colors, fonts, windowWidth } from '../../utils';
import { MyButton, MyHeader, MyInput, MyPicker } from '../../components';
import Tts from 'react-native-tts';
import SoundPlayer from 'react-native-sound-player'
import { initializeTtsListeners, playTTS } from '../../utils/ttslisteners';
import { Icon } from 'react-native-elements';
export default function Game({ navigation, route }) {


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


    const [data, setData] = useState([])
    const _getPosisi = () => {
        axios.post(apiURL + 'posisi').then(res => {
            console.log(res.data);
            let tmp = [{
                label: 'Start',
                value: '',
            }];
            res.data.map(i => {
                tmp.push({ label: i.label, value: i.value })
            })
            setData(tmp);
            // setData(res.data);
        })
    }

    useEffect(() => {
        _getPosisi();
        InitialTTS()

        // return () => {
        //     InitialTTS();
        // }

    }, []);


    // 'Good Morning Citilink QG Nine Seven Seven'
    // 'Citilink QG Nine Seven Seven, Go Ahead'
    const [pilot, setPilot] = useState('');
    const [atc, setAtc] = useState('');
    const [posisi, setPosisi] = useState('');
    const [pesan, setPesan] = useState({
        posisi: '',
        pilot: pilot,
        atc: atc,
    });

    const [kirim, setKirim] = useState({
        tipe: '',
        pesan: '',
    })


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
        Tts.addEventListener('tts-finish', (event) => {
            SoundPlayer.stop();
        });
    };

    const sendData = () => {
        if (kirim.tipe.length == 0) {
            Alert.alert(MYAPP, 'Silahkan pilih PILOT atau ATC')
        } else if (kirim.pesan.length == 0) {
            Alert.alert(MYAPP, 'Pesan tidak boleh kosong')
        } else {




            if (kirim.tipe == 'PILOT') {
                SoundPlayer.playSoundFile('tung', 'mp3')
                setTimeout(() => {
                    SoundPlayer.playSoundFile('noise', 'mp3')
                    SoundPlayer.setVolume(0.5);
                    setPilot(kirim.pesan);
                    readText(kirim.pesan, 'PILOT');

                }, 1000)

                setTimeout(() => {
                    axios.post(apiURL + 'pesan', kirim).then(res => {
                        console.log(res.data);
                        SoundPlayer.playSoundFile('tung', 'mp3')
                        setTimeout(() => {
                            SoundPlayer.playSoundFile('noise', 'mp3')
                            SoundPlayer.setVolume(0.5);
                            setAtc(res.data.message);
                            setPosisi(res.data.posisi);
                            readText(res.data.message, 'ATC')
                        }, 1000)

                    })
                }, 2000)

            } else {
                SoundPlayer.playSoundFile('tung', 'mp3')
                setTimeout(() => {
                    SoundPlayer.playSoundFile('noise', 'mp3')
                    SoundPlayer.setVolume(0.5);
                    setAtc(kirim.pesan)
                    readText(kirim.pesan, 'ATC')
                }, 1000)

                setTimeout(() => {
                    axios.post(apiURL + 'pesan', kirim).then(res => {
                        console.log(res.data);
                        SoundPlayer.playSoundFile('tung', 'mp3')
                        setTimeout(() => {
                            SoundPlayer.playSoundFile('noise', 'mp3')
                            SoundPlayer.setVolume(0.5);
                            setPilot(res.data.message);
                            setPosisi(res.data.posisi);
                            readText(res.data.message, 'PILOT')
                        }, 1000)

                    })
                }, 2000)
            }



        }
    }


    return (
        <ImageBackground source={require('../../assets/bggame1.png')} style={{
            flex: 1,
        }}>

            {/* PILOT */}

            <View style={{
                flex: 1,
                padding: 16,
            }}>

                {pilot.length > 0 &&
                    <View style={{
                        width: '80%',
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: colors.primary,
                    }}>
                        <Text style={{
                            color: colors.white,
                            ...fonts.headline2
                        }}>PILOT</Text>
                        <Text style={{
                            color: colors.white,
                            ...fonts.body3
                        }}>{pilot}</Text>
                    </View>
                }


                {atc.length > 0 &&
                    <View style={{
                        marginTop: '10%',
                        alignSelf: 'flex-end',
                        width: '80%',
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: colors.secondary,
                    }}>
                        <Text style={{
                            color: colors.black,
                            ...fonts.headline2
                        }}>ATC</Text>
                        <Text style={{
                            color: colors.black,
                            ...fonts.body3
                        }}>{atc}</Text>
                    </View>
                }
            </View>

            {posisi.length > 0 &&
                <Image source={{
                    uri: posisi
                }} style={{
                    width: windowWidth,
                    height: 250,
                }} />
            }

            <View style={{
                backgroundColor: colors.primary,
                padding: 16,

            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    {/* <View style={{
                        flex: 1,
                        paddingRight: 10,
                    }}>
                        <MyPicker onValueChange={x => setPesan({
                            ...pesan,
                            posisi: x
                        })} label="Position" data={data} iconname="list" />
                    </View> */}

                    <TouchableOpacity onPress={() => {
                        setKirim({
                            ...kirim,
                            tipe: 'PILOT'
                        })
                    }} style={{
                        borderWidth: 1,
                        borderColor: colors.secondary,
                        borderRadius: 10,
                        backgroundColor: kirim.tipe == 'PILOT' ? colors.secondary : colors.primary,
                    }}>
                        <Image source={require('../../assets/pilot.png')} style={{
                            width: 80,
                            height: 80,
                            resizeMode: 'contain'
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setKirim({
                            ...kirim,
                            tipe: 'ATC'
                        })
                    }} style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        marginHorizontal: 10,
                        borderColor: colors.secondary,
                        backgroundColor: kirim.tipe == 'ATC' ? colors.secondary : colors.primary,
                    }}>
                        <Image source={require('../../assets/atc.png')} style={{
                            width: 80,
                            height: 80,
                            resizeMode: 'contain'
                        }} />
                    </TouchableOpacity>


                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row'
                }}>
                    <TextInput value={kirim.pesan} onChangeText={x => setKirim({
                        ...kirim,
                        pesan: x
                    })} placeholder='Masukan pesan' multiline style={{
                        flex: 1,
                        paddingLeft: 10,
                        ...fonts.body3,
                        backgroundColor: colors.white,
                        borderRadius: 12,
                    }} />
                    <TouchableOpacity onPress={sendData} style={{
                        left: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: colors.black,
                        borderRadius: 12,
                    }}>
                        <Icon type='ionicon' name='send' size={30} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})