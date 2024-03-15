import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ScanScreen from '../screen/scanScreen/ScanScreen'
import SplashScreen from '../screen/splashScreen/SplashScreen'

const RootStack = () => {
    const stack =createStackNavigator();
  return (
    <NavigationContainer>
    <stack.Navigator 
    screenOptions={{headerShown:false}}
    initialRouteName='SplashScreen'>
    <stack.Screen name='SplashScreen' component={SplashScreen}/>
    <stack.Screen name='ScanScreen' component={ScanScreen}/>

    </stack.Navigator>
   </NavigationContainer>
  )
}

export default RootStack

const styles = StyleSheet.create({})