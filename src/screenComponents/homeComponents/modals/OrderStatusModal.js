import React, { useState } from 'react'
import { Alert, Modal, Switch } from 'react-native'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { CustomRadioButton } from '../../../components';

const OrderStatusModal = (props) => {


    const { deliveryModalVisible, setDeliveryModalVisible, paymentStatus, updateApi, orderId } = props


    const [reason, setReason] = useState('')

    const [deliverySatatus, setDeliveryStatus] = useState('')


    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const [errors, setErrors] = useState([])


    const updateHandler = () => {



        if (deliverySatatus == "Delivered" && paymentStatus == "Pending" && isSwitchOn == false) {
            setErrors((prevError) => ["Please collect payment"])
        }
        else  if (deliverySatatus == "Not Delivered" && reason == "") {
            setErrors((prevError) => ["Please write the reason why you are not able to deliver the order"])
        }
        else if (deliverySatatus == "Delivered" && isSwitchOn == true ) {
            updateApi(orderId, "Delivered", "Received", "")
            setErrors([])
            setDeliveryModalVisible(false)
        }
        else if (deliverySatatus == "Not Delivered"  && reason != "") {
            updateApi(orderId, "Not Delivered", "", reason)
            setErrors([])
            setDeliveryModalVisible(false)
        }

    }


    return (

        <Modal
            animationType="fade"
            visible={deliveryModalVisible}
            transparent={true}
        >

            <View behavior="height" style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: 'center', alignItems: 'center' }}>


                <Animatable.View
                    animation="slideInDown"
                    style={{

                        width: "85%",
                        backgroundColor: "white",
                        borderRadius: 10,
                        marginTop: -50,
                    }}>


                    <ScrollView style={{ borderColor: "orange", width: "100%", borderWidth: 0, padding: 20, }}
                        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                    >

                        <Text allowFontScaling={false}  style={{ fontSize: 18, fontWeight: "500", marginBottom: 20, color: "black" }}>Update Delivery Status</Text>



                        <CustomRadioButton
                            options={[{ title: "Delivered", value: "Delivered" }, { title: "Not Delivered", value: "Not Delivered" }]}
                            selectedValue={deliverySatatus}
                            selectedHandler={setDeliveryStatus}
                            containerStyle={{ marginTop: 0 }}
                        />

                        {
                            deliverySatatus == "Not Delivered"
                                ?
                                <TextInput allowFontScaling={false} 
                                    style={{
                                        backgroundColor: "white",
                                        padding: 10,
                                        borderWidth: 0.8,
                                        // borderColor: "orange",
                                        color: "black",

                                        width: "80%",
                                        borderRadius: 5,
                                        marginTop: 10,
                                        borderColor: "gray",
                                        maxHeight: 100
                                    }}
                                    placeholder="Reason*"
                                    placeholderTextColor="gray"
                                    value={reason}
                                    multiline={true}
                                    onChangeText={async (val) => { setReason(val) }}
                                />

                                :

                                deliverySatatus == "Delivered" && paymentStatus == "Pending" ?

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 10
                                    }}>
                                        <Text allowFontScaling={false}  style={{ marginRight: 6, fontSize: 14, fontWeight: "600", }}>Payment Done?</Text>

                                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch}
                                            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}

                                            trackColor={{ false: '#E84340', true: '#E84340' }}
                                        />
                                    </View>

                                    : null
                        }


                        {
                            errors.length > 0 ?
                                errors.map((x, index) => {
                                    return (
                                        <Text allowFontScaling={false}  key={index} style={{ fontSize: 11, zIndex: 200, color: "red", marginTop: 5 }}>{x}</Text>
                                    )
                                })

                                : null
                        }


                        <View style={{
                            // borderWidth: 1,
                            width: "80%",
                            marginTop: 15,
                            flexDirection: "row",
                        }}>

                            <TouchableOpacity style={{ flex: 1, height: 40 }}
                                onPress={() => {
                                    setDeliveryModalVisible(false)

                                    setReason("")
                                    setDeliveryStatus("")
                                    setIsSwitchOn(false)
                                }}
                            >

                                <View style={styles.cancelButton}>

                                    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                        <Text allowFontScaling={false}  style={{ marginLeft: 10, fontSize: 15, fontWeight: "700", color: "#474747" }}>Cancel</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>



                            <TouchableOpacity style={{ flex: 1, height: 40 }}
                                onPress={updateHandler}
                            >

                                <View style={styles.updateButton}>
                                    <Text allowFontScaling={false}  style={{ color: "white", fontWeight: "700", fontSize: 13 }}>Update Status</Text>
                                </View>

                            </TouchableOpacity>

                        </View>

                        {/* <View style={{ height: 40 }} /> */}

                    </ScrollView>

                </Animatable.View>

            </View>

        </Modal>


    )
}

export default OrderStatusModal

const styles = StyleSheet.create({

    cancelButton: {
        flex: 1,
        // borderWidth:1,
        marginRight: 5,

        backgroundColor: "#e8e8e8",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    updateButton: {
        flex: 1,
        // borderWidth:1,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#5cad10",
        borderRadius: 5
        //  8fa5b5
    },

    pickerContainer: {
        borderWidth: 0,
        width: "100%",
        // flexDirection: "row",,
        justifyContent: 'center',
        alignItems: 'center'

    },
    slotPickerContainer: {
        borderWidth: 0,
        flexDirection: "row",
        alignItems: "center",
    },


    slotPickerButton: {
        // borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: "gray",
        borderRadius: 5,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e8e8e8"
    },




})
