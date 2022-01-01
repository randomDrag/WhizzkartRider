import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, ImageBackground, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';



import { ProgressBar, Colors } from 'react-native-paper';
import axiosBaseUrl from '../../../axiosBaseUrl';
import moment from 'moment';
import { env } from '../../../env';


const ReviewAndRatings = ({ navigation, route }) => {

    const { avgRating,
        ratingCount,
        totalCount,
        reviews, dataPresent } = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])



    // const [avgRating, setAvgRating] = useState(0.0)
    // const [ratingCount, setRatingCount1] = useState({
    //     "_1": 0,
    //     "_2": 0,
    //     "_3": 0,
    //     "_4": 0,
    //     "_5": 0
    // })
    // const [totalCount, setTotalCount] = useState(1)
    // const [reviews, setReviews] = useState([])


    useEffect(() => {


        // axiosBaseUrl.get("getDeliveryBoyRating")
        //     .then((res) => {
        //         // console.log("SUCEES WHILE FETCHING RATING ", res.data.data)
        //         setAvgRating(res.data.data.average)
        //         setRatingCount1(res.data.data.count)
        //         setTotalCount(res.data.data.total_count)
        //         setReviews(res.data.data.rating)

        //     })
        //     .catch((err) => {
        //         console.log("ERR WHILE FETCHING RATING ", err)
        //     })


    }, [])


    // console.log(ratingCount1)

    // const ratingCount = {
    //     one: 0,
    //     two: 0,
    //     three: 1,
    //     four: 1,
    //     five: 2
    // }

    const total = 3

    return (

        <View style={{
            flex: 1,
            backgroundColor: "white"

        }}>

            <StatusBar barStyle="light-content" />




            <View style={{
                borderWidth: 0,
                paddingTop: Platform.OS == "ios" ? 40 : 10,
                backgroundColor: "#E84340",

            }}>



                <View style={{
                    borderWidth: 0,
                    padding: 10,
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    alignItems: 'center'
                }}>


                    <TouchableOpacity

                        onPress={() => navigation.navigate(("Profile"))}

                    >
                        <Entypo name="chevron-left" style={{ fontSize: 30, color: "white", marginRight: 10 }} />
                    </TouchableOpacity>

                    <Text allowFontScaling={false}  style={{ fontWeight: "500", fontSize: 17, color: "#ffffff" }}>Reviews and Rating</Text>

                </View>
            </View>




            {
                dataPresent ?
                    <>




                        <View style={{
                            borderWidth: 0,
                            width: "100%",
                            marginTop: 20,
                            flexDirection: "row",
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            alignItems: 'center',


                        }}>

                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                                <Text allowFontScaling={false}  style={{ color: "#424242", fontSize: 55, fontWeight: "700" }}>{avgRating.toFixed(1)}</Text>
                                <Text allowFontScaling={false}  style={{ color: "#707070", fontWeight: "600", fontSize: 15, marginTop: 5 }}>out of 5</Text>

                            </View>


                            <View style={{
                                // alignItems: 'center',
                                justifyContent: 'center',
                                // borderWidth: 1,
                                flex: 1,
                                marginLeft: 15

                            }}>



                                <View style={{
                                    flexDirection: "row",
                                    borderWidth: 0,
                                    // alignSelf: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <View style={{ flexDirection: "row", borderWidth: 0 }}>
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />

                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                    </View>
                                    <View style={{ borderWidth: 0, flex: 1, marginLeft: 10 }}>
                                        <ProgressBar progress={ratingCount?.r5 / totalCount} color={"black"} />
                                    </View>
                                </View>




                                <View style={{
                                    flexDirection: "row",
                                    borderWidth: 0,
                                    // alignSelf: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <View style={{ flexDirection: "row", borderWidth: 0 }}>
                                        <Entypo name="star" style={{ fontSize: 13, color: "#ffffff", }} />

                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                    </View>
                                    <View style={{ borderWidth: 0, flex: 1, marginLeft: 10 }}>
                                        <ProgressBar progress={ratingCount?.r4 / totalCount} color={"black"} />
                                    </View>
                                </View>




                                <View style={{
                                    flexDirection: "row",
                                    borderWidth: 0,
                                    // alignSelf: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <View style={{ flexDirection: "row", borderWidth: 0 }}>
                                        <Entypo name="star" style={{ fontSize: 13, color: "#ffffff", }} />

                                        <Entypo name="star" style={{ fontSize: 13, color: "#ffffff", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                    </View>
                                    <View style={{ borderWidth: 0, flex: 1, marginLeft: 10 }}>
                                        <ProgressBar progress={ratingCount?.r3 / totalCount} color={"black"} />
                                    </View>
                                </View>




                                <View style={{
                                    flexDirection: "row",
                                    borderWidth: 0,
                                    // alignSelf: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <View style={{ flexDirection: "row", borderWidth: 0 }}>
                                        <Entypo name="star" style={{ fontSize: 13, color: "#ffffff", }} />

                                        <Entypo name="star" style={{ fontSize: 13, color: "#ffffff", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#ffffff", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                    </View>
                                    <View style={{ borderWidth: 0, flex: 1, marginLeft: 10 }}>
                                        <ProgressBar progress={ratingCount?.r2 / totalCount} color={"black"} />
                                    </View>
                                </View>




                                <View style={{
                                    flexDirection: "row",
                                    borderWidth: 0,
                                    // alignSelf: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <View style={{ flexDirection: "row", borderWidth: 0 }}>
                                        <Entypo name="star" style={{ fontSize: 13, color: "#ffffff", }} />

                                        <Entypo name="star" style={{ fontSize: 13, color: "#ffffff", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#ffffff", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#ffffff", }} />
                                        <Entypo name="star" style={{ fontSize: 13, color: "#424242", }} />
                                    </View>
                                    <View style={{ borderWidth: 0, flex: 1, marginLeft: 10 }}>
                                        <ProgressBar progress={ratingCount?.r1 / totalCount} color={"black"} />
                                    </View>
                                </View>

                                <View style={{ borderWidth: 0, alignSelf: "flex-end", marginTop: 2 }}>
                                    <Text allowFontScaling={false}  style={{ color: "#707070", fontWeight: "600" }}>{totalCount} Rating</Text>
                                </View>

                            </View>

                        </View>

                        <View style={{ borderWidth: 0.5, borderColor: "#c4c4c4", marginTop: 10, width: "100%" }} />




                        <ScrollView style={{ width: "100%", height: "100%", borderWidth: 0, paddingHorizontal: 20, marginTop: 0, }}
                            showsVerticalScrollIndicator={false}
                        >



                            {
                                reviews.map((x, index) => {

                                    return (

                                        <View key={index} style={styles.reviewContainer}>

                                            <View style={{ alignItems: 'center', flexDirection: "row", }}>

                                                <Avatar
                                                    rounded
                                                    // source={{ uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" }}
                                                    source={x?.customer?.customer_details?.profile_image ? { uri: env.imageBaseUrl + x?.customer?.customer_details?.profile_image } : require("../../../assests/userAvatar.png")}

                                                    size={55}
                                                />

                                                <View style={{
                                                    borderWidth: 0,
                                                    marginLeft: 10,
                                                    flex: 1
                                                }}>
                                                    <Text allowFontScaling={false}  style={{ color: "black"}}>{x.customer.name}</Text>


                                                    <View style={styles.starsConatiner}>

                                                        {

                                                            Array(parseInt(x.rating)).fill().map((_, i) => {

                                                                return (

                                                                    <Image
                                                                        key={i}
                                                                        source={require('../../../assests/starFilled.png')}
                                                                        style={{ marginRight: 6, width: 16, height: 16 }}
                                                                    />
                                                                )
                                                            })
                                                        }

                                                        {
                                                            Array(parseInt(5 - x.rating)).fill().map((_, i) => {

                                                                return (
                                                                    <Image
                                                                        key={i}
                                                                        source={require('../../../assests/starOutline.png')}
                                                                        style={{ marginRight: 6, width: 16, height: 16 }}
                                                                    />
                                                                )
                                                            })

                                                        }

                                                        <Text allowFontScaling={false}  style={{ fontWeight: "600", color: "#525252", fontSize: 15, marginLeft: 5 }}>{x.rating}.0</Text>

                                                    </View>

                                                    <View style={styles.timeStamp}>
                                                        <Text allowFontScaling={false}  style={{ fontWeight: "600", color: "#525252", fontSize: 15, marginLeft: 5, }}>{moment(x.created_at).format("DD/MM/YYYY")}</Text>
                                                    </View>


                                                </View>

                                            </View>

                                            <View style={{
                                                borderWidth: 0,
                                                marginTop: 10,
                                            }}>
                                                <Text allowFontScaling={false} >
                                                    {x.reviews}
                                                </Text>

                                            </View>

                                        </View>


                                    )
                                })
                            }


                            <View style={{height: 80}} />


                        </ScrollView>

                    </>

                    :

                    <View style={{
                        borderWidth: 0,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Text allowFontScaling={false}  style={{ fontSize: 18, fontWeight: "600" , color: "black"}}>No Review Yet</Text>
                    </View>
            }

        </View>
    )
}

export default ReviewAndRatings

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white"

    },

    bgImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: "100%",
        height: "100%",
    },


    logo: {
        width: 280,
        height: 75,
        marginBottom: 20
    },


    infoConatiner: {
        marginTop: 20,
        borderWidth: 0,
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#EDEDED",
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 2,
    },


    reviewContainer: {
        borderWidth: 0,
        padding: 10,
        backgroundColor: "#EDEDED",
        borderRadius: 15,
        marginTop: 25
    },


    starsConatiner: {
        flexDirection: "row",
        marginTop: 4,
        alignItems: 'center'
    },


    timeStamp: {
        position: "absolute",
        bottom: 0,
        right: 0
    },





})

