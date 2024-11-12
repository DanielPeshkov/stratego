import express from 'express';
const app = express();
const port = 3000;
import http from 'http';
const server = http.createServer(app);
import {WebSocketServer} from 'ws';
import { GameServer } from './gameserver';

const io = new WebSocketServer({ server });

app.get('/', (req, res) => {
    res.send({'response': 'Server Response!'});
})

let gameServer = new GameServer();

io.on('connection', ws => {
    gameServer.addPlayer(ws);
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
