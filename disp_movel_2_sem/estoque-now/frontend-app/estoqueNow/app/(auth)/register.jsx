import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
// import AuthContext from '../src/context/AuthContext';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext'

export default function RegisterScreen() {
  // Obtém a função de registo do nosso contexto de autenticação.
  // const { register } = useContext(AuthContext);
  // Obtém o router para navegação.
  const router = useRouter();
  const { onRegister } = useAuth()

  // Cria um estado para cada campo do nosso formulário.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        nome,
        email,
        idade: parseInt(age, 10), // Converte a idade para um número inteiro.
        security_question: securityQuestion,
        security_answer_hash: securityAnswer,
        password_hash,
      });

      setIsLoading(false);

      // Chama a função 'register' do nosso AuthContext.
      // const response = await register(userData);
      
      // Se o registo for bem-sucedido, mostra um alerta e navega para o login.
      Alert.alert('Sucesso!', result.message);
      router.replace('/(auth)'); // 'replace' substitui a tela de registo pela de login.

    } catch (error) {
      // Se ocorrer um erro (ex: email já existe), mostra uma mensagem de erro vinda do backend.
      Alert.alert('Erro no Registo', error.result?.data?.message || 'Ocorreu um erro ao tentar registar.');
    } finally {
      // Desativa o estado de carregamento, independentemente do resultado.
      setIsLoading(false);
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

          {/* --- Campos do Formulário --- */}
          <TextInput style={styles.input} placeholder="Nome Completo" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Idade" value={age} onChangeText={setAge} keyboardType="numeric" />
          {/* Futuramente, aqui podemos adicionar um botão para escolher a foto. */}
          
          <Text style={styles.sectionTitle}>Recuperação de Senha</Text>
          <TextInput style={styles.input} placeholder="Pergunta de Segurança (ex: nome do 1º animal?)" value={securityQuestion} onChangeText={setSecurityQuestion} />
          <TextInput style={styles.input} placeholder="Resposta Secreta" value={securityAnswer} onChangeText={setSecurityAnswer} secureTextEntry />

          <Text style={styles.sectionTitle}>Segurança</Text>
          <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
          
          {/* O botão fica desativado enquanto o pedido está a ser processado. */}
          <Button title={isLoading ? 'A Registar...' : 'Registar'} onPress={handleRegister} disabled={isLoading} />
          
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 20,
  },
  link: {
    textAlign: 'center',
    color: '#007AFF',
    fontSize: 16,
  },
});
