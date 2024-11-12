import { WebSocket } from "ws";

export class Game {
    board: number[][];
    p1: WebSocket;
    p2: WebSocket;

    constructor(ws1: WebSocket, ws2: WebSocket) {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        ]
        this.p1 = ws1;
        this.p2 = ws2;
        console.log('game started');
        this.p1.send(JSON.stringify({'msg': 'Game Started as Player 1'}));
        this.p2.send(JSON.stringify({'msg': 'Game Started as Player 2'}));
        this.gameLoop();
    }

    async gameLoop() {
        while (true) {
            let event1: Promise<string> = new Promise((resolve) => {
                this.p1.on('message', event => {
                    resolve(JSON.parse(event.toString()));
                })
              });
          
              const event2: Promise<string> = new Promise((resolve) => {
                this.p2.on('message', event => {
                    resolve(JSON.parse(event.toString()));
                })
              });
          
              // Process the events
              console.log("Event from socket 1:", await event1);
              console.log("Event from socket 2:", await event2);
              
              if (this.checkGameOver()) {
                break;
              }
        }

        this.closeConnections();
    }

    display(): string {
        let out = '';
        for (let r = 0; r < this.board.length; r++) {
            const row = this.board[r];
            for (let c = 0; c < row.length; c++) {
                const cell = row[c];
                out += cell;
                out += ' ';
            }
            out += '\n'
        }
        return out;
    }

    checkGameOver() {
        return true;
    }

    closeConnections() {
        this.p1.close();
        this.p2.close();
        console.log('game closed');
    }
}
