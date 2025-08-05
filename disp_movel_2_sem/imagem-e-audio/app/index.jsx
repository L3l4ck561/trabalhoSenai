import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useAudioPlayer } from 'expo-audio';

const audioSource = [
    require('../assets/sounds/song.mp3'),
    require('../assets/sounds/song2.mp3')
];

export default function ModalScreen() {
    const player = [
        {
            id:0,
            url:useAudioPlayer(audioSource[0]),
        },
        {
            id:1,
            url:useAudioPlayer(audioSource[1]),
        }
    ]

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isAudioPlaying2, setIsAudioPlaying2] = useState(false);

    const vetor = [isAudioPlaying,isAudioPlaying2]

    const togglePlayback = (id) => {
        if (vetor[id]) {
            player[id].url.pause();
            if(id===0){
                setIsAudioPlaying(false);
            }else{
                setIsAudioPlaying2(false);
            }
            
        } else {
            player[id].url.play();
            if(id===0){
                setIsAudioPlaying(true);
            }else{
                setIsAudioPlaying2(true);
            }
        }
    };

    const [imageUri, setImageUri] = useState(null);
    const [imageUri2, setImageUri2] = useState(null);

    const vetorImg = [imageUri, imageUri2];

    const pickImageFromGallery = async (id) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Desculpe, precisamos da permissão para acessar a galeria!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            if (id === 0) {
                setImageUri(result.assets[0].uri);
            } else {
                setImageUri2(result.assets[0].uri);
            }
        }
    };

    const takePhotoWithCamera = async (id) => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Desculpe, precisamos da permissão para usar a câmera!');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            if (id === 0) {
                setImageUri(result.assets[0].uri);
            } else {
                setImageUri2(result.assets[0].uri);
            }
        }
    };

    const renderItemLista = ({ item }) => (
        <View style={styles.itemLista}>
            {vetorImg[item.id] ? (
                <Image source={{ uri: vetorImg[item.id] }} style={styles.imagemLista} />
            ) : (
                <Image source={require('../assets/images/monk.webp')} style={styles.imagemLista} />
            )}

            {/* <View style={styles.infoLista}>
                <Text style={styles.nomeLista}>{item.nome}</Text>
            </View> */}


            <View style={styles.buttonContainer}>
                <Button title='G' onPress={() => pickImageFromGallery(item.id)} />
                <View style={styles.space} />
                <Button title='C' onPress={() => takePhotoWithCamera(item.id)} />
                <View style={styles.space} />

                <Button
                    title={vetor[item.id] ? '||' : '>'}
                    onPress={() => togglePlayback(item.id)}
                    color="#f194ff"
                />
            </View>

        </View>
    );
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    data={player}
                    renderItem={renderItemLista}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listaContainer}
                />
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    container: {
        flex: 1,
    },
    listaContainer: {
        padding: 15,
    },
    itemLista: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 3,
        alignItems: 'center',
    },
    imagemLista: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 15,
    },
    infoLista: {
        flex: 1,
    },
    nomeLista: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },



    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    buttonContainer: {
        position: 'absolute',
        right: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    space: {
        width: 10,
    },
});