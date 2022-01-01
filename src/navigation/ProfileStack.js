import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../screens';
import { StaticWebView } from '../components';
import { ReviewAndRatings } from '../screenComponents/profileComponents';


const Stack = createStackNavigator();


const ProfileStack = () => {
    return (


        <Stack.Navigator>

            <Stack.Screen name="Profile" component={Profile} />
        
            <Stack.Screen name="StaticWeb" component={StaticWebView} />

            <Stack.Screen name="ReviewsAndRating" component={ReviewAndRatings} />

        </Stack.Navigator>
    )
}

export default ProfileStack

const styles = StyleSheet.create({})
