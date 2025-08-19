// Importa as bibliotecas e componentes necessários.
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  SafeAreaView
} from 'react-native';
// Importa a biblioteca do AsyncStorage que acabamos de instalar.
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a chave que usaremos para salvar e carregar os dados no AsyncStorage.
// Usar uma constante evita erros de digitação.
const STORAGE_KEY = '@tasks';

export default function App() {
  // =================================================================
  // PASSO 1: CRIAR A INTERFACE E OS ESTADOS
  // =================================================================

  // Estado para armazenar o texto da nova tarefa que está sendo digitada.
  const [task, setTask] = useState('');
  // Estado para armazenar a lista de tarefas. Começa como um array vazio.
  const [tasks, setTasks] = useState([]);

  // Função para adicionar uma nova tarefa à lista.
  const handleAddTask = () => {
    // Verifica se o campo de texto não está vazio.
    if (!task.trim()) {
      Alert.alert('Entrada inválida', 'Por favor, digite uma tarefa.');
      return;
    }
    // Adiciona a nova tarefa ao final do array 'tasks'.
    // Usamos o spread operator (...) para criar um novo array com os itens antigos mais o novo.
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    // Limpa o campo de texto após adicionar a tarefa.
    setTask('');
    // Esconde o teclado.
    Keyboard.dismiss();
    // Chama a função para salvar os dados (Passo 2).
    saveTasks(newTasks);
  };

  // Função para remover uma tarefa da lista.
  const handleDeleteTask = (index) => {
    // Cria uma cópia do array de tarefas.
    const newTasks = [...tasks];
    // Remove o item na posição 'index'.
    newTasks.splice(index, 1);
    // Atualiza o estado com a nova lista.
    setTasks(newTasks);
    // Chama a função para salvar os dados (Passo 2).
    saveTasks(newTasks);
  };

  // =================================================================
  // PASSO 2: SALVAR AS TAREFAS NO ASYNCSTORAGE
  // =================================================================

  const saveTasks = async (newTasks) => {
    try {
      // AsyncStorage só armazena strings. Portanto, convertemos nosso array de tarefas para uma string JSON.
      const jsonValue = JSON.stringify(newTasks);
      // Salva a string JSON no AsyncStorage com a nossa chave definida.
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log('Tarefas salvas com sucesso!');
    } catch (e) {
      // Mostra um alerta se ocorrer um erro ao salvar.
      Alert.alert('Erro', 'Não foi possível salvar as tarefas.');
      console.error('Erro ao salvar tarefas:', e);
    }
  };

  // =================================================================
  // PASSO 3: CARREGAR AS TAREFAS AO INICIAR O APP
  // =================================================================

  // 'useEffect' com um array de dependências vazio '[]' é executado apenas uma vez,
  // quando o componente é montado. Perfeito para carregar dados iniciais.
  useEffect(() => {
    const loadTasks = async () => {
      try {
        // Busca a string JSON do AsyncStorage usando nossa chave.
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        // Se houver dados salvos (não for nulo), nós os usamos.
        if (jsonValue !== null) {
          // Converte a string JSON de volta para um array e atualiza o estado 'tasks'.
          setTasks(JSON.parse(jsonValue));
          console.log('Tarefas carregadas com sucesso!');
        }
      } catch (e) {
        // Mostra um alerta se ocorrer um erro ao carregar.
        Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
        console.error('Erro ao carregar tarefas:', e);
      }
    };

    loadTasks();
  }, []);

  // Renderiza a interface do aplicativo.
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minha Lista de Tarefas</Text>

      {/* Área de entrada de texto e botão */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar uma nova tarefa..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* O FlatList é um componente do React Native otimizado para renderizar listas longas e roláveis. */}
      <FlatList
        // 'data' é a propriedade que recebe o array de dados que a lista vai renderizar.
        // Neste caso, é o nosso estado 'tasks', que contém todas as tarefas.
        data={tasks}

        // 'keyExtractor' é uma função que fornece uma chave única para cada item da lista.
        // O React usa essas chaves para otimizar a renderização e identificar os itens.
        // Aqui, estamos a usar o índice do item no array como chave, convertendo-o para uma string.
        keyExtractor={(_, index) => index.toString()}

        // 'renderItem' é a função mais importante. Ela diz ao FlatList como renderizar cada item individualmente.
        // Ela recebe um objeto com 'item' (o valor do item, ex: "Lavar a loiça") e 'index' (a sua posição).
        renderItem={({ item, index }) => (
          // Cria um container para cada linha da tarefa.
          <View style={styles.taskContainer}>
            {/* Exibe o texto da tarefa ('item'). */}
            <Text style={styles.taskText}>{item}</Text>
            {/* Cria um botão "tocável" para apagar a tarefa. */}
            <TouchableOpacity onPress={() => handleDeleteTask(index)}>
              {/* O ícone '❌' que serve como botão de apagar. */}
              <Text style={styles.deleteButton}>❌</Text>
            </TouchableOpacity>
          </View>
        )}

        // 'ListEmptyComponent' é um componente que será renderizado apenas se o array 'data' (nossas tarefas) estiver vazio.
        // É ótimo para dar feedback ao utilizador.
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma tarefa na lista.</Text>}
      />
    </SafeAreaView>
  );
}

// Estilos para os componentes visuais.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskText: {
    fontSize: 16,
    flex: 1, // Garante que o texto ocupe o espaço disponível
  },
  deleteButton: {
    fontSize: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
