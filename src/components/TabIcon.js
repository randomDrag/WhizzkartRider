import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
// import { COLORS } from '../constants'

const TabIcon = (props) => {

    const { focused, icon , name} = props

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 55,
            width: "100%",
            marginTop: 5,
            // borderWidth: 1,

        }}>

            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: 30,
                    height: 19,
                    tintColor: focused ? "#E84340" : "#948C87",
                    marginBottom: 5
                }}
            />

            <Text allowFontScaling={false}  style={{
                color: focused ? "#E84340" : "#948C87",
                position: 'absolute',
                bottom: 0,
                flex: 1,
                fontSize: 12
            }}>{name}</Text>


        </View>
    )
}

export default TabIcon

const styles = StyleSheet.create({})
