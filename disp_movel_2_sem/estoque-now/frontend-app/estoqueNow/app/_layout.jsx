// _layout (app)

import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { Slot } from 'expo-router';

export default function RootLayout() {
  // O AuthProvider envolve toda a aplicação,
  // disponibilizando o contexto de autenticação a todos os componentes.
  return (
    <AuthProvider>
      {/* O Slot renderiza a rota atual (seja do grupo auth ou tabs). */}
      <Slot />
    </AuthProvider>
  );
}             