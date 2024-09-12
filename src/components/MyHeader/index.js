import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { MyDimensi, colors, fonts, windowWidth, Color } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
import MyMenu from '../MyMenu';
export default function MyHeader({ height, onPress, color = Color.white[900], title, icon = false, iconname = 'search' }) {
  const navigation = useNavigation();
  return (


    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      height: height,
      backgroundColor: colors.primary,
    }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{

      }}>
        <Icon type='ionicon' name='arrow-back-outline' size={24} color={color} />
      </TouchableOpacity>

      <Text style={{
        ...fonts.headline4,
        flex: 1,

        textAlign: 'center',

        color: color
      }}>{title}</Text>

      {icon &&
        <TouchableOpacity onPress={onPress} style={{

        }}>
          <Icon name={iconname} size={24} color={color} />
        </TouchableOpacity>
      }
    </View>

  );
}

const styles = StyleSheet.create({});
