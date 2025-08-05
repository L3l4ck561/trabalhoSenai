import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAudioPlayer } from 'expo-audio';


const audioSource = require('../assets/sounds/song.mp3');

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const player = useAudioPlayer(audioSource);
 
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const pickImageFromGallery = async () => {
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
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
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
      setImageUri(result.assets[0].uri);
    }
  };

  const togglePlayback = () => {
    if (isAudioPlaying) {
      player.pause();
      setIsAudioPlaying(false); // Atualiza o estado para "pausado"
    } else {
      player.play();
      setIsAudioPlaying(true); // Atualiza o estado para "tocando"
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Câmera & Multimídia</Text>

      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Image source={require('../assets/images/monk.webp')} style={styles.image} />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Escolher da Galeria" onPress={pickImageFromGallery} />
        <View style={styles.space} />
        <Button title="Tirar Foto" onPress={takePhotoWithCamera} />
        <View style={styles.space} />
        {/* O botão agora depende do nosso estado 'isAudioPlaying' */}
        <Button
          title={isAudioPlaying ? "Pausar Som" : "Tocar Som"}
          onPress={togglePlayback}
          color="#f194ff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
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
    width: '80%',
  },
  space: {
    height: 10,
  },
});