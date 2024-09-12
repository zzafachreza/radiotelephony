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
import { MyButton, MyGap, MyInput } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import MyLoading from '../../components/MyLoading';
import { useToast } from 'react-native-toast-notifications';
import LinearGradient from 'react-native-linear-gradient';

export default function Login({ navigation, route }) {
  const [loading, setLoading] = useState(false)
  const img = new Animated.Value(0.8);
  const card = new Animated.Value(50);
  const toast = useToast();
  const masuk = () => {
    if (kirim.username.length == 0 && kirim.length == 0) {
      toast.show('Username dan kata sandi tidak boleh kosong', { type: 'warning' })

    } else if (kirim.username.length == 0) {
      toast.show('Username tidak boleh kosong', { type: 'warning' })
    } else if (kirim.password.length == 0) {
      toast.show('Kata sandi tidak boleh kosong', { type: 'warning' })
    } else {
      setLoading(true);
      console.log(kirim);
      axios.post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            toast.show(res.data.message, { type: 'danger' })
          } else {
            storeData('user', res.data.data);
            navigation.replace('MainApp')
          }
        });
    }
  }

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: '',
    password: '',
  })

  const [comp, setComp] = useState({})

  useEffect(() => {

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
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })
  }, []);

  return (
    <ImageBackground source={require('../../assets/bglogin.png')} style={{
      flex: 1,

    }}>

      <Animated.View style={{
        transform: [{ translateY: card }]
      }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: windowHeight / 2.2,
          }}>
            <Animated.Image source={require('../../assets/logo2.png')} style={{
              width: windowHeight / 3,
              height: windowHeight / 3,
              resizeMode: 'contain',
              transform: [{ scale: img }]
            }} />
          </View>





          <View style={{
            margin: 16,
            padding: 20,
            // backgroundColor: colors.white,
          }}>
            <Text style={{
              ...fonts.headline2,
              color: colors.white,
              marginBottom: 10
            }}>Masuk</Text>
            <MyInput textColor={colors.white} iconname="at" label="Username" onChangeText={x => {
              setKirim({
                ...kirim,
                username: x
              })
            }} placeholder="Ketikan username" />
            <MyGap jarak={5} />
            <MyInput textColor={colors.white} label="Kata Sandi" onChangeText={x => {
              setKirim({
                ...kirim,
                password: x
              })
            }} iconname="lock-closed-outline" placeholder="Ketikan kata sandi" secureTextEntry={true} />
            <TouchableOpacity onPress={() => {
              let urlWA = 'https://wa.me/' + comp.tlp + `?text=Hallo admin saya lupa kata sandi . . .`;
              Linking.openURL(urlWA)
            }} style={{ marginTop: 0 }}>
              <Text style={{
                textAlign: 'right',
                ...fonts.headline5,
                marginTop: 10,
                color: colors.white,
              }}>Lupa kata sandi ?</Text>
            </TouchableOpacity>
            <MyGap jarak={20} />

            {loading && <MyLoading />}
            {!loading &&
              <MyButton
                warna={colors.secondary}
                colorText={colors.black}
                iconColor={colors.black}
                onPress={masuk}
                title="Login"
                Icons="log-in-outline"
              />
            }
            {!loading &&
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                <View style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    ...fonts.body3,
                    textAlign: 'center',
                    color: colors.white
                  }}>Belum memiliki Akun ? <Text style={{
                    ...fonts.headline5,
                    textAlign: 'center',
                    color: colors.white
                  }}>Daftar Sekarang !</Text></Text>
                </View>
              </TouchableWithoutFeedback>}

          </View>


        </ScrollView>
      </Animated.View>

    </ImageBackground >
  );
}

const styles = StyleSheet.create({});
