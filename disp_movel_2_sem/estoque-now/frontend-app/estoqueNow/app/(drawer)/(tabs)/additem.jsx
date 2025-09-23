import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import apiClient from '../../src/api/axios';
import { Ionicons } from '@expo/vector-icons';

// Componente para renderizar um único item da lista.
const ItemProduto = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>Quantidade: {item.quantity} | Preço: R$ {item.price.toFixed(2)}</Text>
    </View>
    <TouchableOpacity onPress={() => {/* Lógica para editar/apagar no futuro */}}>
      <Ionicons name="ellipsis-vertical" size={24} color="#888" />
    </TouchableOpacity>
  </View>
);

export default function StockScreen() {
  // Estado para guardar a lista de produtos vinda do backend.
  const [products, setProducts] = useState([]);
  // Estado para controlar o indicador de carregamento.
  const [isLoading, setIsLoading] = useState(true);
  // Estado para guardar mensagens de erro.
  const [error, setError] = useState(null);

  // useFocusEffect é um hook do Expo Router que executa o código
  // sempre que o ecrã fica focado. É perfeito para atualizar dados.
  useFocusEffect(
    useCallback(() => {
      // Função assíncrona para buscar os produtos da API.
      const fetchProducts = async () => {
        try {
          // Reinicia os estados antes de cada nova busca.
          setIsLoading(true);
          setError(null);
          
          // Faz o pedido GET para o nosso endpoint de estoque.
          // O token do utilizador já está no cabeçalho graças à nossa configuração do Axios.
          const response = await apiClient.get('/stock');
          
          // Atualiza o estado com os produtos recebidos.
          setProducts(response.data);
        } catch (err) {
          console.error("Erro ao buscar produtos:", err.response?.data);
          setError('Não foi possível carregar o estoque. Tente novamente mais tarde.');
        } finally {
          // Garante que o indicador de carregamento para, independentemente do resultado.
          setIsLoading(false);
        }
      };

      fetchProducts();

      // A função de retorno é opcional e serve para "limpar" efeitos,
      // mas não é necessária neste caso simples.
    }, []) // O array vazio significa que a função de busca em si não muda.
  );

  // Renderiza um indicador de carregamento enquanto os dados são buscados.
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#128C7E" />
      </View>
    );
  }

  // Renderiza uma mensagem de erro se a busca falhar.
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ItemProduto item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        // Componente para ser mostrado se a lista estiver vazia.
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>O seu estoque está vazio.</Text>
            <Text>Adicione um item na aba ao lado!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  listContent: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // Sombra para Android
    elevation: 3,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

