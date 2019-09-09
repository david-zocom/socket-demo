const express = require('express');
const expServer = express();
const httpServer = require('http').createServer(expServer);
const io = require('socket.io')(httpServer);
const port = 1337;

// 1 middleware
// 2 routes
// 2.5 socket stuff
// 3 felhantering
// 4 starta servern

expServer.use( express.static(__dirname + '/../public/') );

let highestId = 0;
io.on('connection', socket => {
	let id = highestId;
	highestId = highestId + 1;
	console.log('Server received new client connection: #' + id);
	socket.on('disconnect', () => {
		console.log(`Client #${id} disconnected from server`);
	})
	socket.on('chat message', data => {
		console.log(`Server received chat message from #${id}: `, data);
		// Skicka vidare meddelandet till alla andra klienter
		data.senderId = id;
		socket.broadcast.emit('chat message', data);
	})
})

// OBS! Starta httpServer i stället för expServer.
httpServer.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});







//
