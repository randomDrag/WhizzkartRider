import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { OrderLayout } from '.'

import * as Animatable from 'react-native-animatable';

const NewOrders = (props) => {

    const { newOrders, getActive, getNew, getDelivered } = props


    return (

        newOrders.length > 0 ?
            <Animatable.View
                animation="fadeInLeft">

                {
                    newOrders.map((x) => {

                        return (
                            <OrderLayout key={x.id} order={x} orderType={"New Orders"} getActive={getActive} getNew={getNew} getDelivered={getDelivered} />

                        )
                    })
                }


            </Animatable.View>

            :

            <View style={{
                borderWidth: 0,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Text allowFontScaling={false}  style={{ fontSize: 18, fontWeight: "600", color: "black" }}>No New Orders</Text>
            </View>

    )
}

export default NewOrders

const styles = StyleSheet.create({})
