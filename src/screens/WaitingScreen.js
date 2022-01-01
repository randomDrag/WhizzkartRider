import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../Redux/userSlice';


const WaitingScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const {height} = Dimensions.get('screen')

    console.log("height: ", height)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])



    const logoutHandler = async () => {
        console.log("LOGGING OUT")
        try {
            await AsyncStorage.removeItem("userToken")
            dispatch(LOGOUT())
        }
        catch (error) {
            console.log("ERROR!! ", error)
        }
    }


    return (
        <View style={{flex:1, backgroundColor: "white"}}>
            <SafeAreaView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>

                <View style={{flex:1, }}>
                    
                    <Text allowFontScaling={false}  style={{marginTop: height<750 ? 60 : 130, fontWeight: "700", fontSize: 20, textAlign: 'center', color: "black"}}> Wait Till Admin Verifies You </Text>
                    <Text allowFontScaling={false}  style={{marginTop: 13, fontWeight: "500", fontSize: 15, textAlign: 'center', color: "black"}}>(You will recieve an email once you get verified)</Text>
                    
                    <LottieView source={require('../../assests/waitingLoader.json')} autoPlay loop   />
                  
                </View>


                <TouchableOpacity 
                    onPress={logoutHandler}
                    style={{
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                        bottom: 80,
                        paddingHorizontal: 30,
                        borderColor: "#E84340"
                    }}
                >
                    <Text allowFontScaling={false}  style={{fontWeight: "700", fontSize: 15, textAlign: 'center', color: "#E84340"}}>Login With other account</Text>
                    </TouchableOpacity>
            </SafeAreaView>
        </View>

    )
}

export default WaitingScreen

const styles = StyleSheet.create({})