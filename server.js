const WebSocketServer = require('websocket').server;
const http = require('http');

let players = [];
let rooms = [];
let connections = [];

const server = http.createServer((request, response) => {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(8000, function() {
    console.log((new Date()) + ' Server is listening on port 8000');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

function setConnection(userid, connection) {
    if(!connections[userid]) {
        connections[userid] = connection;
    }
}

function sendToAll(roomId, data) {
	const room = rooms.find(room => room.id === roomId);
    if(room) {
        room.players.map((player, i) => {
            if(player.id === '') {
                room.players = room.players.splice(i, 1);
            }
            if(connections[player.id]) {
                if(player.id) {
                    connections[player.id].sendUTF(JSON.stringify(data));
                }
            } else {
                console.log(`connection not available`);
            }
        });
    } else {
        console.log('room is not available!')
    }
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    const connection = request.accept('echo-protocol', request.origin);

    connection.on('message', (message) => {
        if(!message || !message.utf8Data || typeof message.utf8Data !== 'string' || message.utf8Data === 'undefined' || message.utf8Data === 'undefined:1') {
            console.log('problem with utf8 data');
            return;
        }
        const json = JSON.parse(message.utf8Data);
        const cmd = json.cmd;
        const data = json.data;
        
        if(cmd === 'JOIN_GAME') {
            setConnection(data.sessionId, connection);
        	const player = {
				name: data.name,
				id: data.sessionId,
			}
        	const currentRoom = rooms.find(room => room.id === data.id);
        	if(!currentRoom) {
        		// create new room
    			const newRoom = { id: data.id, players: [player] };
        		rooms.push(newRoom);
        		sendToAll(data.id, { cmd: 'ROOM_UPDATE', room: newRoom });
        	} else {
        		// join to current room
        		currentRoom.players.push(player)
        		sendToAll(currentRoom.id, { cmd: 'ROOM_UPDATE', room: currentRoom });
        	}
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log('closed')
    });
});