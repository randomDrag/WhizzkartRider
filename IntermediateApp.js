import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ACTIVE_USER, LOGIN, selectActiveUser, selectUserToken } from './src/Redux/userSlice'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, RegisterScreen, WaitingScreen } from './src/screens';
import { HomeTabs } from './src/navigation';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosBaseUrl from './axiosBaseUrl';
import { getProfile } from './src/actions';
import { Image } from 'react-native';
import { StaticWebView } from './src/components';
import { ForgotPassword, NewPassword, OTPScreen } from './src/screens/forgetPassword';

import messaging from '@react-native-firebase/messaging';
import { notificationListener, requestUserPermission } from './src/screens/firebase';


const Stack = createStackNavigator();

const IntermediateApp = () => {


    const dispatch = useDispatch()

    const userToken = useSelector(selectUserToken)
    const activeUser = useSelector(selectActiveUser)

    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        checkUser()


        requestUserPermission()
        notificationListener()

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)

      //  requestUserPermission()

    }, [])


    const checkUser = async () => {

        try {
            const user = await AsyncStorage.getItem('userToken')

            // console.log(user)


            if (user !== null) {
                dispatch(LOGIN({ userToken: user }))


                // axiosBaseUrl.get("profile")
                // .then((res) => {
                //     // console.log(res.data.data)
                //     dispatch(ACTIVE_USER({activeUser: res.data.data}))
                // })
                // .catch((err) => console.log("ERR while fetching profile ", err))

                getProfile(dispatch)
            }

        }
        catch (err) {
            // error reading value
            console.log("Err while fetching: ", err)
        }

    }


    if (isLoading) {

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: 'black' }}>
                {/* <ActivityIndicator size="large" color="#0000ff" /> */}

                <Image
                    source={require("./assests/splash.png")}
                    style={{ width: "100%", height: "100%", }}
                />

            </View>
        )
    }


    if (!userToken) {
        return (
            <NavigationContainer>

                <Stack.Navigator initialRouteName="Login">


                <Stack.Screen name="NewPassword" component={NewPassword} />

                <Stack.Screen name="OTPScreen" component={OTPScreen} />

                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

                    {/* <Stack.Screen name="Home123" component={WaitingScreen} /> */}
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="StaticWeb" component={StaticWebView} />



                </Stack.Navigator>

            </NavigationContainer>
        )
    }


    return (


        <NavigationContainer>

            {
                activeUser?.is_verified == false ?

                    <Stack.Navigator>

                        <Stack.Screen name="Waiting" component={WaitingScreen} />

                    </Stack.Navigator>

                    :


                    <Stack.Navigator>

                        <Stack.Screen name="Home" component={HomeTabs} options={{
                            headerShown: false,
                        }} />


                    </Stack.Navigator>
            }
        </NavigationContainer>
    )
}

export default IntermediateApp

const styles = StyleSheet.create({})

