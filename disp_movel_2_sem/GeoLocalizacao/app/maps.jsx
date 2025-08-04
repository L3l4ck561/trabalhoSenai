import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TextInput, Button, Alert, Keyboard, Platform, Modal, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
    const [currentUserLocation, setCurrentUserLocation] = useState(null);
    const [searchedLocation, setSearchedLocation] = useState(null);
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

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
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

            <View style={estilo.modalcontainer}>
                <TouchableOpacity onPress={() => openModal()}>
                    <Text>
                        localização
                    </Text>
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={estilo.modal}>
                        <TouchableOpacity style={estilo.closeButton} onPress={closeModal}>
                            <Text style={estilo.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text>
                            {currentUserLocation ? (
                                <Text>
                                    Latitude: {currentUserLocation.latitude.toFixed(6)} {'\n'}
                                    Longitude: {currentUserLocation.longitude.toFixed(6)}
                                </Text>
                            ) : (
                                <Text>Carregando localização...</Text>
                            )}
                        </Text>
                    </View>
                </Modal>
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

const estilo = StyleSheet.create({
    modalcontainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 70 : 50,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        elevation: 4,
        borderRadius: 8,
    },
    modal: {
        margin: 'auto',
        width: '90%',
        height: '30%',
        backgroundColor: "rgba(248, 255, 150, 0.9)",
        padding: 20,
        borderRadius: 15,
    },
    closeButton: {
        position: 'absolute',
        top: 3,
        right: 5,
        backgroundColor: '#eee',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        zIndex: 10,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
})