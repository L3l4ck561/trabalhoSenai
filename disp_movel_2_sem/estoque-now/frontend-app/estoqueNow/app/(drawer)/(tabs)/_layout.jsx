// Este ficheiro define o Navegador de Abas (Tabs) que está aninhado dentro do Drawer.

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

// Componente para o botão do menu 'sanduíche'.
function DrawerToggleButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginRight: 15 }}>
      <Ionicons name="menu" size={28} color="black" />
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#128C7E', // Cor do ícone ativo.
      }}
    >
      {/* Define a primeira aba: a lista de estoque. */}
      <Tabs.Screen
        name="index" // Corresponde ao ficheiro index.js
        options={{
          title: 'Meu Estoque',
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
          // Adiciona o botão do menu ao cabeçalho deste ecrã.
          headerRight: () => <DrawerToggleButton />,
        }}
      />
      {/* Define a segunda aba: adicionar novo item. */}
      <Tabs.Screen
        name="addItem" // Corresponde ao ficheiro addItem.js
        options={{
          title: 'Adicionar Item',
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
