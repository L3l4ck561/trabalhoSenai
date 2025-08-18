import React, { useState, useEffect } from 'react';
// Importa componentes e hooks do React Native
import { View, StyleSheet, Dimensions } from 'react-native';
// Importa o sensor acelerômetro do Expo
import { Accelerometer } from 'expo-sensors';

// Pega largura e altura da tela do dispositivo
const { width, height } = Dimensions.get('window');

export default function App() {
  // Estado que guarda a posição atual do quadrado (x e y na tela)
  // Inicializa no centro da tela (subtraindo metade do quadrado para centralizar)
  const [position, setPosition] = useState({ x: width / 2 - 25, y: height / 2 - 25 });

  // useEffect que roda após o componente ser montado
  useEffect(() => {
    // Define o intervalo de atualização do acelerômetro (50 ms)
    Accelerometer.setUpdateInterval(50);

    // Cria uma assinatura no acelerômetro que recebe os dados x, y, z
    const subscription = Accelerometer.addListener(({ x, y }) => {
      // Calcula a nova posição do quadrado baseado na inclinação
      // Inverte eixo x para que inclinar para direita mova quadrado para direita
      const newX = position.x - x * 20;
      // Eixo y invertido para movimento natural (inclinar pra cima move pra cima)
      const newY = position.y + y * 20;

      // Garante que o quadrado não saia da tela, limitando a posição
      setPosition({
        x: Math.min(Math.max(newX, 0), width - 50), // largura do quadrado é 50
        y: Math.min(Math.max(newY, 0), height - 50), // altura do quadrado é 50
      });
    });

    // Remove o listener quando o componente desmontar para evitar vazamento de memória
    return () => subscription.remove();
    // O array de dependência tem position para atualizar posição com base no valor mais recente
  }, [position]);

  return (
    // Container principal com flex 1 para ocupar toda a tela e fundo cinza claro
    <View style={styles.container}>
      {/* Quadrado posicionado absolutamente com left e top controlados pelo estado position */}
      <View style={[styles.box, { left: position.x, top: position.y }]} />
    </View>
  );
}

// Estilos usados no app
const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda a tela
    backgroundColor: '#eee', // cor de fundo cinza claro
  },
  box: {
    position: 'absolute', // posição absoluta para mover livremente na tela
    width: 50, // largura do quadrado
    height: 50, // altura do quadrado
    backgroundColor: '#128C7E', // cor verde
    borderRadius: 8, // cantos arredondados
  },
});
