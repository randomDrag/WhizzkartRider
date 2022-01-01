import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'


import BottomSheet from 'reanimated-bottom-sheet';

import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';



const PhotoBottomSheet = (props) => {

    const {bs, fall, imageHandler} = props
    


    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(image => {
                console.log("Image Recieved: ", image);

                RNFS.readFile(image.path, 'base64')
                    .then(res => {
                        // console.log("ImageRecieved-----  ", res);

                        bs.current.snapTo(1)

                        imageHandler(res)

                    })
                    .catch((err) => console.log("Err! ", err))

            })
            .catch((err) => console.log("Exception caught: ", err))

    }


    const choosePhotoFromLibrary = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
            .then(image => {
                console.log("Image Recieved: ", image);

                RNFS.readFile(image.path, 'base64')
                    .then(res => {
                        // console.log("ImageRecieved-----  ", res);

                        bs.current.snapTo(1)

                        imageHandler(res)


                    })
                    .catch((err) => console.log("Err! ", err))

            })
            .catch((err) => {
                console.log("Exception caught! ", err)
            })
    }



    const renderImageInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text allowFontScaling={false}  style={styles.panelTitle}>Upload Photo</Text>
                <Text allowFontScaling={false}  style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
                <Text allowFontScaling={false}  style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                <Text allowFontScaling={false}  style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}
                // onPress = {() => Alert.alert("KssdadsdKJK")}    
            >
                <Text allowFontScaling={false}  style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity> 
        </View>
    );


    const renderHeader = () => {
        return(

            <View style={styles.header}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle} />
                </View>
            </View>
        )
    };

    return (
       
         
        <BottomSheet
            ref={bs}
            snapPoints={[330, 0]}
            renderContent={renderImageInner}
            renderHeader={renderHeader}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
        />

    )
}




export default PhotoBottomSheet

const styles = StyleSheet.create({

    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    panelHeader: {
        alignItems: 'center',
    },
    
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },


    // Bottom sheet inner
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },

    
    panelTitle: {
        fontSize: 27,
        height: 35,
        color: "black"
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#EC505E',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },


})
