import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { OrderLayout } from '.'

import * as Animatable from 'react-native-animatable';


const DeliveredOrders = (props) => {

    const { deliveredOrders, getActive, getNew, getDelivered } = props


    return (

        deliveredOrders.length > 0 ?

            <Animatable.View
                animation="fadeInRight">
                {
                    deliveredOrders.map((x) => {

                        return (
                            <OrderLayout key={x.id} order={x} orderType={"Delivered Orders"} getActive={getActive} getNew={getNew} getDelivered={getDelivered} />
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

                <Text allowFontScaling={false}  style={{ fontSize: 18, fontWeight: "600", color: "black" }}>You Haven't Delivered Any Order Yet</Text>
            </View>

    )
}

export default DeliveredOrders

const styles = StyleSheet.create({})
