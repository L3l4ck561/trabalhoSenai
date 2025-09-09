// _layout.jsx do (auth)
// Este ficheiro define o layout para o grupo de rotas de autenticação.

import { Stack } from 'expo-router';

// A exportação default de um ficheiro de layout é sempre um componente React.
export default function AuthLayout() {
  // Retornamos o componente Stack do Expo Router para criar uma navegação baseada em pilha.
  return (
    <Stack>
      {/* Cada ecrã dentro do grupo (auth) será uma rota dentro desta pilha. */}
      
      {/* Ocultamos o cabeçalho para todos os ecrãs neste grupo. */}
      {/* Isto dá-nos um controlo total sobre a aparência de cada ecrã, sem o cabeçalho padrão. */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
    </Stack>
  );
}
