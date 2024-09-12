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
import MyCarouser from '../../components/MyCarouser';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 2,
        height: windowWidth / 2,

      }}>
        <LinearGradient colors={[colors.primary, colors.secondary]} style={{
          width: windowWidth / 2,
          height: windowWidth / 2,
          borderRadius: 12,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Image source={img} style={{
            width: windowWidth / 2.5, height: windowWidth / 2.5,
          }} />
        </LinearGradient>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          ...fonts.caption,
          textAlign: 'center',
          maxWidth: '85%'
        }}>{label}</Text>

      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({
    nama_lengkap: '',
  });

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }

  useEffect(() => {
    __getUser();
  }, [])
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.secondary,
    }}>
      <ImageBackground source={require('../../assets/bghome.png')} style={{
        flex: 1.5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}>

        <View style={{
          padding: 16,
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              ...fonts.body2,
              color: colors.white
            }}>Selamat datang, {user.nama_lengkap.split(" ")[0]}</Text>
            <Image style={{
              width: 220,
              height: 70,
            }} source={require('../../assets/logotext.png')} />
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image style={{
              width: 100,
              height: 100,
              resizeMode: 'contain'
            }} source={require('../../assets/logo2.png')} />
          </View>
        </View>

      </ImageBackground>
      <View style={{
        flex: 1,
        padding: 16,
        justifyContent: 'space-evenly'
      }}>
        <TouchableOpacity onPress={() => navigation.navigate('Materi')} style={{
          padding: 10,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          borderRadius: 12,
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/a1.png')} style={{
            width: 100,
            height: 60,
            resizeMode: 'contain'
          }} />
          <Text style={{
            left: 10,
            ...fonts.headline0,
            color: colors.white,
          }}>
            MATERI
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Game')} style={{
          padding: 10,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          borderRadius: 12,
          alignItems: 'center'
        }}>
          <Image source={require('../../assets/a2.png')} style={{
            width: 100,
            height: 60,
            resizeMode: 'contain'
          }} />
          <Text style={{
            left: 10,
            ...fonts.headline0,
            color: colors.white,
          }}>
            GAME
          </Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})