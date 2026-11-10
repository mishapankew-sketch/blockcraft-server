const { WebSocketServer } = require('ws');
const port = process.env.PORT || 8080;
const wss = new WebSocketServer({ port });

console.log('WebSocket сервер запущен на порту', port);

wss.on('connection', (ws) => {
  console.log('Новый игрок подключился');

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Игрок отключился');
  });
});