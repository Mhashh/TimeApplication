import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabbar from './routes/Tabs'

export default function App() {
   
return (
  <NavigationContainer>
  <Tabbar/>
</NavigationContainer>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   },
});