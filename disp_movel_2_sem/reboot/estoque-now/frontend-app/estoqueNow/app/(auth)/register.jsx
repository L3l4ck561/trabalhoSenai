// register.jsx (auth)

import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "../src/context/AuthContext";
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'; // Importamos a biblioteca de imagens.

export default function RegisterScreen() {
  // Obtém a função de registo do nosso contexto de autenticação.
//   const { register } = useContext(AuthContext);
  // Obtém o router para navegação.
  const router = useRouter();
    const { onRegister } = useAuth();

  // Cria um estado para cada campo do nosso formulário.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(null); // Estado para guardar a foto em Base64.

  // Função chamada quando o botão de registo é pressionado.
  const handleRegister = async () => {
    // --- Validação dos Campos ---
    if (!name || !email || !age || !securityQuestion || !securityAnswer || !password || !confirmPassword) {
      Alert.alert('Campos Incompletos', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Senhas Diferentes', 'As senhas não coincidem.');
      return;
    }
    
    // Ativa o estado de carregamento para desativar o botão e mostrar feedback.
    setIsLoading(true);

    try {
      // Cria o objeto com os dados do utilizador para enviar à API.
      const result = await onRegister({
        name,
        email,
        age: parseInt(age, 10), // Converte a idade para um número inteiro.
        security_question: securityQuestion,
        security_answer: securityAnswer,
        password,
      });

      setIsLoading(false);
      // Chama a função 'register' do nosso AuthContext.
    //   const response = await register(userData);
      
      // Se o registro for bem-sucedido, mostra um alerta e navega para o login.
      Alert.alert('Sucesso!', result.message);
      router.replace('/(auth)'); // 'replace' substitui a tela de registo pela de login.

    } catch (error) {
      // Se ocorrer um erro (ex: email já existe), mostra uma mensagem de erro vinda do backend.
      Alert.alert('Erro no Registo', error.response?.data?.message || 'Ocorreu um erro ao tentar registar.');
    } finally {
      // Desativa o estado de carregamento, independentemente do resultado.
      setIsLoading(false);
    }
  };

  // --- FUNÇÃO PARA ESCOLHER IMAGEM DA GALERIA ---
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

  return (
    <SafeAreaView style={styles.container}>
      {/* KeyboardAvoidingView ajusta a tela quando o teclado aparece. */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Criar Conta</Text>

          {/* --- ÁREA DA FOTO DE PERFIL --- */}
        <TouchableOpacity onPress={() => Alert.alert('Foto de Perfil', 'Escolha uma opção', [{ text: 'Tirar Foto', onPress: takePhoto }, { text: 'Escolher da Galeria', onPress: pickImage }, { text: 'Cancelar', style: 'cancel' }])}>
          <Image
            source={photo ? { uri: photo } : require('../../assets/images/pessoa.png')} // Mostra a foto ou um placeholder.
            style={styles.avatar}
          />
        </TouchableOpacity>

          {/* --- Campos do Formulário --- */}
          <TextInput style={styles.input} placeholder="Nome Completo" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Idade" value={age} onChangeText={setAge} keyboardType="numeric" />
          
          <Text style={styles.sectionTitle}>Recuperação de Senha</Text>
          <TextInput style={styles.input} placeholder="Pergunta de Segurança (ex: nome do 1º animal?)" value={securityQuestion} onChangeText={setSecurityQuestion} />
          <TextInput style={styles.input} placeholder="Resposta Secreta" value={securityAnswer} onChangeText={setSecurityAnswer} secureTextEntry />

          <Text style={styles.sectionTitle}>Segurança</Text>
          <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
          
          {/* O botão fica desativado enquanto o pedido está a ser processado. */}
          <Button title={isLoading ? 'Registrando...' : 'Registar'} onPress={handleRegister} disabled={isLoading} />
          
          {/* Botão para voltar ao ecrã de login. */}
          <TouchableOpacity onPress={() => router.back()} style={styles.linkContainer}>
            <Text style={styles.link}>Já tem conta? Fazer Login</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 30, backgroundColor: '#e1e1e1' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, backgroundColor: 'white' },
  label: { fontSize: 16, marginBottom: 5, color: '#333', marginLeft: 5 },
  inputDisabled: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, backgroundColor: '#f0f0f0', color: '#888' },
  buttonContainer: { marginTop: 10, marginBottom: 15 },
  linkContainer: { marginTop: 15 },
  link: { textAlign: 'center', color: '#007AFF', fontSize: 16 },
});