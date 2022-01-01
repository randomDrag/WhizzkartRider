import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons';


const CustomRadioButton = (props) => {

    const { selectedValue, selectedHandler, options, containerStyle } = props

    return (
        <View style={{
            flex: 4, borderWidth: 0, alignItems: 'center', justifyContent: 'space-between',
            flexDirection: "row", ...containerStyle

        }}>

            {
                options.map((x, index) => {

                    return (

                        <TouchableOpacity key={index} onPress={() => selectedHandler(x.value)}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                borderWidth: 0,
                                paddingHorizontal: 10,
                                padding: 5
                            }}
                        >

                            <View
                                style={{ borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', height: 18, width: 18, marginRight: 8 }}
                            >
                                {
                                    selectedValue == x.value ?

                                        <Octicons name="primitive-dot" style={{ fontSize: 13, color: "black", }} />

                                        : null
                                }
                            </View>

                            <Text allowFontScaling={false}  style={{color: "black"}}>{x.title}</Text>

                        </TouchableOpacity>
                    )
                })
            }



        </View>

    )
}

export default CustomRadioButton

const styles = StyleSheet.create({})
