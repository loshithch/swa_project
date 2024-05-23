import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors, Images } from "../constants";
import {
    responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const EmptyScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={Images.CONNECTION_LOST_IMAGE}
        style={styles.connectionImage}
      />
      <Text style={styles.connectionText}>Please check your Internet Connection!</Text>
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  connectionImage: {
    height: responsiveHeight(30),
    width: responsiveWidth(55),
    tintColor:Colors.BUTTON_COLOR
  },
  connectionText:{
    color:'red',
    fontSize:responsiveFontSize(1.8)
  }
});
