import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';

export default function Materi({ navigation }) {

    const [data, setData] = useState([]);
    const __getTransaction = () => {
        axios.post(apiURL + 'materi').then(res => {
            console.log(res.data);
            setData(res.data)

        })
    }
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction()
        }
    }, []);


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.secondary,
        }}>
            <MyHeader title="MATERI" />

            <View style={{
                flex: 1,
                padding: 16
            }}>

                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            if (item.link_youtube.length > 0) {
                                navigation.navigate('MaterDetail', {
                                    ...item,
                                    tipe: 'YOUTUBE'
                                })
                            } else {
                                navigation.navigate('MaterDetail', {
                                    ...item,
                                    tipe: 'PDF'
                                })
                            }
                        }} style={{
                            padding: 10,
                            backgroundColor: colors.primary,
                            borderRadius: 10,
                            marginBottom: 12,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                ...fonts.headline2,
                                color: colors.white
                            }}>{item.judul}</Text>
                        </TouchableOpacity>
                    )
                }} />

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})