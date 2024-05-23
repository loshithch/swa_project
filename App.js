import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import RootStack from './src/navigation/RootStack'
import NetInfo from "@react-native-community/netinfo"
import EmptyScreen from './src/shared/EmptyScreen'

const App = () => {
  const [isConnected, setIsConnected] = useState(true); // this state use for check internet connectivity
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setIsLoading(false); // Set isLoading to false when connectivity is checked
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    // You can return a loading indicator here if you want
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return isConnected  ? <RootStack /> : <EmptyScreen />;
}

  // return (
  //  <RootStack/>
  // )


export default App

const styles = StyleSheet.create({})