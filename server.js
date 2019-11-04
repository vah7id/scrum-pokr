const WebSocket = require('ws');
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({port: 3434});

wss.broadcast = function(data) {
  this.clients.forEach(function(client) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
        wss.broadcast(message);
    });

    ws.on('close', function() {
	  	console.log('closing connection');
	});
});
