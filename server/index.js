import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handler } from '../build/handler.js';

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

let arr = [];
let playingArray = [];

io.on('connection', (socket) => {
	socket.on('find', (e) => {
		if (e.name != null) {
			arr.push(e.name);

			if (arr.length >= 2) {
				let p1obj = {
					p1name: arr[0],
					p1value: 'X',
					p1move: ''
				};

				let p2obj = {
					p2name: arr[1],
					p2value: 'O',
					p2move: ''
				};

				let obj = {
					p1: p1obj,
					p2: p2obj,
					sum: 1
				};

				playingArray.push(obj);

				arr.splice(0, 2);

				io.emit('find', { allPlayers: playingArray });
			}
		}
	});

	socket.on('playing', (e) => {
		if (e.value == 'X') {
			let objToChange = playingArray.find((obj) => obj.p1.p1name === e.name);

			objToChange.p1.p1move = e.id;
			objToChange.sum++;
			objToChange.p2.p2move = '';
		} else if (e.value == 'O') {
			let objToChange = playingArray.find((obj) => obj.p2.p2name === e.name);

			objToChange.p2.p2move = e.id;
			objToChange.sum++;
			objToChange.p1.p1move = '';
		}

		io.emit('playing', { allPlayers: playingArray, playerTurn: e.value });
	});

	socket.on('gameOver', (winner, square) => {
		io.emit('gameOver', winner, square);
	});
});

app.use(handler);

server.listen(port);
