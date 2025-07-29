import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, TextInput, Button, Alert, Keyboard, Platform } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [currentUserLocation, setCurrentUserLocation] = useState(null); // Corrigido nome
  const [searchedLocation, setSearchedLocation] = useState(null); // Corrigido nome
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('A permissão para acessar a localização foi negada.');
        Alert.alert('Permissão Negada', 'Não é possível obter a localização sem a sua permissão.');
        return;
      }

      const initialLocation = await Location.getCurrentPositionAsync({});
      if (initialLocation) {
        setCurrentUserLocation(initialLocation.coords);
        mapRef.current?.animateToRegion({
          latitude: initialLocation.coords.latitude,
          longitude: initialLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000);
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          setCurrentUserLocation(location.coords);
        }
      );
    })();
  }, []);

  // A função deve terminar ANTES do return do JSX
  const handleSearchAddress = async () => {
    if (!address.trim()) {
      Alert.alert('Entrada inválida', 'Por favor, digite um endereço.');
      return;
    }
    Keyboard.dismiss();

    try {
      const geocodedLocations = await Location.geocodeAsync(address);

      if (geocodedLocations.length > 0) {
        const location = geocodedLocations[0];
        setSearchedLocation(location);

        mapRef.current?.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      } else {
        Alert.alert('Endereço não encontrado', 'Não foi possível encontrar o endereço. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o endereço.');
    }
  }; 
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
      >
        {currentUserLocation && (
          <Marker
            coordinate={currentUserLocation}
            title="Você está aqui!"
            pinColor="blue"
          />
        )}

        {searchedLocation && (
          <Marker
            coordinate={searchedLocation}
            title={address}
            pinColor="red"
          />
        )}
      </MapView>

      <View style={styles.buscacontainer}>
        <TextInput
          style={styles.input}
          placeholder='Digite o endereço'
          value={address}
          onChangeText={setAddress}
          onSubmitEditing={handleSearchAddress}
        />
        <Button title='Buscar' onPress={handleSearchAddress} />
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
  buscacontainer: { 
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    elevation: 4,
    borderRadius: 8,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});