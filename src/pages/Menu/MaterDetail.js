import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { colors, fonts, windowWidth } from '../../utils';
import { MyHeader } from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Pdf from 'react-native-pdf';
import YoutubePlayer from "react-native-youtube-iframe";
export default function MaterDetail({ navigation, route }) {
    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <MyHeader title={item.judul} />

            <View style={{
                flex: 1,
                padding: 16
            }}>

                {item.tipe == 'PDF' &&

                    <Pdf
                        trustAllCerts={false}
                        // source={{ uri: webURL + data.foto_pdf, cache: true }}
                        source={{
                            uri: route.params.pdf, cache: true
                        }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={{
                            flex: 1,

                        }} />

                }

                {item.tipe !== 'PDF' &&

                    <YoutubePlayer
                        height={220}
                        videoId={route.params.link_youtube}
                        webViewProps={{
                            injectedJavaScript: `
  var element = document.getElementsByClassName('container')[0];
  element.style.position = 'unset';
  element.style.paddingBottom = 'unset';
  true;
`,
                        }}
                    />

                }

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})