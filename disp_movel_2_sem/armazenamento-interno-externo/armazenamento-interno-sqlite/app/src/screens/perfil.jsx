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
  TouchableOpacity,
} from 'react-native';
import { getUsers, addUser, updateUser, deleteUser } from '../database/userDatabase';
import UserItem from '../components/UserItem';
import { useRouter, useLocalSearchParams } from "expo-router"


export default function UserRegistrationScreen() {
  const params = useLocalSearchParams()
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
    if (!name.trim() || !cpf.trim() || !email.trim()) {
      alert('Erro', 'Nome e CPF são obrigatórios.');
      return;
    }

    if (editingUserId) {
      // Modo de Edição
      updateUser(editingUserId, name, cpf, email);
    } else {
      // Modo de Adição
      addUser(name, cpf, email);
    }

    // Limpa os campos e recarrega a lista
    setName('');
    setCpf('');
    setEmail('');
    setEditingUserId(null);
    loadUsers();
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
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
    setEmail('');
    setEditingUserId(null);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={style.header}>
        <Text style={style.title}>Bem vindo(a)! {params.name}</Text>
        <Button title='Sair' onPress={() => router.replace('/')}></Button>
      </View>

      <View style={{padding:20}}>
      {editingUserId ? 
<View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
        />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <Button
          title='Atualizar Utilizador'
          onPress={handleSave}
        />
        {editingUserId && (
          <View style={{ marginTop: 10 }}>
            <Button title="Cancelar Edição" onPress={handleCancelEdit} color="red" />
          </View>
        )}
      </View>
      : <></>}
      

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
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
    header:{
        backgroundColor:'#4ea4ebff',
        paddingTop:40,
    },
    containerLogin: {
        padding: 20,
        width: '90%',
        boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
        borderRadius: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#fff',
        marginLeft:10
    },
    input: {
        padding: 5,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: "rgba(65, 65, 65, 0.5)",
    },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
    color: 'white',
    marginBottom: 0,
    padding: 5
  }
});
