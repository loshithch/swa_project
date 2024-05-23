import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors,Images} from '../../constants'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'



const SplashScreen = () => {
    const navigation =useNavigation();

   
  return (
    <View style={styles.container}>
    <Image source={Images.SPLASH_SCREEN_IMAGE}/>
    <TouchableOpacity style={styles.scanButton}
    // onPress={()=>openCamera()}
    onPress={()=>navigation.navigate('ScanScreen')}
    >
    <Image source={Images.SCAN_ICON}/>
<Text style={styles.buttonText}>TAP TO SCAN</Text>
    </TouchableOpacity>
    <View style={{marginTop:responsiveHeight(10)}}>
        <Text>v 0.0.1</Text>
    </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.PRIMARY_COLOR,
        justifyContent:'center',
        alignItems:'center'
    },
    scanButton:{
        height:responsiveHeight(5),
        width:responsiveWidth(35),
        backgroundColor:Colors.BUTTON_COLOR,
        borderRadius:responsiveHeight(6),
        marginTop:responsiveHeight(10),
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    buttonText:{
    color:Colors.WHITE_COLOR,
    fontSize:responsiveFontSize(1.5),
    fontWeight:'600',
    marginLeft:responsiveHeight(1)

    }

})