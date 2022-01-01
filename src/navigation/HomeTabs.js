import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Home, Profile } from '../screens';
import { icons } from '../constants';
import { TabIcon } from '../components';
import ReviewAndRatings from '../screenComponents/profileComponents/ReviewAndRatings';
import { ProfileStack } from '.';


const Tab = createBottomTabNavigator();


const HomeTabs = () => {

    const homeIcon = require("../../assests/home.png")
    const profileIcon = require("../../assests/user.png")

    return (


        <Tab.Navigator

            tabBarOptions={{

                keyboardHidesTabBar: true,
                showLabel: false,
                style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: "white",
                    // borderTopColor: "transparent",
                    height: 60,


                },


            }}

            initialRouteName="Pofile1"

        >
            <Tab.Screen name="Home1" component={Home} options={{
                tabBarLabel: "",
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Home" icon={homeIcon} />

            }} />



            <Tab.Screen name="Profile1" component={ProfileStack} options={{
                tabBarLabel: "",
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Profile" icon={profileIcon} />
            }} />



{/* 
            <Tab.Screen name="Review" component={ReviewAndRatings} options={{
                tabBarLabel: "",
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Profile" icon={profileIcon} />
            }} /> */}

{/*             <Stack.Screen name="StaticWeb" component={StaticWebView} />
 */}
        </Tab.Navigator>

    )
}

export default HomeTabs

const styles = StyleSheet.create({})
