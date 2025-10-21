// Importa as funções e hooks essenciais do React.
import React, { createContext, useState, useContext, useEffect } from 'react';
// Importa os hooks de navegação do Expo Router.
import { useRouter, useSegments } from 'expo-router';
// Importa a nossa instância configurada do Axios para comunicar com o backend.
import apiClient from '../api/axios';

// Cria o Contexto de Autenticação. É como criar um "canal" global para os dados de autenticação.
const AuthContext = createContext(null);

// Cria um hook personalizado para facilitar o uso do contexto noutros componentes.
// Em vez de importar `useContext` e `AuthContext` em todos os ficheiros, apenas importamos `useAuth`.
export function useAuth() {
  return useContext(AuthContext);
}

// O componente Provedor que irá "embrulhar" toda a nossa aplicação.
export function AuthProvider({ children }) {
  // 'user' é o nosso estado principal. Se for 'null', o utilizador não está logado.
  // Se contiver um objeto, o utilizador está logado.
  const [user, setUser] = useState(null);
  // 'useSegments' devolve um array com os segmentos da rota atual (ex: ['(app)', 'settings']).
  const segments = useSegments();
  // 'useRouter' é o hook que nos permite navegar programaticamente.
  const router = useRouter();

  // Este useEffect é o coração da nossa proteção de rotas.
  // Ele é executado sempre que o estado 'user' ou a rota 'segments' mudam.
  useEffect(() => {
    // Verifica se o primeiro segmento da rota é '(app)', que é o nosso grupo de telas protegidas.
    const inAppGroup = segments[0] === '(app)';

    if (
      // Se o utilizador NÃO estiver logado E estiver a tentar aceder a uma tela protegida...
      !user &&
      inAppGroup
    ) {
      // ...redireciona-o para a tela de login. 'replace' impede o utilizador de voltar para a tela anterior.
      router.replace('/(auth)');
    } else if (
      // Se o utilizador ESTIVER logado E estiver numa tela de autenticação (como login)...
      user &&
      !inAppGroup
    ) {
      // ...redireciona-o para a tela principal da aplicação.
      router.replace('/(app)/(tabs)');
    }
  }, [user, segments]); // Dependências do efeito.

  // Função para lidar com o login.
  const onLogin = async (email, password) => {
    try {
      // Faz o pedido POST para o nosso endpoint de login no backend.
      const response = await apiClient.post('/auth/login', { email, password });
      // Se o login for bem-sucedido, guarda os dados do utilizador no estado.
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      // Se houver um erro, regista-o e devolve a mensagem de erro.
      console.error('Falha no login:', error.response?.data);
      return { success: false, message: error.response?.data?.message || 'Email ou senha inválidos.' };
    }
  };

  // Função para lidar com o registo de um novo utilizador.
  const onRegister = async (userData) => {
    try {
      // Faz o pedido POST para o endpoint de registo.
      const response = await apiClient.post('/auth/register', userData);
      // Após o registo, podemos optar por fazer o login automático do utilizador.
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      console.error('Falha no registo:', error.response?.data);
      return { success: false, message: error.response?.data?.message || 'Não foi possível registar.' };
    }
  };

  // Função para lidar com o logout.
  const onLogout = () => {
    // Simplesmente define o utilizador como 'null', o que irá acionar o useEffect para redirecionar para o login.
    setUser(null);
  };

  // Função para atualizar o perfil do utilizador.
  const onUpdateProfile = async (userData) => {
    if (!user) return; // Proteção para garantir que temos um utilizador logado.

    try {
      // Chama o nosso endpoint de atualização de perfil no backend.
      await apiClient.put(`/auth/profile/${user.id}`, userData);

      // Se a chamada for bem-sucedida, atualiza o estado local do utilizador.
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Retorna sucesso para que a tela possa dar feedback.
      return { success: true, message: 'Perfil atualizado com sucesso!' };

    } catch (error) {
      console.error('Falha ao atualizar perfil:', error.response?.data);
      // Retorna a mensagem de erro do backend.
      return { success: false, message: error.response?.data?.message || 'Erro ao atualizar.' };
    }
  };

  // O Provedor partilha o estado 'user' e as funções de autenticação com toda a aplicação.
  return (
    <AuthContext.Provider
      value={{
        user,
        onLogin,
        onRegister,
        onLogout,
        onUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
