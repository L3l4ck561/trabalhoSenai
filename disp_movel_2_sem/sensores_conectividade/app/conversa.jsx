import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function chat() {
  const [mensagem, setMensagem] = useState('');
  const [chat, setChat] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    // Conecta ao servidor WebSocket
    ws.current = new WebSocket('ws://172.28.80.1:5000');

    ws.current.onopen = () => {
      console.log('✅ Conectado ao servidor');
    };

    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setChat((prev) => [...prev, msg]);
      } catch {
        console.log('⚠️ Mensagem inválida recebida');
      }
    };

    ws.current.onerror = (error) => {
      console.log('⚠️ Erro:', error.message);
    };

    ws.current.onclose = () => {
      console.log('🔌 Conexão fechada');
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const enviarMensagem = () => {
    if (mensagem.trim() !== '') {
      // Adiciona no chat localmente
      setChat((prev) => [...prev, { remetente: 'eu', texto: mensagem }]);

      // Envia para o servidor
      ws.current.send(mensagem);
      setMensagem('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[
      styles.balao,
      item.remetente === 'eu' ? styles.meuBalao : styles.balaoOutro
    ]}>
      <Text style={styles.texto}>{item.texto}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e5ddd5' }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 40}
      >
        <FlatList
          data={chat}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          style={styles.lista}
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChangeText={setMensagem}
          />
          <TouchableOpacity style={styles.botao} onPress={enviarMensagem}>
            <Text style={styles.botaoTexto}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lista: {
    flex: 1,
    padding: 10
  },
  balao: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  meuBalao: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  balaoOutro: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  texto: { fontSize: 16 },
  inputArea: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginBottom: 50
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 8,
  },
  botao: {
    backgroundColor: '#128C7E',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});