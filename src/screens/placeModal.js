import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {
//   FONT_POPP,
//   GOOGLE_SEARCH_API_MAPS,
//   BORDER_TEST,
//   COLOR,
//   FONT_SIZE,
// } from '../../constant';
import {connect} from 'react-redux';
import {GoogleMapsSearch} from '../actions';
import Modal from 'react-native-modal';
// import MapAddress from './MapAddress';
const {height, width} = Dimensions.get('screen');


export const FONT_SIZE ={
    XS : 10,
    S : 12,
    M : 14,
    L : 16,
    XL : 18
    
}

export const FONT_POPP = {
    REGULAR : 'Poppins-Regular',
    MEDIUM : 'Poppins-Medium',
    BOLD : 'Poppins-Bold'
}

export const BORDER_TEST = {
    borderColor : 'red',
    borderWidth : 2

}

export const COLOR = {
    RED : '#E84341',
    BLACK : "#000",
    WHITE : "#FFF",
    GREY : "#CDCDCD",
    BLUE : '#588094'
}



class GooglePlacesInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchkeyword: '',
    };
  }
  search = async text => {
    this.setState({searchkeyword: text});

    this.props.GoogleMapsSearch(this.state.searchkeyword, () => {
      this.props.searched(true);
    });
  };

  render() {
    return (
      <View style={Styles().SearchBarConatiner}>
        <View style={Styles().SearchBar}>
          <Ionicons
            name="search"
            size={30}
            style={{textAlignVertical: 'center'}}
            color={COLOR.GREY}
          />
          <TextInput
            placeholder="Search for your location..."
            placeholderTextColor ={COLOR.GREY}
            style={{
              fontFamily: FONT_POPP.MEDIUM,
              flex: 1,
              fontSize: FONT_SIZE.L,
              marginHorizontal: 6,
              textAlignVertical: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              color:COLOR.BLACK
            }}
            onChangeText={text => this.search(text)}
            value={this.state.searchkeyword}
          />
        </View>
      </View>
    );
  }
}

const CustomAutoCompleteGoogle = connect(null, {GoogleMapsSearch})(
  GooglePlacesInput,
);

const SearchCard = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          margin: 6,
          borderBottomWidth: 0.2,
          borderColor: '#8f8f8f',
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Ionicons
          style={{
            textAlignVertical: 'auto',
            paddingHorizontal: 15,
          }}
          name={'ios-location-outline'}
          size={30}
          color={'#E84341'}
        />
        <View style={{flex: 1}}>
          <Text allowFontScaling={false} 
            style={{
              fontFamily: FONT_POPP.BOLD,
              fontSize: FONT_SIZE.M,
              color : COLOR.BLACK
            }}>
            {props.title}
          </Text>
          <Text allowFontScaling={false} 
            style={{
              fontFamily: FONT_POPP.REGULAR,
              fontSize: FONT_SIZE.S,
              color : COLOR.BLACK
            }}>
            {props.body}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

class AddAddressMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isKeyboardOpen: false,
      display: false,
    };
  }


  currentLocation = () => {
    return (
      <TouchableOpacity
        // onPress={() =>
        //   this.props.navigation.navigate('AddAddressMap', {
        //     placeId: this.props.locId[0].place_id,
        //   })
        // }
        >
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            justifyContent: 'center',
          }}>
          <Ionicons
            style={{textAlignVertical: 'auto'}}
            name={'ios-location-outline'}
            size={22}
            color={COLOR.RED}
          />
          <Text allowFontScaling={false} 
            style={{
              fontFamily: FONT_POPP.MEDIUM,
              textAlignVertical: 'bottom',
              fontSize: FONT_SIZE.L,
              color: COLOR.RED
            }}>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  Header() {
    return (
      <View style={Styles().container1}>
        <View style={Styles().settingIcon}>
          <TouchableOpacity
            onPress={this.props.onPress}>
            <Ionicons
              name="arrow-back"
              style={{
                textAlignVertical: 'center',
                textAlign: 'center',
              }}
              size={24}
              color={COLOR.BLACK}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false} 
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              marginHorizontal: 5,
              fontFamily: FONT_POPP.BOLD,
              fontSize: FONT_SIZE.M,
              color : COLOR.BLACK
            }}>
            Search
          </Text>
        </View>
      </View>
    );
  }

  

  render() {
    let k = this.state.isKeyboardOpen;
    const {SearchData} = this.props;

    return (
      <SafeAreaView style={Styles().RootContainer}>

        <View style={Styles(k).Container}>
        {this.Header()}
          <Text allowFontScaling={false} 
            style={{
              fontFamily: FONT_POPP.MEDIUM,
              marginHorizontal: 10,
              marginTop: 25,
              fontSize: FONT_SIZE.M,
              color: COLOR.RED,
            }}>
            Search location
          </Text>
          <CustomAutoCompleteGoogle
            searched={v => this.setState({display: v})}
          />
          {this.currentLocation()}
          {this.state.display ? (
            <FlatList
              data={SearchData}
              renderItem={item => (
                <SearchCard
                  body={item.item.description}
                  title={item.item.structured_formatting.main_text}
                  onPress={() =>this.props.SearchCard(item.item.place_id)}
                />
              )}
            />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

const Styles = keyboard =>
  StyleSheet.create({
    RootContainer: {
      marginTop: 30,
      height: '100%',
      backgroundColor: COLOR.WHITE,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    Container: {
      width: '100%',
      height: '100%',
      marginVertical: 30,
      backgroundColor: '#FFF',
    },
    SearchBarConatiner: {
      padding: 5,
      // marginTop : 15
      marginHorizontal : 10
    },
    SearchBar: {
      elevation: 5,
      backgroundColor: '#FFF',
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 15,
      paddingHorizontal: 20,
      marginVertical: 7,
      // backgroundColor : '#F5F5F5',
      paddingVertical: 5,
      //borderColor: '#E84341',
      // borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container1: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 30,
      paddingHorizontal: 5,
      backgroundColor: '#FFFFFF',
    },
    settingIcon: {
      marginHorizontal: 5,
      marginTop: 10,
      padding: 5,
      marginRight: 20,
      flex: 0,
      flexDirection: 'row',
    },
  });

const mapStateToProps = state => {
  return {SearchData: state.GoogleMapsPlaces, locId: state.GoogleRevGeocode};
};

export default connect(mapStateToProps, {})(AddAddressMap);
