import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import NetInfo from '@react-native-community/netinfo';

export default function App() {
  // --- SEÇÃO 1: ACELERÔMETRO ---
  // É o estado que armazena e ataualiza os dados dos eixos x, y, e z
  const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });

  // Função que atualiza os dados do acelerômetro
  useEffect(() => {
    // addlistenae do accelerometer fica ouvindo os dados do acelerômetro do celular
    const subscription = Accelerometer.addListener(setAccelData);
    Accelerometer.setUpdateInterval(1000);
    return () => subscription.remove();
  }, []);

  const { x, y, z } = accelData;
  const backgroundColor = `rgb(${Math.abs(x * 255)}, ${Math.abs(y * 255)}, ${Math.abs(z * 255)})`;

  // --- SEÇÃO 2: CONECTIVIDADE ---
  const [connectionInfo, setConnectionInfo] = useState(null);
  const [myIpAddress, setMyIpAddress] = useState('Buscando...');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionInfo(state);
      if (state.type === 'wifi' && state.details.ipAddress) {
        setMyIpAddress(state.details.ipAddress);
      } else {
        setMyIpAddress('Conecte-se ao Wi-Fi');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        {/* Seção 1: Acelerômetro */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acelerômetro</Text>
          <View style={[styles.box, { backgroundColor }]}>
            <Text style={styles.boxText}>Incline o celular!</Text>
          </View>
          <Text>x: {x.toFixed(2)}, y: {y.toFixed(2)}, z: {z.toFixed(2)}</Text>
        </View>

        {/* Seção 2: Conectividade */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Conectividade</Text>
          {connectionInfo ? (
            <>
              <Text>Conectado: {connectionInfo.isConnected ? 'Sim' : 'Não'}</Text>
              <Text>Tipo: {connectionInfo.type}</Text>
              <Text style={styles.ipAddress}>Meu IP no Wi-Fi: {myIpAddress}</Text>
            </>
          ) : (
            <Text>Verificando conexão...</Text>
          )}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  box: {
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  ipAddress: {
    fontWeight: 'bold',
    marginTop: 5,
    color: '#007AFF',
  }
});