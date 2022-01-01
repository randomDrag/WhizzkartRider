import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { OrderLayout } from '.'

import * as Animatable from 'react-native-animatable';


const ActiveOrders = (props) => {

    const { activeOrders, getActive, getNew, getDelivered } = props


    return (


        activeOrders?.length > 0 ?

            <Animatable.View
                animation="fadeInRight">
                {
                    activeOrders.map((x) => {

                        return (
                            <OrderLayout key={x.id} order={x} orderType={"Active Orders"} getActive={getActive} getNew={getNew} getDelivered={getDelivered} />

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

                <Text allowFontScaling={false}  style={{ fontSize: 18, fontWeight: "600", color: "black" }}>No Active Orders</Text>
            </View>


    )
}

export default ActiveOrders

const styles = StyleSheet.create({})
