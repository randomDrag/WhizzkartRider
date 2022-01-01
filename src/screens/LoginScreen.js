import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'

import { Avatar } from 'react-native-elements'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import Animated from 'react-native-reanimated';
import PhotoBottomSheet from '../components/PhotoBottomSheet';

const LoginScreen = ({ navigation }) => {



    var bs = React.createRef();

    var fall = new Animated.Value(1);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    /*

PAN Card
Aadhar Card
Bank pass book
Cancelled cheque
Bike R.C
Driving licence

    */

    const [name, setName] = useState('')
    const [password, setName] = useState('')
   
    
    const [errors, setErrors] = useState(["Pan Card field is required", "Driving Licence field is required"])
    // const [errors, setErrors] = useState([])


    const imageHandler = (data) => {

        if (uploadingFor == "aadhar") {
            setAadharFront(data)
        }
        else if (uploadingFor == "pan") {
            setPanCard(data)
        }

        else if (uploadingFor == "passBook") {
            setPassBook(data)
        }
        else if (uploadingFor == "cheque") {
            setCancelledCheque(data)
        }
        else if (uploadingFor == "rc") {
            setBikeRc(data)
        }
        else if (uploadingFor == "licence") {
            setDrivingLicence(data)
        }

        else if (uploadingFor == "profile") {
            setProfile(data)
        }
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "none"} style={{
            flex: 1,
            backgroundColor: "white"
        }}>

            <PhotoBottomSheet bs={bs} fall={fall} imageHandler={imageHandler} />

            <SafeAreaView style={{
                flex: 1,
            }}>


                <Text allowFontScaling={false}  style={{ marginTop: 20, alignSelf: 'center', fontWeight: "700", fontSize: 20, color: "#E84340" }}>Register Yourself</Text>


                <ScrollView style={{marginTop: 20}}>
                    <View style={{
                        // borderWidth:1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "100%"
                    }}>


                        <Image
                            style={{ width: 165, height: 120, alignItems: 'center', alignContent: 'center', marginTop: 10 }}
                            source={
                                require("../../assests/logo.png")
                            }
                        />
                    </View>


                    <View style={{
                        borderWidth: 0,
                        marginTop: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>



                        <View style={styles.inputBox}>


                            <Image
                                source={require("../../assests/ic_person_24px.png")}
                                style={{ width: 20, height: 20, }}

                            />

                            <TextInput allowFontScaling={false} 
                                placeholder="Name*"
                                autoCapitalize="none"
                                onChangeText={(val) => setName(val)}
                                value={name}

                                placeholderTextColor="#9e9e9e"
                                style={styles.textInpurStyle}

                            />

                        </View>




                        <View style={styles.inputBox}>


                            <Image
                                source={require("../../assests/ic_person_24px.png")}
                                style={{ width: 20, height: 20, }}

                            />

                            <TextInput allowFontScaling={false} 
                                placeholder="Name*"
                                autoCapitalize="none"
                                onChangeText={(val) => setName(val)}
                                value={name}

                                placeholderTextColor="#9e9e9e"
                                style={styles.textInpurStyle}

                            />

                        </View>


                        <View style={styles.inputBox}>


                            <Image
                                source={require("../../assests/ic_markunread_24px.png")}
                                style={{ width: 18, height: 18, }}

                            />

                            <TextInput allowFontScaling={false} 
                                placeholder="Email Address*"
                                autoCapitalize="none"
                                onChangeText={(val) => setEmail(val)}
                                value={email}
                                placeholderTextColor="#9e9e9e"

                                style={styles.textInpurStyle}

                            />

                        </View>


                        <View style={styles.inputBox}>


                            <Image
                                source={require("../../assests/ic_call.png")}
                                style={{ width: 18, height: 18, }}

                            />

                            <TextInput allowFontScaling={false} 
                                placeholder="Contact*"
                                autoCapitalize="none"
                                onChangeText={(val) => setMobile(val)}
                                value={mobile}
                                placeholderTextColor="#9e9e9e"

                                style={styles.textInpurStyle}

                            />

                        </View>




                        <View style={styles.inputBox}>


                            <Image
                                source={require("../../assests/ic_home_24px.png")}
                                style={{ width: 18, height: 18, }}

                            />

                            <TextInput allowFontScaling={false} 
                                placeholder="Address*"
                                autoCapitalize="none"
                                onChangeText={(val) => setAddress(val)}
                                value={address}
                                placeholderTextColor="#9e9e9e"

                                style={styles.textInpurStyle}

                            />

                        </View>



                        <View style={styles.inputBox}>


                            <Image
                                source={require("../../assests/ic_place_24px.png")}
                                style={{ width: 15, height: 20, }}

                            />

                            <TextInput allowFontScaling={false} 
                                placeholder="Pincode*"
                                autoCapitalize="none"
                                onChangeText={(val) => setPincode(val)}
                                value={pincode}
                                placeholderTextColor="#9e9e9e"

                                style={styles.textInpurStyle}

                            />

                        </View>





                        <View style={styles.inputBox}>


                            <Image
                                source={require("../../assests/ic_directions_bike_24px.png")}
                                style={{ width: 18, height: 20, }}

                            />

                            <TextInput allowFontScaling={false} 
                                placeholder="Service Area(Place where you will deliver)*"
                                autoCapitalize="none"
                                onChangeText={(val) => setServiceArea(val)}
                                value={serviceArea}
                                placeholderTextColor="#9e9e9e"

                                style={styles.textInpurStyle}

                            />

                        </View>



                        <View style={styles.inputBox}>


                            <Image
                                source={require("../../assests/ic_schedule_24px.png")}
                                style={{ width: 18, height: 18, }}

                            />

                            <TextInput allowFontScaling={false} 
                                placeholder="Working Hours*"
                                autoCapitalize="none"
                                onChangeText={(val) => setNoOfWorkingHours(val)}
                                value={noOfWorkingHours}
                                placeholderTextColor="#9e9e9e"

                                style={styles.textInpurStyle}

                            />

                        </View>


                    </View>



                    <View style={styles.uploadContainer}>

                        <Text allowFontScaling={false}  style={{fontWeight: "600", fontSize: 16}}>Upload Documents</Text>



                        <View style={styles.documnetContainer}>
                            <Text allowFontScaling={false}  style={{ letterSpacing: 0.8, color: "black", fontSize: 15, marginBottom: 2, marginRight: 20, flex: 1 }}>Profile Picture* </Text>

                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setUploadingFor("profile")
                                        bs.current.snapTo(0)
                                    }}
                                    style={styles.uploadingButton}
                                >
                                    <Text allowFontScaling={false}  style={{ fontSize: 13 }}>Upload</Text>

                                </TouchableOpacity>
                                {
                                    profile ?
                                        <MaterialCommunityIcons name="check-bold" style={{ fontSize: 30, marginBottom: 0, color: "green", marginLeft: 12 }} />
                                        : null
                                }

                            </View>



                        </View>



                        <View style={styles.documnetContainer}>
                            <Text allowFontScaling={false}  style={{ letterSpacing: 0.8, color: "black", fontSize: 15, marginBottom: 2, marginRight: 20, flex: 1 }}>Aadhar Card* </Text>

                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setUploadingFor("aadhar")
                                        bs.current.snapTo(0)
                                    }}               
                                    style={styles.uploadingButton}
                        
                                >
                                    <Text allowFontScaling={false}  style={{ fontSize: 13 }}>Upload</Text>

                                </TouchableOpacity>
                                {
                                    aadaharFront ?
                                        <MaterialCommunityIcons name="check-bold" style={{ fontSize: 30, marginBottom: 0, color: "green", marginLeft: 12 }} />
                                        : null
                                }

                            </View>

                        </View>




                        <View style={styles.documnetContainer}>
                            <Text allowFontScaling={false}  style={{ letterSpacing: 0.8, color: "black", fontSize: 15, marginBottom: 2, marginRight: 20, flex: 1 }}>Bank Pass Book* </Text>

                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setUploadingFor("passBook")
                                        bs.current.snapTo(0)
                                    }}
                                    style={styles.uploadingButton}

                                    >
                                    <Text allowFontScaling={false}  style={{ fontSize: 13 }}>Upload</Text>

                                </TouchableOpacity>
                                {
                                    passBook ?
                                        <MaterialCommunityIcons name="check-bold" style={{ fontSize: 30, marginBottom: 0, color: "green", marginLeft: 12 }} />
                                        : null
                                }

                            </View>

                        </View>




                        <View style={styles.documnetContainer}>
                            <Text allowFontScaling={false}  style={{ letterSpacing: 0.8, color: "black", fontSize: 15, marginBottom: 2, marginRight: 20, flex: 1 }}>Cancelled Cheque*</Text>

                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setUploadingFor("aadhar")
                                        bs.current.snapTo(0)
                                    }}
                                   
                                    style={styles.uploadingButton}

                                    >
                                    <Text allowFontScaling={false}  style={{ fontSize: 13 }}>Upload</Text>

                                </TouchableOpacity>
                                {
                                    cancelledCheque ?
                                        <MaterialCommunityIcons name="check-bold" style={{ fontSize: 30, marginBottom: 0, color: "green", marginLeft: 12 }} />
                                        : null
                                }

                            </View>

                        </View>




                        <View style={styles.documnetContainer}>
                            <Text allowFontScaling={false}  style={{ letterSpacing: 0.8, color: "black", fontSize: 15, marginBottom: 2, marginRight: 20, flex: 1 }}>Bike RC*</Text>

                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setBikeRc("rc")
                                        bs.current.snapTo(0)
                                    }}
                                    style={styles.uploadingButton}

                                    >
                                    <Text allowFontScaling={false}  style={{ fontSize: 13 }}>Upload</Text>

                                </TouchableOpacity>
                                {
                                    bikeRc ?
                                        <MaterialCommunityIcons name="check-bold" style={{ fontSize: 30, marginBottom: 0, color: "green", marginLeft: 12 }} />
                                        : null
                                }

                            </View>

                        </View>




                        <View style={styles.documnetContainer}>
                            <Text allowFontScaling={false}  style={{ letterSpacing: 0.8, color: "black", fontSize: 15, marginBottom: 2, marginRight: 20, flex: 1 }}>Driving Licence*</Text>

                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setBikeRc("licence")
                                        bs.current.snapTo(0)
                                    }}
                                    style={styles.uploadingButton}
                                    >
                                    <Text allowFontScaling={false}  style={{ fontSize: 13 }}>Upload</Text>

                                </TouchableOpacity>
                                {
                                    drivingLicence ?
                                        <MaterialCommunityIcons name="check-bold" style={{ fontSize: 30, marginBottom: 0, color: "green", marginLeft: 12 }} />
                                        : null
                                }

                            </View>

                        </View>


                    </View>


                    {
                        errors.length > 0 ?


                            <Text allowFontScaling={false}  style={{ marginTop: 15, alignSelf: 'center', width: "80%", color: "#E84340", fontSize: 12 }}>
                                {
                                    errors.map((x, index) => {
                                        return (
                                            <Text allowFontScaling={false}  key={index}>{x}{index == errors.length - 1 ? "" : ", "}</Text>
                                        )
                                    })
                                }

                            </Text>


                            : null
                    }


                    <TouchableOpacity
                        // onPress={registedHandler}
                        style={{ width: "85%", marginTop: errors.length > 0 ? 15 : 35, alignSelf: "center" }}
                    >
                        <View style={styles.loginButton}>
                            <Text allowFontScaling={false}  style={{ fontSize: 18, fontWeight: "500", color: "white" }}> Register  </Text>
                        </View>
                    </TouchableOpacity>



                    <View style={{ height: 50 }} />

                </ScrollView>

            </SafeAreaView>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({


    header: {
        // borderWidth: 4, 
        flex: 1,
        width: "100%",
        borderColor: "orange",
        paddingHorizontal: 20,
        justifyContent: 'center'

    },

    userInfo: {
        // borderWidth: 1,
        borderColor: "white",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between"

    },


    inputBox: {
        borderWidth: 0,
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: "85%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',

        shadowColor: '#4f4f4f',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 5,
        marginBottom: 25


    },


    uploadContainer: {
        borderWidth: 0,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: "85%",
        alignSelf: "center",

        backgroundColor: "white",
        borderRadius: 5,
        padding: 20,

        shadowColor: '#4f4f4f',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },


    textInpurStyle: {
        borderWidth: 0,
        flex: 1,
        marginLeft: 20,
        padding: 5,
        fontSize: 16
    },

    documnetContainer: {
        flexDirection: "row",
        marginTop: 8,
        alignItems: 'center',
        marginTop: 25

    },


    uploadingButton : {
        borderWidth: 0.4,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor: "#ededed",

    },

    loginButton: {
        justifyContent: 'center',
        alignItems: "center",
        padding: 10,
        backgroundColor: "#E84340",
        borderRadius: 5,
    },


})
