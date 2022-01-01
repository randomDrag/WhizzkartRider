import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, Platform, StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, StatusBar } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ActiveOrders, DeliveredOrders, NewOrders, OrderLayout } from '../screenComponents/homeComponents';

// import { Switch } from 'react-native-paper';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import axiosBaseUrl from '../../axiosBaseUrl';


const Home = ({ navigation }) => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const [orderType, setOrderType] = useState('newOrders')

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);



    const [selectedDate, setSelectedDate] = useState(moment().toString())
    const [selectedDisplayDate, setSelectedDisplayDate] = useState(moment().format("DD MMM YYYY").toString())
    const [datePickerVisible, setDatePickerVisible] = useState(false);


    const [newOrders, setNewOrders] = useState([])
    const [activeOrders, setActiveOrders] = useState([])
    const [deliveredOrders, setDeliveredOrders] = useState([])




    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    useEffect(() => {

        getNew()

        getActive()

        getDelivered()

    }, [])

    const getNew = () => {
        //sds
        axiosBaseUrl.get("getNewOrderDeliveryBoy")
            .then((res) => {
                // console.log("RES>>  ", res.data.data)
                setNewOrders(res.data.data)
            })
            .catch((err) => console.log("Err ", err))

    }


    const getActive = () => {

        axiosBaseUrl.get("getAcceptOrderDeliveryBoy")
            .then((res) => {
                // console.log("RES>>  ", res.data.data)
                setActiveOrders(res.data.data)
            })
            .catch((err) => console.log("Err ", err))

    }



    const getDelivered = () => {

        axiosBaseUrl.get("getDelivredOrderDeliveryBoy")
            .then((res) => {
                // console.log("RES>>  ", res.data.data)
                setDeliveredOrders(res.data.data)
            })
            .catch((err) => console.log("Err While fetching delivered orders", err))

    }
    
    const handleConfirm = (time) => {

        console.log(time)

        const timePicked = new Date(time)
        const formattedTime = moment(timePicked).format("DD MMM YYYY")
        const filterDate = moment(timePicked).format("YYYY-MM-DD")

        console.log(formattedTime)

        setSelectedDate(time)
        setSelectedDisplayDate(formattedTime)
        setDatePickerVisible(false)
        

        axiosBaseUrl.get(`getDelivredOrderDeliveryBoy?filter_date=${filterDate}`)
        .then((res) => {
            // console.log("RES>> ", res.data)
            setDeliveredOrders(res.data.data)
        })

    };




    return (
        <View style={{
            flex: 1,
            backgroundColor: "white"

        }}>

            <StatusBar barStyle="light-content" />


            <DateTimePickerModal
                isVisible={datePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisible(false)}
            />

            <View style={{
                borderWidth: 0,
                paddingTop: Platform.OS == "ios" ? 40 : 10,
                backgroundColor: "#E84340",

            }}>

                <View style={{
                    borderWidth: 0,
                    padding: 10,
                    paddingHorizontal: 20
                }}>

                    <Text allowFontScaling={false}  style={{ fontWeight: "500", fontSize: 17, color: "#ffffff" }}>Delivery</Text>

                </View>
            </View>


            <View style={{
                borderWidth: 0,
                marginTop: 10,
                padding: 10,
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center'
            }}>


                <TouchableOpacity
                    onPress={() => {
                        setDatePickerVisible(true)
                    }}

                    style={{
                        borderBottomWidth: 1.5,
                        padding: 5,
                        alignItems: 'center',
                        flexDirection: "row",
                        borderColor: "#E84340",
                        paddingBottom: 6
                    }}>

                    <FontAwesome name="calendar" style={{ fontSize: 14, marginBottom: 0, color: "#E84340", marginRight: 12 }} />

                    <Text allowFontScaling={false}  style={{ fontSize: 12, color: "#5c5c5c" }}>{selectedDisplayDate}</Text>

                </TouchableOpacity>

             
{/* 
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text allowFontScaling={false}  style={{ marginRight: 6, fontSize: 13 }}>Are you available?</Text>

                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch}
                        style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.6 }] }}

                        trackColor={{ false: '#E84340', true: '#E84340' }}
                    />
                </View> */}

            </View>




            <View style={{
                marginTop: 10,
                padding: 10,
                paddingHorizontal: 20,
            }}>

                <View style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    borderColor: "#dedede",
                    flexDirection: "row",
                }}>

                    <TouchableOpacity
                        onPress={() => setOrderType("newOrders")}
                        style={{
                            borderBottomWidth: orderType == "newOrders" ? 1.5 : 0,
                            padding: 10,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: "#E84340",

                        }}>
                        <Text allowFontScaling={false}  style={{ color: "black"}}>New Orders</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => setOrderType("activeOrders")}

                        style={{
                            borderBottomWidth: orderType == "activeOrders" ? 1.5 : 0,
                            padding: 10,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: "#E84340",

                        }}>
                        <Text allowFontScaling={false}  style={{ color: "black"}}>Active Orders</Text>
                    </TouchableOpacity>




                    <TouchableOpacity
                        onPress={() => setOrderType("delivered")}

                        style={{
                            borderBottomWidth: orderType == "delivered" ? 1.5 : 0,
                            padding: 10,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: "#E84340",

                        }}>
                        <Text allowFontScaling={false}  style={{ color: "black"}}>Delivered</Text>
                    </TouchableOpacity>



                </View>


            </View>




            <ScrollView style={{ borderWidth: 0, paddingHorizontal: 20 }} contentContainerStyle={{ flexGrow: 1 }}>

                {/* apiCaller */}
                {
                    orderType == "newOrders" ? <NewOrders newOrders={newOrders}  getActive={getActive} getNew={getNew} getDelivered={getDelivered} />

                        : orderType == "activeOrders" ? <ActiveOrders activeOrders={activeOrders} getActive={getActive}  getNew={getNew} getDelivered={getDelivered} />

                            : orderType == "delivered" ? <DeliveredOrders deliveredOrders={deliveredOrders} getActive={getActive} getNew={getNew} getDelivered={getDelivered} />

                                : null


                }
                

                <View style={{ height: 80 }} />


            </ScrollView>



        </View>
    )
}

export default Home

const styles = StyleSheet.create({



})
