import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View, ScrollView, SafeAreaView, Alert, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import Entypo from 'react-native-vector-icons/Entypo';
import axiosBaseUrl from '../../../axiosBaseUrl';
import { ActivityIndicator } from 'react-native-paper'


const OTPScreen = ({ navigation, route }) => {


    console.log(route.params)

    const { username } = route.params

    const dispatch = useDispatch()

    const [email, setEmail] = useState('');



    const [pin1, setPin1] = useState('')
    const [pin2, setPin2] = useState('')
    const [pin3, setPin3] = useState('')
    const [pin4, setPin4] = useState('')

    const otpRef = useRef('');

    const pin1Ref = useRef(null)
    const pin2Ref = useRef(null)
    const pin3Ref = useRef(null)
    const pin4Ref = useRef(null)

    const [otpResendMessage, setOtpResendMesaage] = useState(false)

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])



    const verifyHandler = () => {

        const otpEntered = pin1 + pin2 + pin3 + pin4;

        setError(false)
        setLoading(true)


        axiosBaseUrl.post('otpVerify', {
            mobile: username,
            otp: otpEntered
        })
            .then(async (res) => {

                console.log("Sucess on verifying otp: ", res.data)
                setLoading(false)

                if (res.data.status == 402) {

                    console.log(res.data)
                    setError(true)

                }
                else if (res.data.status == 200) {

                    console.log("res ", res.data)

                    navigation.navigate("NewPassword", {
                        username: username
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
                    onPress={() => navigation.navigate("ForgotPassword")}

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




                    <Text allowFontScaling={false} style={{ color: '#E84340', textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 0 }}>Enter OTP</Text>



                    <Text allowFontScaling={false} style={styles.headingText}>Please check the OTP sent to your mobile number</Text>
                    <Text allowFontScaling={false} style={{ marginBottom: 20 }}> {username} </Text>

                    <View style={styles.pinContainer}>

                        <TextInput allowFontScaling={false}
                            style={styles.pin}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            maxLength={1}

                            ref={pin1Ref}
                            value={pin1}
                            onChangeText={async (val) => {
                                setPin1(val)

                                if (val != "")
                                    pin2Ref.current.focus()

                            }}
                        />


                        <TextInput allowFontScaling={false}
                            style={styles.pin}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            maxLength={1}

                            ref={pin2Ref}
                            value={pin2}
                            onChangeText={async (val) => {
                                setPin2(val)

                                if (val != "")
                                    pin3Ref.current.focus()
                            }}
                        />



                        <TextInput allowFontScaling={false}
                            style={styles.pin}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            maxLength={1}

                            ref={pin3Ref}
                            value={pin3}
                            onChangeText={async (val) => {
                                setPin3(val)

                                if (val != "")
                                    pin4Ref.current.focus()
                            }}
                        />



                        <TextInput allowFontScaling={false}
                            style={styles.pin}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            maxLength={1}

                            ref={pin4Ref}
                            value={pin4}
                            onChangeText={async (val) => {
                                setPin4(val)
                            }}
                        />


                    </View>



                    {
                        error ?
                            <Text allowFontScaling={false} style={{ marginTop: 15, alignSelf: 'center', width: "80%", color: "#E84340", fontSize: 13, textAlign: 'center' }}>Invalid OTP</Text> : null
                    }


                    {
                        loading ?

                            <View style={{
                                borderWidth: 0,
                                justifyContent: 'center',
                                alignItems: "center",
                                padding: 10,
                                borderRadius: 5,
                                marginTop: 25,
                                width: "85%",
                                alignSelf: "center"
                            }}>

                                <ActivityIndicator size="small" color="#E84340" />

                            </View>
                            :


                            <TouchableOpacity
                                onPress={verifyHandler}
                                style={{ width: 150, marginTop: error ?  15 : 30 }}
                            >
                                <View style={styles.loginButton}>
                                    <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "500", color: "white" }}>Verify OTP</Text>
                                </View>
                            </TouchableOpacity>


                    }



                </ScrollView>

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default OTPScreen

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white"
    },


    headingText: {
        alignSelf: 'center',
        marginBottom: 15,
        fontWeight: '600',
        fontSize: 14,
        marginTop: 30
    },

    pinContainer: {
        // borderWidth: 1,
        width: "70%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },

    pin: {
        fontSize: 20,
        fontWeight: "600",
        borderWidth: 0.8,
        borderRadius: 5,
        width: 50,
        height: 50,
        textAlign: 'center',
        color: "#000000"
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
