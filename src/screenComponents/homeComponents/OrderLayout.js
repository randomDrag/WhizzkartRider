import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo';

import moment from 'moment';
import axiosBaseUrl from '../../../axiosBaseUrl';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OrderStatusModal from './modals/OrderStatusModal';

import Toast from 'react-native-simple-toast';


const OrderLayout = (props) => {

    const { order, orderType, getActive , getNew, getDelivered } = props

    const order_date = moment(order?.order_date).format("DD/MM/YYYY")

    const customerAddress = order?.customer_address
    const customerFullAddress = customerAddress.house_no + ", " + customerAddress.landmark + " " + customerAddress.area + " " + customerAddress.state + " - " + customerAddress.pincode

    const [deliveryModalVisible, setDeliveryModalVisible] = useState(false)

    // console.log(order?.order_details)

    let products = ""
    order?.order_details.map((x, n) => {
        // console.log(x)
        
        products = products + x?.vendor_product?.product_details?.name + ", "

    })


    const acceptHandler = (orderId) => {

        console.log("ACCEPT")

        axiosBaseUrl.post("updateOrderDeliveryBoy", {
            order_id: orderId,
            status: "Accepted"
        })
            .then((res) => {
                console.log("RES>> ", res.data)

                getNew()
                getActive()
                Toast.show(`Order ${orderId} Accepted`, Toast.LONG);

            })
            .catch((err) => console.log("ERR WHILE ACCEPTING ORDERS>> ", err))

    }


    const rejectHandler = (orderId) => {

        console.log("REJECT ", orderId)


        axiosBaseUrl.post("updateOrderDeliveryBoy", {
            order_id: orderId,
            status: "Rejected"
        })
            .then((res) => {
                console.log("RES>> ", res.data)

                getNew()

                Toast.show(`Order ${orderId} Rejected`, Toast.LONG);


            })
            .catch((err) => console.log("ERR WHILE ACCEPTING ORDERS>> ", err))

    }


    const updateOrderStatus = (orderId, updatedStatus, paymentStatus, orderReason) => {

        console.log("Updatre Order Status ", orderId, " ", updatedStatus)


        axiosBaseUrl.post("updateOrderDeliveryBoy", {
            order_id: orderId,
            status: updatedStatus,
            payment_status: paymentStatus,
            order_reason: orderReason
        })
            .then((res) => {
                console.log("Staus Updated>> ", res.data)

                getActive()

                if(updatedStatus == "Delivered"){
                    getDelivered()
                    Toast.show(`Order ${orderId} Delivered`, Toast.LONG);

                }
                
                else if(updatedStatus=="Not Delivered"){
                    getDelivered()
                    Toast.show(`Order ${orderId} is Not Delivered`, Toast.LONG);

                }
                else if(updatedStatus == "Picked Up"){
                    Toast.show(`Order ${orderId} Picked Up`, Toast.LONG);
                }

                
            })
            .catch((err) => console.log("ERR WHILE Updating ORDER>> ", err))

    }



    return (


        <View style={[styles.orderContainer, {borderRightColor: order?.order_status == "Delivered" ? "#2cc229" : "#cf3c4f" , borderRightWidth: orderType == "Delivered Orders" ? 3 : 0}]}>

            <View style={styles.orderHeader}>

                <Text allowFontScaling={false}  style={{ color: "#5c5c5c", fontWeight: '700', fontSize: 16 }}> {order?.order_id}  </Text>
                <Text allowFontScaling={false}  style={{ color: "#878787", fontSize: 12, fontWeight: "600" }}> {order_date}  </Text>

            </View>



            <View style={{ marginTop: 15 }}>
                <Text allowFontScaling={false}  style={{ color: "#878787", fontSize: 13, fontWeight: "600" }}>Items: <Text allowFontScaling={false}  style={{ color: "#2b2b2b", fontSize: 12, fontWeight: "600", flex: 1 }}>{products}</Text></Text>

            </View>



            <View style={{ marginTop: 15 }}>
                <Text allowFontScaling={false}  style={{ color: "#878787", fontSize: 12, fontWeight: "600" }}>Pickup Address</Text>

                <View style={{ flexDirection: "row", marginTop: 8, alignItems: 'center' }}>

                    <Entypo name="location-pin" style={{ fontSize: 22, marginBottom: 0, color: "#E84340", marginLeft: -5 }} />

                    <Text allowFontScaling={false}  style={{ color: "#2b2b2b", fontSize: 12, fontWeight: "600", marginLeft: 5, flex: 1 }}>{order?.vendor_details.vendor.address}</Text>

                </View>

            </View>




            <View style={{ marginTop: 15 }}>
                <Text allowFontScaling={false}  style={{ color: "#878787", fontSize: 12, fontWeight: "600" }}>Delivery Address</Text>

                <View style={{ flexDirection: "row", marginTop: 8, alignItems: 'center' }}>

                    <Entypo name="location-pin" style={{ fontSize: 22, marginBottom: 0, color: "#E84340", marginLeft: -5 }} />

                    <Text allowFontScaling={false}  style={{ color: "#2b2b2b", fontSize: 12, fontWeight: "600", marginLeft: 5, flex: 1 }}>{customerFullAddress}</Text>

                </View>

            </View>


            <View style={{ borderWidth: 0.8, borderColor: "#d1d1d1", marginTop: 10 }} />


            <View style={styles.paymentContainer}>

                <View>
                    <Text allowFontScaling={false}  style={{ color: "#878787", fontSize: 10, fontWeight: "600" }}>Payment Mode</Text>

                    <Text allowFontScaling={false}  style={{ color: "#5c5c5c", fontWeight: '700', fontSize: 14, marginTop: 2 }}>{order?.payment_method?.name}</Text>
                </View>


                <View>
                    <Text allowFontScaling={false}  style={{ color: "#878787", fontSize: 10, fontWeight: "600" }}>Payment Status</Text>

                    <Text allowFontScaling={false}  style={{ color: "#5c5c5c", fontWeight: '700', fontSize: 14, marginTop: 2 }}>{order?.payment_status}</Text>
                </View>


                <View>
                    <Text allowFontScaling={false}  style={{ color: "#878787", fontSize: 10, fontWeight: "600" }}>Total Amount</Text>

                    <Text allowFontScaling={false}  style={{ color: "#5c5c5c", fontWeight: '700', fontSize: 14, marginTop: 2, }}>Rs {order?.total_payble_amount}</Text>
                </View>


            </View>


            <View style={{ borderWidth: 0.8, borderColor: "#d1d1d1", marginTop: 10 }} />


            <View style={styles.orderFooter}>

                <Text allowFontScaling={false}  style={{ color: "#878787", fontSize: 10, fontWeight: "600", }}>Approximately: <Text allowFontScaling={false}  style={{ color: "#5c5c5c" }}>{order?.distance.toFixed(2)} Km</Text></Text>

                {
                    orderType == "New Orders" ?


                        <View style={{ flexDirection: "row" }}>


                            <TouchableOpacity onPress={() => acceptHandler(order?.order_id)} style={[styles.buttonStyling, { marginRight: 10, backgroundColor: "#01B075" }]}>

                                <Text allowFontScaling={false}  style={{ color: "#ffffff", fontSize: 12, fontWeight: "600" }}>Accept</Text>

                            </TouchableOpacity>



                            <TouchableOpacity onPress={() => rejectHandler(order?.order_id)} style={[styles.buttonStyling, { backgroundColor: "#E84340" }]}>

                                <Text allowFontScaling={false}  style={{ color: "#ffffff", fontSize: 12, fontWeight: "600" }}>Reject</Text>

                            </TouchableOpacity>


                        </View>

                        // : orderType == "Active Orders" ?

                        //     <>
                        //         <TouchableOpacity onPress={() => Alert.alert("NAVIAGTE ME")} style={[styles.buttonStyling, { backgroundColor: "#327ba8" }]}>

                        //             <Text allowFontScaling={false}  style={{ color: "#ffffff", fontSize: 12, fontWeight: "600" }}>Navigate</Text>

                        //         </TouchableOpacity>

                        //     </>
                            : null

                }

            </View>


            <View style={{ borderWidth: 0.8, borderColor: "#d1d1d1", marginTop: 10 }} />


            <View style={styles.orderFooter}>

                <Text allowFontScaling={false}  style={{ color: "#878787", fontSize: 10, fontWeight: "600", }}>Order Status: <Text allowFontScaling={false}  style={{ color: "#5c5c5c" }}>{order?.order_status}</Text></Text>

                {
                    orderType == "Active Orders" ?


                        <TouchableOpacity
                            onPress={() => {
                                if (order?.order_status == "Accepted") {
                                    updateOrderStatus(order?.order_id, "Picked Up", "", "")
                                }
                                else if (order?.order_status == "Picked Up") {
                                    setDeliveryModalVisible(true)
                                }

                            }}
                            style={[styles.buttonStyling, { backgroundColor: "#299ec2", width: 100 }]}>

                            <Text allowFontScaling={false}  style={{ color: "#ffffff", fontSize: 12, fontWeight: "600" }}>Update Status</Text>

                        </TouchableOpacity>

                        : null
                }

            </View>



            <OrderStatusModal deliveryModalVisible={deliveryModalVisible} setDeliveryModalVisible={setDeliveryModalVisible} paymentStatus={order?.payment_status} orderId={order?.order_id} updateApi={updateOrderStatus} />

        </View>


    )
}

export default OrderLayout

const styles = StyleSheet.create({

    orderContainer: {
        borderWidth: 0,
        marginVertical: 20,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        backgroundColor: "white",
        elevation: 8
    },

    orderHeader: {
        borderWidth: 0,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },


    paymentContainer: {
        borderWidth: 0,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },

    orderFooter: {
        borderWidth: 0,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },

    buttonStyling: {
        // marginTop: 10,
        width: 80,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }


})
