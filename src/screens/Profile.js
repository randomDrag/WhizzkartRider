import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'

import ImageView from "react-native-image-viewing";
import { LOGOUT, selectActiveUser } from '../Redux/userSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import axiosBaseUrl from '../../axiosBaseUrl';
import { env } from '../../env';

const Profile = ({ navigation }) => {


    const dispatch = useDispatch()

    const [imageVisible, setImageVisible] = useState(false);


    const [images, setImages] = useState([{ uri: "https://www.vegcorb.com/home/img/icon.png" }])

    const profile = useSelector(selectActiveUser)
    // console.log("PROFILE>> ", profile)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])



    useEffect(() => {

        getRating()

    }, [])



    const [avgRating, setAvgRating] = useState(0.0)
    const [ratingCount, setRatingCount1] = useState({
        "r1": 0,
        "r2": 0,
        "r3": 0,
        "r4": 0,
        "r5": 0
    })
    const [totalCount, setTotalCount] = useState(1)
    const [reviews, setReviews] = useState([])

    const [dataPresent, setDataPresent] = useState([])

    const getRating = () => {

        axiosBaseUrl.get("getDeliveryBoyRating")
            .then((res) => {
                console.log("SUCEES WHILE FETCHING RATING ", res.data)
                if (res.data.data_present) {
                    setAvgRating(res.data.data.average)
                    setRatingCount1(res.data.data.count)
                    setTotalCount(res.data.data.total_count)
                    setReviews(res.data.data.rating)

                    setDataPresent(true)
                }
                else {
                    setDataPresent(false)
                }

            })
            .catch((err) => {
                console.log("ERR WHILE FETCHING RATING in profile screen ", err)
            })

    }

    const logoutHandler = async () => {
        try {
            await AsyncStorage.removeItem("userToken")

            dispatch(LOGOUT()) // for userSlice

            axiosBaseUrl.post('logout')
                .then((res) => {
                    console.log("USER logged out ")
                })
                .catch((err) => console.log("Err while logging out: ", err))


        }
        catch (error) {
            console.log("ERROR!! ", error)
        }
    }

    const viewImage = (imageUrl) => {

        // console.log("https://c949-122-160-47-222.ngrok.io/files" + imageUrl)
        const imagesArray = [

            {
                uri: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg"
            },

            {
                uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
            },
            {
                uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
            },
        ];

        let temp = [{ uri: env.imageBaseUrl + imageUrl }]

        // let temp1 = []

        // imagesArray.map((x) => {
        //     console.log(x)
        //     temp1.push({ uri: x.uri })

        // })

        setImages(temp)

        setTimeout(() => {
            setImageVisible(true)

        }, 500)

    }



    return (
        <View style={{
            flex: 1,
            backgroundColor: "white"

        }}>

            <StatusBar barStyle="light-content" />


            <ImageView
                images={images}
                imageIndex={0}
                visible={imageVisible}
                onRequestClose={() => setImageVisible(false)}
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

                    <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 17, color: "#ffffff" }}>Profile</Text>

                </View>
            </View>







            <ScrollView style={{ borderWidth: 0, paddingHorizontal: 20 }} contentContainerStyle={{ flexGrow: 1 }}>


                <View style={{
                    borderWidth: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20

                }}>

                    <Avatar
                        rounded
                        // source={require("../../assests/userAvatar.png")}
                        source={profile?.details?.profile_image ? { uri: env.imageBaseUrl + profile?.details?.profile_image } : require("../../assests/userAvatar.png")}
                        // source={{uri: "https://283e-122-160-47-222.ngrok.io/uploads/deliveryBoy/6198f8fbf0632.jpg"}}
                        size={65}
                    />

                    <Text allowFontScaling={false} style={{ color: "#5c5c5c", fontWeight: '700', fontSize: 16, marginTop: 10 }}>{profile.name}</Text>

                    {/* <TouchableOpacity style={{ padding: 10 }}>
                        <Text allowFontScaling={false}  style={{ color: "#878787", fontSize: 12, fontWeight: "600" }}>Edit Profile</Text>

                    </TouchableOpacity> */}

                </View>


                <View style={{ borderWidth: 0.8, borderColor: "#d1d1d1", marginTop: 20 }} />



                <View style={styles.boxContainer}>

                    <Text allowFontScaling={false} style={{ fontWeight: "600", fontSize: 13, color: "black" }}>Account Info</Text>


                    <View style={styles.infoContainer}>


                        <Image
                            source={require("../../assests/ic_person_24px.png")}
                            style={{ width: 20, height: 20, }}

                        />

                        <View style={{
                            marginLeft: 20
                        }}>
                            <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 12, color: "black" }}>Email</Text>

                            <Text allowFontScaling={false} style={{ marginTop: 4, fontSize: 12, color: "#474747" }}>{profile.email}</Text>
                        </View>

                    </View>



                    <View style={styles.infoContainer}>


                        <Image
                            source={require("../../assests/ic_call.png")}
                            style={{ width: 20, height: 20, }}

                        />

                        <View style={{
                            marginLeft: 20
                        }}>
                            <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 12, color: "black" }}>Contact</Text>

                            <Text allowFontScaling={false} style={{ marginTop: 4, fontSize: 12, color: "#474747" }}>{profile.mobile}</Text>
                        </View>

                    </View>



                    <View style={styles.infoContainer}>


                        <Image
                            source={require("../../assests/ic_home_24px.png")}
                            style={{ width: 20, height: 20, }}

                        />

                        <View style={{
                            marginLeft: 20
                        }}>
                            <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 12, color: "black" }}>Address</Text>

                            <Text allowFontScaling={false} style={{ marginTop: 4, fontSize: 12, color: "#474747" }}>{ typeof profile?.details?.address == 'undefined' ? null : profile?.details?.address}</Text>
                        </View>

                    </View>




                    <View style={styles.infoContainer}>


                        <Image
                            source={require("../../assests/ic_schedule_24px.png")}
                            style={{ width: 20, height: 20, }}

                        />

                        <View style={{
                            marginLeft: 20
                        }}>
                            <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 12, color: "black" }}>Work Type</Text>

                            <Text allowFontScaling={false} style={{ marginTop: 4, fontSize: 12, color: "#474747" }}>{profile?.details?.work_type} ({profile?.details?.working_hours} hours)</Text>
                        </View>

                    </View>


                </View>






                <View style={styles.boxContainer}>

                    <Text allowFontScaling={false} style={{ fontWeight: "600", fontSize: 13, color: "black" }}>Uploaded Documents</Text>




                    <View style={styles.documnetContainer}>
                        <Text allowFontScaling={false} style={{ letterSpacing: 0.8, color: "black", fontSize: 12, marginBottom: 2, marginRight: 20, flex: 1 }}>Aadhar Card Front </Text>

                        <TouchableOpacity
                            onPress={() => {
                                viewImage(profile?.details?.aadhar_front_image)

                            }}
                            style={styles.uploadingButton}

                        >
                            <Text allowFontScaling={false} style={{ fontSize: 12, color: "black" }}>View</Text>

                        </TouchableOpacity>

                    </View>



                    <View style={styles.documnetContainer}>
                        <Text allowFontScaling={false} style={{ letterSpacing: 0.8, color: "black", fontSize: 12, marginBottom: 2, marginRight: 20, flex: 1 }}>Aadhar Card Back </Text>

                        <TouchableOpacity
                            onPress={() => {
                                viewImage(profile?.details?.aadhar_back_image)

                            }}
                            style={styles.uploadingButton}

                        >
                            <Text allowFontScaling={false} style={{ fontSize: 12, color: "black" }}>View</Text>

                        </TouchableOpacity>

                    </View>




                    <View style={styles.documnetContainer}>
                        <Text allowFontScaling={false} style={{ letterSpacing: 0.8, color: "black", fontSize: 12, marginBottom: 2, marginRight: 20, flex: 1 }}>PAN Card </Text>

                        <TouchableOpacity
                            onPress={() => {
                                viewImage(profile?.details?.pan_card_image)

                            }}
                            style={styles.uploadingButton}

                        >
                            <Text allowFontScaling={false} style={{ fontSize: 12, color: "black" }}>View</Text>

                        </TouchableOpacity>


                    </View>



                    <View style={styles.documnetContainer}>
                        <Text allowFontScaling={false} style={{ letterSpacing: 0.8, color: "black", fontSize: 12, marginBottom: 2, marginRight: 20, flex: 1 }}>Bank Pass Book </Text>

                        <TouchableOpacity
                            onPress={() => {
                                viewImage(profile?.details?.pass_book)

                            }}
                            style={styles.uploadingButton}

                        >
                            <Text allowFontScaling={false} style={{ fontSize: 12, color: "black" }}>View</Text>

                        </TouchableOpacity>


                    </View>




                    <View style={styles.documnetContainer}>
                        <Text allowFontScaling={false} style={{ letterSpacing: 0.8, color: "black", fontSize: 12, marginBottom: 2, marginRight: 20, flex: 1 }}>Cancelled Cheque</Text>

                        <TouchableOpacity
                            onPress={() => {
                                viewImage(profile?.details?.cancelled_cheque)

                            }}

                            style={styles.uploadingButton}

                        >
                            <Text allowFontScaling={false} style={{ fontSize: 12, color: "black" }}>View</Text>

                        </TouchableOpacity>


                    </View>




                    <View style={styles.documnetContainer}>
                        <Text allowFontScaling={false} style={{ letterSpacing: 0.8, color: "black", fontSize: 12, marginBottom: 2, marginRight: 20, flex: 1 }}>Bike RC</Text>

                        <TouchableOpacity
                            onPress={() => {
                                viewImage(profile?.details?.bike_rc)

                            }}
                            style={styles.uploadingButton}

                        >
                            <Text allowFontScaling={false} style={{ fontSize: 12, color: "black" }}>View</Text>

                        </TouchableOpacity>


                    </View>




                    <View style={styles.documnetContainer}>
                        <Text allowFontScaling={false} style={{ letterSpacing: 0.8, color: "black", fontSize: 12, marginBottom: 2, marginRight: 20, flex: 1 }}>Driving Licence</Text>

                        <TouchableOpacity
                            onPress={() => {
                                viewImage(profile?.details?.driving_licence)

                            }}
                            style={styles.uploadingButton}
                        >
                            <Text allowFontScaling={false} style={{ fontSize: 12, color: "black" }}>View</Text>

                        </TouchableOpacity>


                    </View>


                </View>





                <View style={styles.boxContainer}>

                    <Text allowFontScaling={false} style={{ fontWeight: "600", fontSize: 13, color: "black" }}>Delivery Rates</Text>


                    <TouchableOpacity
                        onPress={() => navigation.navigate("StaticWeb", {
                            name: "Delivery Charges",
                            apiFiller: "delivery_charge"
                        })}
                        style={[styles.infoContainer, { marginTop: 25 }]}>


                        <Image
                            source={require("../../assests/rupee-indian.png")}
                            style={{ width: 8, height: 15, marginLeft: 8, tintColor: "#FF3C36" }}

                        />

                        <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 13, marginLeft: 20, color: "black" }}>View Charges Pdf</Text>


                    </TouchableOpacity>

                </View>



                {/* Terms */}
                <View style={styles.boxContainer}>

                    <Text allowFontScaling={false} style={{ fontWeight: "600", fontSize: 13, color: "black" }}>Privacy & Security</Text>


                    <TouchableOpacity
                        onPress={() => navigation.navigate("StaticWeb", {
                            name: "About Us",
                            apiFiller: "about/app/delivery"
                        })}
                        style={[styles.infoContainer, { marginTop: 25 }]}>


                        <Image
                            source={require("../../assests/about.png")}
                            style={{ width: 8, height: 20, marginLeft: 8 }}

                        />

                        <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 13, marginLeft: 24, color: "black" }}>About Us</Text>


                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => navigation.navigate("StaticWeb", {
                            name: "Terms & Condition",
                            apiFiller: "term-condition/app/delivery"
                        })}
                        style={[styles.infoContainer, { marginTop: 25 }]}>


                        <Image
                            source={require("../../assests/terms.png")}
                            style={{ width: 20, height: 20, }}

                        />

                        <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 13, marginLeft: 20, color: "black" }}>Terms & Conditions</Text>


                    </TouchableOpacity>



                    {/* 


                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL("https://www.google.com/maps/place/2471+Hudson+Lane+,+GTB+Nagar+New+Delhi+-+110009")
                        }}

                        style={[styles.infoContainer, { marginTop: 25 }]}>


                        <Image
                            source={require("../../assests/ic_call.png")}
                            style={{ width: 20, height: 20, }}

                        />

                        <Text allowFontScaling={false}  style={{ fontWeight: "500", fontSize: 13, marginLeft: 20, color: "black" }}>Check Vendors</Text>

                    </TouchableOpacity>
 */}


                    <TouchableOpacity
                        onPress={() => navigation.navigate("StaticWeb", {
                            name: "Privacy Policy",
                            apiFiller: "privacy-policy/app/delivery"
                        })}

                        style={[styles.infoContainer, { marginTop: 25 }]}>


                        <Image
                            source={require("../../assests/privacy.png")}
                            style={{ width: 20, height: 20, }}

                        />
                        <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 13, marginLeft: 20, color: "black" }}>Privacy Policy</Text>


                    </TouchableOpacity>




                    <TouchableOpacity
                        onPress={() => navigation.navigate("ReviewsAndRating", {
                            avgRating: avgRating,
                            ratingCount: ratingCount,
                            totalCount: totalCount,
                            reviews: reviews,
                            dataPresent: dataPresent
                        })}

                        style={[styles.infoContainer, { marginTop: 25 }]}>


                        <Image
                            source={require("../../assests/pencil.png")}
                            style={{ width: 20, height: 20, }}

                        />

                        <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 13, marginLeft: 20, color: "black" }}>Reviews And Ratings</Text>



                    </TouchableOpacity>




                    <TouchableOpacity
                        onPress={logoutHandler}
                        style={[styles.infoContainer, { marginTop: 25 }]}>


                        <Image
                            source={require("../../assests/logout.png")}
                            style={{ width: 20, height: 20, }}

                        />
                        <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 13, marginLeft: 20, color: "black" }}>Logout</Text>



                    </TouchableOpacity>




                </View>



                <View style={{ height: 80 }} />


            </ScrollView>



        </View>
    )
}

export default Profile

const styles = StyleSheet.create({



    boxContainer: {
        borderWidth: 0,
        marginTop: 20,
        width: "100%",
        alignSelf: "center",

        backgroundColor: "white",
        borderRadius: 5,
        padding: 20,

        shadowColor: '#4f4f4f',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },


    infoContainer: {
        borderWidth: 0,
        marginTop: 20,
        flexDirection: "row",
        alignItems: 'center'

    },


    documnetContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 20

    },


    uploadingButton: {
        borderWidth: 0.4,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: "#ededed",

    },



})
