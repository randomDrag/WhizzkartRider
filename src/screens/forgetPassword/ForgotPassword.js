import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View, ScrollView, SafeAreaView, Alert, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import Entypo from 'react-native-vector-icons/Entypo';
import axiosBaseUrl from '../../../axiosBaseUrl';

import { ActivityIndicator } from 'react-native-paper'

const ForgotPassword = ({ navigation }) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('');

    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(false)


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])




    const emailPhoneHandler = () => {

        setError(false)
        setLoading(true)

        axiosBaseUrl.post('forgetPassword', {
            username: email,
        })
            .then(async (res) => {

                console.log("Sucess ", res.data)
                setLoading(false)

                if (res.data.status == 402) {
                    console.log(res.data)
                    setError(true)
                }
                else if (res.data.status == 200) {

                    console.log("res ", res.data)
                    navigation.navigate("OTPScreen", {
                        username: res.data.username
                    })

                }
            })
            .catch((err) => {
                setLoading(false)

                console.log("ERR while logging in ", err)
            })
    }




    return (

        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "none"} style={styles.Container}>


            <SafeAreaView style={{
                flex: 1,
            }}>


                <TouchableOpacity
                    style={{ position: "relative", top: 0 }}
                    onPress={() => navigation.navigate("Login")}

                >
                    <Entypo name="chevron-left" style={{ fontSize: 35, color: "#E84340", marginRight: 10 }} />
                </TouchableOpacity>



                <ScrollView style={{ marginTop: 0, flex: 1 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >


                    <Image
                        style={{ width: 195, height: 140, alignItems: 'center', borderWidth: 0, alignContent: 'center', marginBottom: 10, marginTop: -40 }}
                        source={
                            require("../../../assests/logo.png")
                        }
                    />


                    <Text allowFontScaling={false} style={{ color: '#E84340', textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 30 }}>Forgot Password</Text>



                    <View style={styles.inputBox}>


                        <Image
                            source={require("../../../assests/ic_markunread_24px.png")}
                            style={{ width: 18, height: 18, }}

                        />

                        <TextInput allowFontScaling={false}
                            placeholder="Email Address or Phone Number*"
                            autoCapitalize="none"
                            onChangeText={(val) => setEmail(val)}
                            value={email}
                            placeholderTextColor="#9e9e9e"

                            style={styles.textInpurStyle}
                        />

                    </View>



                    {
                        error ?
                            <Text allowFontScaling={false} style={{ marginBottom: 15, alignSelf: 'center', width: "80%", color: "#E84340", fontSize: 13, textAlign: 'center' }}>{email} does not exist</Text> : null
                    }



                    {
                        loading ?

                            <View style={{
                                borderWidth: 0,
                                justifyContent: 'center',
                                alignItems: "center",
                                padding: 10,
                                borderRadius: 5,
                                // marginTop: error ? 15 : 35,
                                width: "85%",
                                alignSelf: "center"
                            }}>

                                <ActivityIndicator size="small" color="#E84340" />

                            </View>
                            :


                            <TouchableOpacity
                                onPress={emailPhoneHandler}
                                style={{ width: 150, marginTop: 0 }}
                            >
                                <View style={styles.loginButton}>
                                    <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "500", color: "white" }}>Send OTP</Text>
                                </View>
                            </TouchableOpacity>

                    }

                </ScrollView>

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white"
    },
    inputPut: {
        width: "100%",
        marginLeft: 20,
        color: "#000",
        marginRight: 0,
        borderBottomWidth: 1,


    },
    inbox: {
        marginTop: 20,
        flexDirection: 'row',
        marginLeft: 30,
        borderWidth: 0,
        marginRight: 30,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 20,

        borderWidth: 1,

        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 10,



    },
    imageSet: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5


    },
    button: {
        marginTop: 20,
        backgroundColor: "#E84340",
        width: 100,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',

    },



    inputBox: {
        borderWidth: 0,
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: "85%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',

        shadowColor: '#4f4f4f',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 5,
        marginBottom: 25


    },



    textInpurStyle: {
        borderWidth: 0,
        flex: 1,
        marginLeft: 20,
        padding: 5,
        fontSize: 16,
        color: "black"
    },

    loginButton: {
        justifyContent: 'center',
        alignItems: "center",
        padding: 10,
        backgroundColor: "#E84340",
        borderRadius: 5,
    },




})
