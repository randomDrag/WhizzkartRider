import React, {useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Linking,
  Alert,
  FlatList,
} from 'react-native';

import {Avatar} from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import Animated from 'react-native-reanimated';
import PhotoBottomSheet from '../components/PhotoBottomSheet';
import axiosBaseUrl from '../../axiosBaseUrl';
import {CustomRadioButton} from '../components';

import Toast from 'react-native-simple-toast';
import {env} from '../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Searchbar} from 'react-native-paper';
import Modal from 'react-native-modal';
import {COLOR} from './placeModal';
import axios from 'axios';
import validator from 'validator';

const GOOGLE_SEARCH_API_MAPS = 'AIzaSyDW_ogI4GsjE9rRg8oXity0_SyTwkmXk6Y';

const RegisterScreen = ({navigation}) => {
  var bs = React.createRef();

  var fall = new Animated.Value(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [noOfWorkingHours, setNoOfWorkingHours] = useState('');
  const [workType, setWorktype] = useState('');

  const [profile, setProfile] = useState('');
  const [aadaharFront, setAadharFront] = useState('');
  const [aadaharBack, setAadaharBack] = useState('');
  const [pancard, setPanCard] = useState('');
  const [passBook, setPassBook] = useState('');
  const [cancelledCheque, setCancelledCheque] = useState('');
  const [bikeRc, setBikeRc] = useState('');
  const [drivingLicence, setDrivingLicence] = useState('');

  const [uploadingFor, setUploadingFor] = useState('');

  const [showPassword, setShowPassword] = useState(true);

  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(false);

  const [tcAccepted, setTcAccepted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [GoogleResult, setGoogleResult] = React.useState([]);
  const [latlng, setlatlng] = React.useState('');
  const [isplaceModelon, setPlaceModel] = useState(false);

  const onChangeSearch = async query => {
    setSearchQuery(query);
    await axios
      .post(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_SEARCH_API_MAPS}&input=${searchQuery}&components=country:IN`,
      )
      .then(data => {
        console.log(data.data.predictions);
        setGoogleResult(data.data.predictions);
      });
  };

  const imageHandler = data => {
    if (uploadingFor == 'aadharFront') {
      // console.log(data)
      setAadharFront(data);
    } else if (uploadingFor == 'aadharBack') {
      setAadaharBack(data);
    } else if (uploadingFor == 'pan') {
      setPanCard(data);
    } else if (uploadingFor == 'passBook') {
      setPassBook(data);
    } else if (uploadingFor == 'cheque') {
      setCancelledCheque(data);
    } else if (uploadingFor == 'rc') {
      console.log('here we are');

      setBikeRc(data);
    } else if (uploadingFor == 'licence') {
      setDrivingLicence(data);
    } else if (uploadingFor == 'profile') {
      setProfile(data);
    }
  };

  const registerHAndler = async () => {
    const fcm = await AsyncStorage.getItem('fcmToken');
    let arr = [];
    setError(false);
    setErrors(false);

    setLoading(true);

    if (
      name == '' ||
      email == '' ||
      mobile == '' ||
      password == '' ||
      address == '' ||
      profile == '' ||
      aadaharFront == '' ||
      aadaharBack == '' ||
      pancard == '' ||
      passBook == '' ||
      bikeRc == '' ||
      drivingLicence == '' ||
      cancelledCheque == '' ||
      noOfWorkingHours == '' ||
      workType == '' ||
      pincode == ''||
      latlng == ''
    ) {
      setError(true);
      setLoading(false);
    } else if(!validator.isPostalCode(pincode ,'IN')){
arr.push('Invalid pincode entered')
      setErrors(arr)
      setError(true);
      setLoading(false);
    }else if(!validator.isMobilePhone(mobile , 'en-IN')){
      arr.push('Invalid mobile number found')
      setErrors(arr)
      setError(true);
      setLoading(false);
    }
    
    else {
      // Work type field is left
      const temp = {
        name: name,
        email: email,
        mobile: mobile,
        user_type: 3,
        password: password,
        address: address,
        fcm_token: fcm,
        lat : latlng?.lat,
        lng : latlng?.lng,
        delivery_boy: JSON.stringify({
          image: profile,
          aadahar_front: aadaharFront,
          aadahar_back: aadaharBack,
          pan_card: pancard,
          pass_book: passBook,
          bike_rc: bikeRc,
          driving_licence: drivingLicence,
          cancelled_cheque: cancelledCheque,
          working_hours: noOfWorkingHours,
         
          address: address,
          pincode: pincode,
          service_area: serviceArea,
          work_type: workType,
        }),
      };

      axiosBaseUrl
        .post('register', temp)
        .then(res => {
          console.log('Success while registering ', res.data);

          if (res.data.code == 406) {
            console.log(res.data.errors);

        
            let errorRecieved = res.data.errors;
            // {"email": ["The email has already been taken."], "mobile": ["The mobile field is required."], "name": ["The name field is required."], "password": ["The password field is required."]}
            errorRecieved?.email ? arr.push(errorRecieved.email) : null;
            errorRecieved?.name ? arr.push(errorRecieved.name) : null;
            errorRecieved?.mobile ? arr.push(errorRecieved.mobile) : null;
            errorRecieved?.password ? arr.push(errorRecieved.password) : null;

            setErrors(arr);
            setLoading(false);
          } else {
            navigation.navigate('Login');
            Toast.show(`Thanks for registering`, Toast.LONG);
          }
        })
        .catch(err => {
          console.log('ERR while registering ', err);
          setLoading(false);
        });
    }
  };

  const saveLatLong = async e => {
    await axios
      .post(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${e}&key=${GOOGLE_SEARCH_API_MAPS}`,
      )
      .then(data => {
        console.log(data.data?.result?.geometry?.location);

        setlatlng(data.data?.result?.geometry?.location);

        setPlaceModel(false);
      });
  };

  const placeSearchModel = () => {
    return (
      <Modal
        isVisible={isplaceModelon}
        style={{backgroundColor: COLOR.WHITE, margin: 0}}>
        <View
          backgroundColor={{
            backgroundColor: COLOR.WHITE,
           
            flex : 1
          }}>
           

           <Searchbar
            placeholder="Search Place"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{margin: 10 }}
          />
           
         
              
         
          <FlatList
            style={{marginVertical: 5}}
            data={GoogleResult}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => saveLatLong(item?.place_id)}
                  style={{
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderColor: COLOR.RED,
                    borderWidth: 0.5,
                    padding: 10,
                  }}>
                  <Text style={{color: COLOR.BLACK, fontWeight: '800'}}>
                    {item?.structured_formatting?.main_text}
                  </Text>
                  <Text style={{color: COLOR.BLACK}}>
                    {item?.structured_formatting?.secondary_text}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'none'}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {placeSearchModel()}

      <PhotoBottomSheet bs={bs} fall={fall} imageHandler={imageHandler} />

      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <Text
          allowFontScaling={false}
          style={{
            marginTop: 20,
            alignSelf: 'center',
            fontWeight: '700',
            fontSize: 20,
            color: '#E84340',
          }}>
          Register Yourself
        </Text>

        <ScrollView style={{marginTop: 20}}>
          <View
            style={{
              // borderWidth:1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              style={{
                width: 165,
                height: 120,
                alignItems: 'center',
                alignContent: 'center',
                marginTop: 10,
              }}
              source={require('../../assests/logo.png')}
            />
          </View>

          <View
            style={{
              borderWidth: 0,
              marginTop: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.inputBox}>
              <Image
                source={require('../../assests/ic_person_24px.png')}
                style={{width: 20, height: 20}}
              />

              <TextInput
                allowFontScaling={false}
                placeholder="Name*"
                autoCapitalize="none"
                onChangeText={val => setName(val)}
                value={name}
                placeholderTextColor="#9e9e9e"
                style={styles.textInpurStyle}
              />
            </View>

            <View style={styles.inputBox}>
              <Image
                source={require('../../assests/ic_markunread_24px.png')}
                style={{width: 18, height: 18}}
              />

              <TextInput
                allowFontScaling={false}
                placeholder="Email Address*"
                autoCapitalize="none"
                onChangeText={val => setEmail(val)}
                value={email}
                placeholderTextColor="#9e9e9e"
                style={styles.textInpurStyle}
              />
            </View>

            <View style={styles.inputBox}>
              <Image
                source={require('../../assests/ic_lock_24px.png')}
                style={{width: 16, height: 18}}
              />

              <TextInput
                allowFontScaling={false}
                placeholder="Password*"
                autoCapitalize="none"
                onChangeText={val => setPassword(val)}
                value={password}
                placeholderTextColor="#9e9e9e"
                secureTextEntry={showPassword}
                style={styles.textInpurStyle}
              />

              <TouchableOpacity
                style={{position: 'relative', right: 10}}
                onPress={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <Entypo
                    name="eye-with-line"
                    style={{fontSize: 22, color: '#ababab'}}
                  />
                ) : (
                  <Entypo name="eye" style={{fontSize: 24, color: '#ababab'}} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputBox}>
              <Image
                source={require('../../assests/ic_call.png')}
                style={{width: 18, height: 18}}
              />

              <TextInput
                allowFontScaling={false}
                placeholder="Contact*"
                autoCapitalize="none"
                onChangeText={val => setMobile(val)}
                value={mobile}
                placeholderTextColor="#9e9e9e"
                style={styles.textInpurStyle}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputBox}>
              <Image
                source={require('../../assests/ic_home_24px.png')}
                style={{width: 18, height: 18}}
              />

              <TextInput
                allowFontScaling={false}
                placeholder="Address*"
                autoCapitalize="none"
                onChangeText={val => setAddress(val)}
                value={address}
                placeholderTextColor="#9e9e9e"
                style={styles.textInpurStyle}
              />
            </View>

            <View style={styles.inputBox}>
              <Image
                source={require('../../assests/ic_place_24px.png')}
                style={{width: 15, height: 20}}
              />

              <TextInput
                allowFontScaling={false}
                placeholder="Pincode*"
                autoCapitalize="none"
                onChangeText={val => setPincode(val)}
                value={pincode}
                placeholderTextColor="#9e9e9e"
                style={styles.textInpurStyle}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputBox}>
              <Image
                source={require('../../assests/ic_directions_bike_24px.png')}
                style={{width: 18, height: 20}}
              />

              <TextInput
                allowFontScaling={false}
                placeholder="Service Area(Place where you will deliver)*"
                autoCapitalize="none"
                onChangeText={val => setServiceArea(val)}
                value={serviceArea}
                placeholderTextColor="#9e9e9e"
                style={styles.textInpurStyle}
              />
            </View>

            {/* 

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

                        </View> */}
          </View>

          <View style={styles.uploadContainer}>
            <Text
              allowFontScaling={false}
              style={{fontWeight: '600', fontSize: 16, color: 'black'}}>
              Work Information *
            </Text>

            <CustomRadioButton
              options={[
                {title: 'Part Time', value: 'Part Time'},
                {title: 'Full Time', value: 'Full Time'},
              ]}
              selectedValue={workType}
              selectedHandler={setWorktype}
              containerStyle={{marginTop: 10}}
            />

            <TextInput
              allowFontScaling={false}
              placeholder="Working Hours*"
              autoCapitalize="none"
              onChangeText={val => setNoOfWorkingHours(val)}
              value={noOfWorkingHours}
              keyboardType="number-pad"
              placeholderTextColor="#9e9e9e"
              style={{
                marginTop: 10,
                borderBottomWidth: 1,
                width: '80%',
                padding: 5,
                fontSize: 16,
                color: 'black',
              }}
            />
          </View>

          <View style={styles.uploadContainer}>
            <Text
              allowFontScaling={false}
              style={{fontWeight: '600', fontSize: 16, color: 'black'}}>
              Upload Documents
            </Text>

            <View style={styles.documnetContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  letterSpacing: 0.8,
                  color: 'black',
                  fontSize: 15,
                  marginBottom: 2,
                  marginRight: 20,
                  flex: 1,
                }}>
                Profile Picture*{' '}
              </Text>

              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    setUploadingFor('profile');
                    bs.current.snapTo(0);
                  }}
                  style={styles.uploadingButton}>
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: 13, color: 'black'}}>
                    Upload
                  </Text>
                </TouchableOpacity>
                {profile ? (
                  <MaterialCommunityIcons
                    name="check-bold"
                    style={{
                      fontSize: 30,
                      marginBottom: 0,
                      color: 'green',
                      marginLeft: 12,
                    }}
                  />
                ) : null}
              </View>
            </View>

            <View style={styles.documnetContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  letterSpacing: 0.8,
                  color: 'black',
                  fontSize: 15,
                  marginBottom: 2,
                  marginRight: 20,
                  flex: 1,
                }}>
                Aadhar Card Front*{' '}
              </Text>

              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    setUploadingFor('aadharFront');
                    bs.current.snapTo(0);
                  }}
                  style={styles.uploadingButton}>
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: 13, color: 'black'}}>
                    Upload
                  </Text>
                </TouchableOpacity>
                {aadaharFront ? (
                  <MaterialCommunityIcons
                    name="check-bold"
                    style={{
                      fontSize: 30,
                      marginBottom: 0,
                      color: 'green',
                      marginLeft: 12,
                    }}
                  />
                ) : null}
              </View>
            </View>

            <View style={styles.documnetContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  letterSpacing: 0.8,
                  color: 'black',
                  fontSize: 15,
                  marginBottom: 2,
                  marginRight: 20,
                  flex: 1,
                }}>
                Aadhar Card Back*{' '}
              </Text>

              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    setUploadingFor('aadharBack');
                    bs.current.snapTo(0);
                  }}
                  style={styles.uploadingButton}>
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: 13, color: 'black'}}>
                    Upload
                  </Text>
                </TouchableOpacity>
                {aadaharBack ? (
                  <MaterialCommunityIcons
                    name="check-bold"
                    style={{
                      fontSize: 30,
                      marginBottom: 0,
                      color: 'green',
                      marginLeft: 12,
                    }}
                  />
                ) : null}
              </View>
            </View>

            <View style={styles.documnetContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  letterSpacing: 0.8,
                  color: 'black',
                  fontSize: 15,
                  marginBottom: 2,
                  marginRight: 20,
                  flex: 1,
                }}>
                PAN Card*{' '}
              </Text>

              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    setUploadingFor('pan');
                    bs.current.snapTo(0);
                  }}
                  style={styles.uploadingButton}>
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: 13, color: 'black'}}>
                    Upload
                  </Text>
                </TouchableOpacity>
                {pancard ? (
                  <MaterialCommunityIcons
                    name="check-bold"
                    style={{
                      fontSize: 30,
                      marginBottom: 0,
                      color: 'green',
                      marginLeft: 12,
                    }}
                  />
                ) : null}
              </View>
            </View>

            <View style={styles.documnetContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  letterSpacing: 0.8,
                  color: 'black',
                  fontSize: 15,
                  marginBottom: 2,
                  marginRight: 20,
                  flex: 1,
                }}>
                Bank Pass Book*{' '}
              </Text>

              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    setUploadingFor('passBook');
                    bs.current.snapTo(0);
                  }}
                  style={styles.uploadingButton}>
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: 13, color: 'black'}}>
                    Upload
                  </Text>
                </TouchableOpacity>
                {passBook ? (
                  <MaterialCommunityIcons
                    name="check-bold"
                    style={{
                      fontSize: 30,
                      marginBottom: 0,
                      color: 'green',
                      marginLeft: 12,
                    }}
                  />
                ) : null}
              </View>
            </View>

            <View style={styles.documnetContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  letterSpacing: 0.8,
                  color: 'black',
                  fontSize: 15,
                  marginBottom: 2,
                  marginRight: 20,
                  flex: 1,
                }}>
                Cancelled Cheque*
              </Text>

              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    setUploadingFor('cheque');
                    bs.current.snapTo(0);
                  }}
                  style={styles.uploadingButton}>
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: 13, color: 'black'}}>
                    Upload
                  </Text>
                </TouchableOpacity>
                {cancelledCheque ? (
                  <MaterialCommunityIcons
                    name="check-bold"
                    style={{
                      fontSize: 30,
                      marginBottom: 0,
                      color: 'green',
                      marginLeft: 12,
                    }}
                  />
                ) : null}
              </View>
            </View>

            <View style={styles.documnetContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  letterSpacing: 0.8,
                  color: 'black',
                  fontSize: 15,
                  marginBottom: 2,
                  marginRight: 20,
                  flex: 1,
                }}>
                Bike RC*
              </Text>

              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    setUploadingFor('rc');
                    bs.current.snapTo(0);
                  }}
                  style={styles.uploadingButton}>
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: 13, color: 'black'}}>
                    Upload
                  </Text>
                </TouchableOpacity>
                {bikeRc ? (
                  <MaterialCommunityIcons
                    name="check-bold"
                    style={{
                      fontSize: 30,
                      marginBottom: 0,
                      color: 'green',
                      marginLeft: 12,
                    }}
                  />
                ) : null}
              </View>
            </View>

            <View style={styles.documnetContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  letterSpacing: 0.8,
                  color: 'black',
                  fontSize: 15,
                  marginBottom: 2,
                  marginRight: 20,
                  flex: 1,
                }}>
                Driving Licence*
              </Text>

              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    setUploadingFor('licence');
                    bs.current.snapTo(0);
                  }}
                  style={styles.uploadingButton}>
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: 13, color: 'black'}}>
                    Upload
                  </Text>
                </TouchableOpacity>
                {drivingLicence ? (
                  <MaterialCommunityIcons
                    name="check-bold"
                    style={{
                      fontSize: 30,
                      marginBottom: 0,
                      color: 'green',
                      marginLeft: 12,
                    }}
                  />
                ) : null}
              </View>
            </View>

            <View style={styles.documnetContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  letterSpacing: 0.8,
                  color: 'black',
                  fontSize: 15,
                  marginBottom: 2,
                  marginRight: 20,
                  flex: 1,
                }}>
                working location*
              </Text>

              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    setPlaceModel(true);
                  }}
                  style={styles.uploadingButton}>
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: 13, color: 'black'}}>
                    add
                  </Text>
                </TouchableOpacity>
                {latlng ? (
                  <MaterialCommunityIcons
                    name="check-bold"
                    style={{
                      fontSize: 30,
                      marginBottom: 0,
                      color: 'green',
                      marginLeft: 12,
                    }}
                  />
                ) : null}
              </View>
            </View>
          </View>

          <View
            style={{
              borderWidth: 0,
              width: '85%',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => setTcAccepted(!tcAccepted)}
              activeOpacity={0.6}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                width: '80%',
              }}>
              <View
                style={{
                  borderWidth: 0.8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8,
                  height: 17,
                  width: 17,
                }}
                // onPress={() => setIsDefault(!isDefault)}
              >
                {tcAccepted ? (
                  <Entypo name="check" style={{fontSize: 16, color: 'green'}} />
                ) : null}
              </View>

              <Text
                allowFontScaling={false}
                style={{fontSize: 15, color: 'black'}}>
                Agree to all terms & condition
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('StaticWeb', {
                    name: 'Terms & Condition',
                    apiFiller: 'term-condition/app/delivery',
                  })
                }
                style={{
                  paddingHorizontal: 10,
                  borderWidth: 0,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    color: '#E84340',
                    fontWeight: '500',
                    textDecorationLine: 'underline',
                  }}>
                  Read
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {error ? (
            <Text
              allowFontScaling={false}
              style={{
                marginTop: 15,
                alignSelf: 'center',
                width: '80%',
                color: '#E84340',
                fontSize: 13,
                textAlign: 'center',
              }}>
              {' '}
              All Fields are Required*
            </Text>
          ) : null}

          {errors.length > 0 ? (
            <Text
              allowFontScaling={false}
              style={{
                marginTop: 15,
                alignSelf: 'center',
                width: '80%',
                color: '#E84340',
                fontSize: 12,
                justifyContent : 'center',
                textAlign: 'center'
              }}>
              {errors.map((x, index) => {
                return (
                  <Text allowFontScaling={false} key={index}>
                    {x}
                    {index == errors.length - 1 ? '' : ', '}
                  </Text>
                );
              })}
            </Text>
          ) : null}

          {loading ? (
            <View
              style={{
                borderWidth: 0,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 5,
                marginTop: error ? 15 : 35,
                width: '85%',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size="small" color="#E84340" />
            </View>
          ) : (
            <TouchableOpacity
              // disabled={true}
              onPress={() => {
                tcAccepted
                  ? registerHAndler()
                  : Alert.alert('Please agree to all terms & condition');
              }}
              style={{
                width: '85%',
                marginTop: error ? 15 : 35,
                alignSelf: 'center',
              }}>
              <View
                style={[
                  styles.loginButton,
                  {backgroundColor: tcAccepted ? '#E84340' : '#f59290'},
                ]}>
                <Text
                  allowFontScaling={false}
                  style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                  {' '}
                  Register{' '}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{marginTop: 20, borderWidth: 0, alignSelf: 'center'}}>
            <Text allowFontScaling={false} style={{color: '#333333'}}>
              Don't have an account?{' '}
              <Text
                allowFontScaling={false}
                style={{textDecorationLine: 'underline', fontWeight: '700'}}>
                Log In
              </Text>{' '}
            </Text>
          </TouchableOpacity>

          <View style={{height: 50}} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  header: {
    // borderWidth: 4,
    flex: 1,
    width: '100%',
    borderColor: 'orange',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  userInfo: {
    // borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputBox: {
    borderWidth: 0,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#4f4f4f',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 5,
    marginBottom: 25,
  },

  uploadContainer: {
    borderWidth: 0,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',

    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,

    shadowColor: '#4f4f4f',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },

  textInpurStyle: {
    borderWidth: 0,
    flex: 1,
    marginLeft: 20,
    padding: 5,
    fontSize: 16,
    color: 'black',
  },

  documnetContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    marginTop: 25,
  },

  uploadingButton: {
    borderWidth: 0.4,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: '#ededed',
  },

  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
});
