// UserRegistrationScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { getUsers, addUser, updateUser, deleteUser } from '../database/userDatabase';
import UserItem from '../components/UserItem';
import { router } from "expo-router"


export default function UserRegistrationScreen() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null); // Guarda o ID do utilizador em edição

  const loadUsers = () => {
    const data = getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSave = () => {
    if (!name.trim() || !cpf.trim()) {
      alert('Erro', 'Nome e CPF são obrigatórios.');
      return;
    }

    if (editingUserId) {
      // Modo de Edição
      updateUser(editingUserId, name, cpf);
    } else {
      // Modo de Adição
      addUser(name, cpf);
    }

    // Limpa os campos e recarrega a lista
    setName('');
    setCpf('');
    setEditingUserId(null);
    loadUsers();
  };

  const handleEdit = (user) => {
    setName(user.name);
    setCpf(user.cpf);
    setEditingUserId(user.id);
  };

  const handleDelete = (id) => {
    deleteUser(id);
    loadUsers();
  };

  const handleCancelEdit = () => {
    setName('');
    setCpf('');
    setEditingUserId(null);
  }

  const Logar = () => {
    router.replace("../../auth/login")
  }
  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Registo de Utilizadores</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <Button
          title={editingUserId ? 'Atualizar Utilizador' : 'Adicionar Utilizador'}
          onPress={handleSave}
        />
        {editingUserId && (
          <View style={{ marginTop: 10 }}>
            <Button title="Cancelar Edição" onPress={handleCancelEdit} color="red" />
          </View>
        )}
      </View>

            <View style={{alignItems:'flex-end'}}>
        <TouchableOpacity onPress={Logar}>
          <Text style={styles.voltar}>voltar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListHeaderComponent={<Text style={styles.listTitle}>Utilizadores Registados</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum utilizador registado.</Text>}
      />
    </SafeAreaView>
  );
}

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
    marginTop: 20,
    marginBottom:20,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  voltar: {
    borderRadius: 10,
    backgroundColor: '#555',
    color:'white',
    marginBottom:0,
    padding:5
  }
});
