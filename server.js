const WebSocketServer = require('websocket').server;
const http = require('http');

let players = [];
let rooms = [];
let connections = [];

const server = http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.end(index);
		return;
	}
});

const io = require('socket.io').listen(server);

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

function setConnection(sessionId, socket) {
    if(!connections[sessionId]) {
        connections[sessionId] = socket;
    }
}

function sendToAll(roomId, data) {
	const room = rooms.find(room => room.id === roomId);
    if(room) {
	    room.players.map((player, i) => {
	        if(player.id === '') {
	            room.players = room.players.splice(i, 1);
	        }
	        if(connections[player.id] && player.id) {
                connections[player.id].emit('ROOM_UPDATE', data);
	        } else {
	            console.log(`connection not available`);
	        }
	    });
    } else {
        console.log('room is not available!')
    }
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    // socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('JOIN_GAME', (data) => {
    	setConnection(data.sessionId, socket);
        socket['sessionId'] = data.sessionId;
		socket['roomId'] = data.id;
    	const player = {
			name: data.name,
			id: data.sessionId,
			status: 'connected',
		}
    	const currentRoom = rooms.find(room => room.id === data.id);
    	if(!currentRoom) {
    		// create new room
			const newRoom = { id: data.id, players: [player] };
    		rooms.push(newRoom);
    		sendToAll(data.id, { cmd: 'ROOM_UPDATE', room: newRoom });
    	} else {
    		// join to current room
    		const currentPlayer = currentRoom.players.find(player => player.id === data.sessionId);
    		if(!currentPlayer) {
    			currentRoom.players.push(player);
    			sendToAll(currentRoom.id, { 
    				cmd: 'ROOM_UPDATE', 
    				room: currentRoom 
    			});
    		} else {
    			const idx = currentRoom.players.indexOf(currentPlayer);
    			currentRoom.players[idx].status = 'connected';
    			sendToAll(currentRoom.id, { 
    				cmd: 'ROOM_UPDATE', 
    				room: currentRoom,
    				player
    			});
    		}
    	}
    });

    socket.on('disconnect', function(){
		const currentRoom = rooms.find(room => room.id === socket.roomId);
        if(currentRoom) {
        	currentRoom.players.map((player, i) => {
        		if(player.id === socket.sessionId) {
        			currentRoom.players[i].status = 'disconnected';
        			sendToAll(currentRoom.id, { 
        				cmd: 'ROOM_UPDATE', 
        				room: currentRoom,
        				player
        			});
        		}
        	})
        }
	});

});

server.listen(3434, function() {
    console.log((new Date()) + ' Server is listening on port 8000');
});
