// forgotPassword.jsx  (auth)

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import apiClient from '../src/api/axios'; // Importamos o nosso cliente Axios.

export default function ForgotPasswordScreen() {
  const router = useRouter();

  // Estados para controlar o fluxo
  const [step, setStep] = useState(1); // 1: Inserir email, 2: Responder pergunta e redefinir senha
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para o Passo 1: Encontrar a conta pelo email.
  const handleFindAccount = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira o seu email.');
      return;
    }
    setIsLoading(true);
    try {
      // Faz o pedido ao nosso endpoint '/forgot-password'.
      const response = await apiClient.post('/auth/forgot-password', { email });
      // Guarda a pergunta de segurança recebida do backend.
      setSecurityQuestion(response.data.security_question);
      // Avança para o próximo passo.
      setStep(2);
    } catch (error) {
      // O backend envia um 404 se o email não for encontrado, mas mostramos uma mensagem genérica.
      Alert.alert('Verificação', 'Se o seu email estiver na nossa base de dados, a sua pergunta de segurança será exibida.' + error);
       // Mesmo em caso de "erro" (email não encontrado), avançamos para o passo 2
       // para não confirmar ao utilizador que o email não existe. O backend já validou.
       // Neste caso, vamos simular uma pergunta para não deixar o ecrã vazio.
      setSecurityQuestion('Pergunta não encontrada.');
      setStep(2);

    } finally {
      setIsLoading(false);
    }
  };

  // Função para o Passo 2: Redefinir a senha.
  const handleResetPassword = async () => {
    if (!securityAnswer || !newPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setIsLoading(true);
    try {
      // Faz o pedido ao nosso endpoint '/reset-password'.
      const response = await apiClient.post('/auth/reset-password', {
        email,
        security_answer: securityAnswer,
        newPassword,
      });
      Alert.alert('Sucesso!', response.data.message);
      // Se for bem-sucedido, volta para a tela de login.
      router.replace('/(auth)');
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível redefinir a senha.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      {/* --- RENDERIZAÇÃO CONDICIONAL --- */}
      {step === 1 ? (
        // Formulário do Passo 1
        <View>
          <Text style={styles.label}>Insira o seu email para encontrar a sua conta.</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button title={isLoading ? 'A procurar...' : 'Procurar Conta'} onPress={handleFindAccount} disabled={isLoading} />
        </View>
      ) : (
        // Formulário do Passo 2
        <View>
          <Text style={styles.label}>Pergunta de Segurança:</Text>
          <Text style={styles.question}>{securityQuestion}</Text>
          <TextInput
            style={styles.input}
            placeholder="A sua resposta secreta"
            value={securityAnswer}
            onChangeText={setSecurityAnswer}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <Button title={isLoading ? 'A redefinir...' : 'Redefinir Senha'} onPress={handleResetPassword} disabled={isLoading} />
        </View>
      )}
      
      {/* Botão para voltar */}
      <TouchableOpacity onPress={() => router.back()} style={styles.linkContainer}>
        <Text style={styles.link}>Voltar ao Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  label: { fontSize: 16, marginBottom: 10, color: '#333' },
  question: { fontSize: 16, fontWeight: 'bold', marginBottom: 20, color: '#000', fontStyle: 'italic' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 20, paddingHorizontal: 15, backgroundColor: 'white' },
  linkContainer: { marginTop: 20 },
  link: { textAlign: 'center', color: '#007AFF', fontSize: 16 },
});
