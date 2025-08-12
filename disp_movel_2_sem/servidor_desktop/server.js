// Importa a biblioteca 'ws' para criar servidor WebSocket
const WebSocket = require('ws');

// Cria o servidor WebSocket na porta 5000
const wss = new WebSocket.Server({ port: 6000 });

// Evento disparado quando um cliente se conecta ao servidor
wss.on('connection', (ws) => {
  console.log('📡 Cliente conectado!');

  // Envia mensagem de boas-vindas apenas para o cliente que acabou de conectar
  ws.send('Bem-vindo ao chat improvisado da aula de conectividade!');

  // Evento disparado quando o servidor recebe uma mensagem de um cliente
  ws.on('message', (message) => {
    console.log(`📩 Mensagem recebida: ${message}`);

    // Reenvia a mensagem para todos os outros clientes (não para quem enviou)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ remetente: 'outro', texto: message.toString() }));
      }
    });
  });

  // Evento disparado quando o cliente se desconecta
  ws.on('close', () => {
    console.log('❌ Cliente desconectado');
  });
});

// Mensagem no console para indicar que o servidor está rodando
console.log('🚀 Servidor WebSocket rodando na porta 5000...');