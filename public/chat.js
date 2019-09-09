let socket = io();

// När användaren loggat in med federerad identitet så kan man använda id för att hämta användarens information från databasen
// Skicka info till servern om vem klienten är
socket.emit('user info', { email: 'julian@gmail.com', nickname: 'Jules' });
// Nu är det fritt fram att använda socket för att skicka meddelanden till servern

window.addEventListener('load', () => {
	document.querySelector('#sendmessagebutton').addEventListener('click', e => {
		console.log('About to send chat message to server');
		let message = document.querySelector('#chatarea').value;
		let data = {
			message,
			timestamp: (new Date()).getTime(),
			senderId: 'Me'
		};
		addToHistory(data);
		socket.emit('chat message', data);
	})

	socket.on('chat message', data => {
		console.log('Client received chat message: ', data);
		addToHistory(data);
	})

})

function addToHistory(data) {
	// data: timestamp, message, senderId
	let div = document.querySelector('.chatmessages');
	// <div class=""> Timestamp <strong>Sender</strong>: message </div>
	let newMessage = document.createElement('div');
	newMessage.innerHTML = `${data.timestamp} <strong>${data.senderId}</strong>:<br/>${data.message}`;
	div.appendChild(newMessage);
}



//
