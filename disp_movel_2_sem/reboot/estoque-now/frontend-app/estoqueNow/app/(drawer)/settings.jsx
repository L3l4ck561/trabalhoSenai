//settings.jsx (drawer)

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

// Componente principal para a tela de configurações
export default function SettingsScreen() {
  // Obtém os dados e funções do utilizador do nosso contexto de autenticação.
  const { authState, onUpdateProfile, isLoading } = useAuth();

  // Estados para gerir os campos do formulário.
  // São inicializados com os dados atuais do utilizador que vêm do contexto.
  const [name, setName] = useState(authState.user?.name || '');
  const [email, setEmail] = useState(authState.user?.email || '');
  const [age, setAge] = useState(authState.user?.age?.toString() || '');
  const [photo, setPhoto] = useState(authState.user?.photo_url || null);

  // useEffect para garantir que, se os dados do utilizador no contexto mudarem,
  // o formulário é atualizado.
  useEffect(() => {
    if (authState.user) {
      setName(authState.user.name);
      setEmail(authState.user.email);
      setAge(authState.user.age?.toString() || '');
      setPhoto(authState.user.photo_url);
    }
  }, [authState.user]);

  const pickImage = async () => {
    // Pede permissão para aceder à galeria.
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Desculpe, precisamos da permissão para aceder à galeria!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1], // Força um aspeto quadrado para a foto de perfil.
      quality: 0.5, // Reduz a qualidade para diminuir o tamanho da string Base64.
      base64: true, // Pede o resultado em formato Base64.
    });

    if (!result.canceled) {
      // Guarda a imagem como uma string Base64.
      setPhoto(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  // --- FUNÇÃO PARA TIRAR FOTO COM A CÂMARA ---
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Desculpe, precisamos da permissão para usar a câmara!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setPhoto(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  // Função chamada quando o utilizador clica em "Guardar Alterações".
  const handleUpdate = async () => {
    if (!name || !email || !age) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha o nome, email e idade.');
      return;
    }

    const updatedData = {
      name,
      email,
      age: parseInt(age, 10), // Converte a idade de volta para um número.
      photo,
    };

    // Chama a função de atualização do nosso AuthContext, que irá tratar da chamada à API.
    await onUpdateProfile(updatedData);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Configuração do cabeçalho da página usando o Expo Router */}
      <Stack.Screen options={{ title: 'As Minhas Configurações' }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>Edite as suas informações.</Text>
        </View>

        {/* Secção da foto de perfil */}
        <View style={styles.photoContainer}>
          {/* --- ÁREA DA FOTO DE PERFIL --- */}
          <TouchableOpacity onPress={() => Alert.alert('Foto de Perfil', 'Escolha uma opção', [{ text: 'Tirar Foto', onPress: takePhoto }, { text: 'Escolher da Galeria', onPress: pickImage }, { text: 'Cancelar', style: 'cancel' }])}>
            <Image
              source={photo ? { uri: photo } : require('../../assets/images/pessoa.png')} // Mostra a foto ou um placeholder.
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Secção do formulário */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="O seu nome"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="o.seu.email@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="A sua idade"
            keyboardType="numeric"
          />
        </View>

        {/* Botão de guardar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Guardar Alterações</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Folha de estilos para o componente.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#128C7E',
    backgroundColor: '#e0e0e0',
  },
  photoButton: {
    marginTop: 10,
  },
  photoButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#128C7E',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
