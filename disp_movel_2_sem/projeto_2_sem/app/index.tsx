import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TextInput, Button, Alert, Keyboard, Platform } from 'react-native';
import * as Locatiion from 'expo-location';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.buscaContainer}>
        <TextInput style={styles.input} placeholder='Digite o endereço'  />
        <button/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buscaContainer: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 10,
    right: 10,
    backgroundColor: "White",
  },
  input:{
    flex: 1,
    marginRight: 10
  }
});
