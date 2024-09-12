import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';

export default function Register({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const img = new Animated.Value(0.8);
    const card = new Animated.Value(50);
    const toast = useToast();
    Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
    }).start();
    Animated.timing(card, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
    }).start();
    const [kirim, setKirim] = useState({
        api_token: api_token,
        username: '',
        nama_lengkap: '',
        kelas: '',
        nit: '',
        password: '',
        repassword: '',

    });

    const simpan = () => {



        if (
            kirim.nama_lengkap.length === 0 &&
            kirim.username.length === 0 &&
            kirim.password.length === 0

        ) {
            toast.show('Formulir pendaftaran tidak boleh kosong', {
                type: 'warning'
            })
        } else if (kirim.nama_lengkap.length === 0) {
            toast.show('Silahkan ketikan nama lengkap', {
                type: 'warning'
            })
        }

        else if (kirim.username.length === 0) {
            showMessage({
                message: 'Masukan username',
            });
        }
        else if (kirim.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else if (kirim.repassword.length === 0) {
            showMessage({
                message: 'Ulangi kata sandi kamu',
            });
        } else {

            console.log(kirim);

            setLoading(true);
            axios
                .post(apiURL + 'register', kirim)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        toast.show(res.data.message, {
                            type: 'danger'
                        })

                    } else {
                        toast.show(res.data.message, {
                            type: 'success'
                        });
                        storeData('user', res.data.data);
                        navigation.replace('MainApp');

                    }


                });
        }
    };




    useEffect(() => {


        axios.post(apiURL + 'company').then(res => {
            setComp(res.data.data);
        })
    }, []);
    const [sama, setSama] = useState(true)

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
        }}>
            {/* <MyHeader title="Daftar Akun" /> */}

            <ScrollView showsVerticalScrollIndicator={false}>



                <View style={{
                    borderRadius: 12,
                    margin: 16,
                    padding: 20,
                    backgroundColor: colors.secondary
                }}>

                    <Text style={{
                        ...fonts.headline1,
                        color: colors.white,
                        textAlign: 'center',
                        marginBottom: 2
                    }}>Daftar</Text>

                    <MyGap jarak={24} />
                    {/* NAMA LENGKAP */}
                    <MyInput label='Nama Lengkap' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nama_lengkap: x
                        })
                    }} iconname='person-outline' placeholder='Ketikan nama lengkap' />
                    <MyGap jarak={20} />


                    <MyInput label='Username' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            username: x
                        })
                    }} iconname='at-outline' placeholder='Ketikan username' />
                    <MyGap jarak={20} />



                    <MyInput label='Kelas' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            kelas: x
                        })
                    }} iconname='home-outline' placeholder='Ketikan kelas' />

                    <MyGap jarak={20} />

                    <MyInput label='NIT' onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nit: x
                        })
                    }} iconname='card-outline' placeholder='Ketikan nit' />

                    <MyGap jarak={20} />
                    {/*INPUT KATA SANDI */}
                    <MyInput
                        placeholder="Ketikan kata sandi"
                        label="Kata Sandi"
                        iconname="lock-closed-outline"
                        value={kirim.password}
                        secureTextEntry={true}
                        onChangeText={value =>
                            setKirim({
                                ...kirim,
                                password: value,
                            })
                        }
                    />


                    {/* INPUT KATA SANDI ULANG */}
                    <MyGap jarak={20} />
                    <MyInput
                        borderColor={sama ? Color.blueGray[300] : colors.danger}

                        placeholder="Ketikan ulang kata sandi"
                        label="Ketikan ulang kata sandi"
                        iconname="lock-closed-outline"
                        secureTextEntry
                        value={kirim.repassword}
                        onChangeText={value => {

                            if (value !== kirim.password) {
                                setSama(false)
                            } else {
                                setSama(true)
                            }

                            setKirim({
                                ...kirim,
                                repassword: value,
                            })
                        }

                        }
                    />
                    <MyGap jarak={20} />

                    {!loading &&
                        <>
                            <MyButton

                                warna={colors.primary}
                                title="Daftar"
                                Icons="log-in"
                                onPress={simpan}
                            />

                            <MyGap jarak={12} />
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{
                                    ...fonts.body3,
                                    color: colors.black,
                                    textAlign: 'center'
                                }}>
                                    Saya sudah memiliki akun? <Text style={{
                                        ...fonts.headline5,
                                        color: colors.black,
                                        textAlign: 'center'
                                    }}>
                                        Masuk Sekarang!
                                    </Text>
                                </Text>
                            </TouchableOpacity>

                        </>
                    }

                    {loading && <MyLoading />}

                </View>


            </ScrollView>


        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
