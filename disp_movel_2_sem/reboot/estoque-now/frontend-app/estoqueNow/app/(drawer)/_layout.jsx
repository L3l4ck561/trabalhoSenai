// _layout.jsx (drawer)

// Este ficheiro define o Navegador de Gaveta (Drawer) para a secção autenticada da aplicação.

import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

// Componente personalizado para o conteúdo da gaveta.
function CustomDrawerContent(props) {
  // const router = useRouter();
  const { onLogout } = useAuth(); // Obtém a função de logout do nosso contexto.

  return (
    <DrawerContentScrollView {...props}>
      {/* Renderiza os itens de ecrã padrão (Estoque e Configurações) */}
      <DrawerItemList {...props} />
      {/* Adiciona um item personalizado para o botão de Sair */}
      <DrawerItem
        label="Sair"
        icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />}
        onPress={() => {
          // Fecha a gaveta e depois executa o logout.
          props.navigation.closeDrawer();
          onLogout();
        }}
        labelStyle={{ fontWeight: 'bold' }}
      />
    </DrawerContentScrollView>
  );
}

export default function AppLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {/* Define o ecrã principal que será o nosso layout de Tabs. */}
      <Drawer.Screen
        name="(tabs)" // Este nome corresponde à pasta do grupo de Tabs.
        options={{
          headerShown: false,
          // title: 'Estoque', // Título que aparece na gaveta e no cabeçalho.
          drawerIcon: ({ color, size }) => <Ionicons name="cube-outline" size={size} color={color} />,
        }}
      />
      {/* Define o ecrã de Configurações. */}
      <Drawer.Screen
        name="settings" // Este nome corresponde ao ficheiro settings.js.
        options={{
          title: 'Configurações',
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}