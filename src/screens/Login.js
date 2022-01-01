import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import axiosBaseUrl from '../../axiosBaseUrl'
import { LOGIN } from '../Redux/userSlice'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from '../actions'

import Entypo from 'react-native-vector-icons/Entypo';

import { ActivityIndicator } from 'react-native-paper'

const Login = ({ navigation }) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(true)

    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(false)


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    const signInHandler =  async () => {

        const fcm  =  await AsyncStorage.getItem('fcmToken')

        setError(false)
        setLoading(true)

        axiosBaseUrl.post('login', {
            email: email,
            password: password,
            fcm_token : fcm
            
        })
            .then(async (res) => {
                setLoading(false)

                if (res.data.code == 423) {

                    console.log(res.data)
                    setError(true)
                }
                else if (res.data.code == 200) {

                    console.log("res ", res.data)

                    await AsyncStorage.setItem('userToken', res.data.data.token)

                    dispatch(LOGIN({ userToken: res.data.data.token }))

                    getProfile(dispatch)

                }
            })
            .catch((err) => {
                console.log("ERR while logging in ", err)
                setLoading(false)

            })

        // http://whizzkart.in/public/api/
        // axios.post("https://vegcorb.com/api/verify-mobile", {
        //     phone: "9876543211"
        // })
        // .then((res) => console.log("SUCEESS in vegcorb"))
        // .catch((err) => console.log("ERR ", err))

        // axios.post("http://whizzkart.in/public/api/login", {
        //     email: "LSSSSS@gmail.com",
        //     password: "123456"
        // })
        // .then((res) => console.log("SUCEESS"))
        // .catch((err) => console.log("ERR in axios ", err))

    }





    const signInHandler1 = () => {


        // console.log("SIGN IN HANDLER 1")


        // axiosBaseUrl.post('updateCart', {
        //     product_id: 3,
        //     action: "subtract"  // add
        // }, {
        //     headers: {
        //         Authorization: "Bearer uFEkCHeruHgeMgPlPubqQmJRaCDwXA38j0UkfoHf"
        //     }
        // })
        //     .then((res) => {
        //         console.log("Success while adding to the cart ", res.data)

        //     })
        //     .catch((err) => {
        //         console.log("ERR while adding to the cart ", err)
        //     })


        // axiosBaseUrl.post('FacebookGoogleSignUp', {
        //     token: "himanshu Token",

        //     user: {
        //         "email": "digihimanshu29@gmail.com",
        //         "familyName": "Goyal",
        //         "givenName": "Himanshu",
        //         "id": "107207063303438319834",
        //         "name": "Himanshu Goyal",
        //         "photo": "https://lh3.googleusercontent.com/a-/AOh14GiouCqe02PHII_QIsrpwwZ94xsbRmYgQ1A25whk=s96-c"

        //     }
        // })
        //     .then((res) => {
        //         console.log("Success while adding to the cart ", res.data)

        //     })
        //     .catch((err) => {
        //         console.log("ERR while adding to the cart ", err)
        //     })


    }




    return (

        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "none"} style={styles.Container}>


            <SafeAreaView style={{
                flex: 1,
            }}>

                <ScrollView style={{ marginTop: 20, flex: 1 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >

                    {/* <View style={{ flexDirection: 'column', padding: 10, alignItems: "center", borderWidth: 1, flex: 1, justifyContent: 'center' }}> */}
                    <Image
                        style={{ width: 195, height: 140, alignItems: 'center', borderWidth: 0, alignContent: 'center', marginBottom: 10 }}
                        source={
                            require("../../assests/logo.png")
                        }
                    />

                    <Text allowFontScaling={false} style={{ color: '#E84340', textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 20 }}>Sign in </Text>



                    <View style={styles.inputBox}>


                        <Image
                            source={require("../../assests/ic_markunread_24px.png")}
                            style={{ width: 18, height: 18, }}

                        />

                        <TextInput allowFontScaling={false}
                            placeholder="Email Address*"
                            autoCapitalize="none"
                            onChangeText={(val) => setEmail(val)}
                            value={email}
                            placeholderTextColor="#9e9e9e"

                            style={styles.textInpurStyle}

                        />

                    </View>



                    <View style={styles.inputBox}>


                        <Image
                            source={require("../../assests/ic_lock_24px.png")}
                            style={{ width: 18, height: 18, }}

                        />

                        <TextInput allowFontScaling={false}
                            placeholder="Password*"
                            autoCapitalize="none"
                            onChangeText={(val) => setPassword(val)}
                            value={password}
                            placeholderTextColor="#9e9e9e"
                            secureTextEntry={showPassword}

                            style={styles.textInpurStyle}

                        />


                        <TouchableOpacity style={{ position: "relative", right: 10, }}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {

                                !showPassword ? <Entypo name="eye-with-line" style={{ fontSize: 22, color: "#ababab", }} />
                                    :
                                    <Entypo name="eye" style={{ fontSize: 24, color: "#ababab", }} />

                            }
                        </TouchableOpacity>


                    </View>


                    {
                        error ?
                            <Text allowFontScaling={false} style={{ alignSelf: 'center', width: "80%", color: "#E84340", fontSize: 13, textAlign: 'center' }}>Invalid Credentials</Text> : null
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
                                onPress={signInHandler}
                                style={{ width: 200, marginTop: 20 }}
                            >
                                <View style={styles.loginButton}>
                                    <Text allowFontScaling={false} style={{ fontSize: 18, fontWeight: "500", color: "white" }}> Log In  </Text>
                                </View>
                            </TouchableOpacity>

                    }



                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={{ marginTop: 20 }}>
                        <Text allowFontScaling={false} style={{ color: "#333333", }}>Forgot Password?</Text>
                    </TouchableOpacity>




                    <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
                        <Text allowFontScaling={false} style={{ color: "#333333", }}>Don't have an account? <Text allowFontScaling={false} style={{ textDecorationLine: "underline", fontWeight: "700" }}>SignUp</Text> </Text>
                    </TouchableOpacity>


                </ScrollView>

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Login

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
