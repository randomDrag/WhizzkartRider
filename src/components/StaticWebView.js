
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import { env } from '../../env';
import { selectUserName, selectUserToken } from '../Redux/userSlice';

const StaticWebView = ({navigation, route}) => {

    const {apiFiller, name} = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            title: name,            
        })
    }, [])
  


    const errorHandler = () => {
        Alert.alert("Contact Support")
        navigation.navigate(("Profile"))
       
    }


    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <StatusBar barStyle="dark-content" backgroundColor = "black"  />

            <SafeAreaView style={{
                flex: 1,

            }}> 

                <WebView
                    source={{ uri: env.webUrl + apiFiller}}
                    onError={errorHandler}
                />
            </SafeAreaView>
        </View>
    )
}

export default StaticWebView

const styles = StyleSheet.create({

})
