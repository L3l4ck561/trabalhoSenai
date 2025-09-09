// Login (indexjsx)
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { onLogin } = useAuth(); // Obtém a função de login do nosso contexto.

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para lidar com a submissão do formulário de login.
  const handleLogin = async () => {
    // Validação simples dos campos.
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha o email e a senha.');
      return;
    }

    setIsLoading(true);
    // Chama a função onLogin do AuthContext.
    const result = await onLogin(email, password);
    setIsLoading(false);

    // Se o login falhar, o AuthContext devolve uma mensagem de erro.
    if (!result.success) {
      Alert.alert('Falha no Login', result.message);
    }
    // Se o login for bem-sucedido, o useEffect no AuthContext irá redirecionar automaticamente.
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.innerContainer}>
          <Ionicons name="storefront-outline" size={80} color="#128C7E" style={{ alignSelf: 'center', marginBottom: 20 }} />
          <Text style={styles.title}>EstoqueNOW</Text>
          <Text style={styles.subtitle}>Bem-vindo de volta!</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title={isLoading ? 'A entrar...' : 'Entrar'}
            onPress={handleLogin}
            disabled={isLoading}
            color="#128C7E"
          />

          <View style={styles.linksContainer}>
            {/* O componente Link do Expo Router é a forma correta de criar links de navegação. */}
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Criar uma conta</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/(auth)/forgotPassword" asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Esqueceu-se da senha?</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#128C7E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  linksContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    color: '#128C7E',
    fontSize: 16,
    fontWeight: '500',
  },
});