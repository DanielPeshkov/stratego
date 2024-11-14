import { WebSocket } from "ws";

export class Game {
    p1: WebSocket;
    p2: WebSocket;

    constructor(ws1: WebSocket, ws2: WebSocket) {
        this.p1 = ws1;
        this.p2 = ws2;
        console.log('game started');
        this.p1.send(JSON.stringify({'gameStarted': true, 'player': 1}));
        this.p2.send(JSON.stringify({'gameStarted': true, 'player': 2}));
        this.gameLoop();
    }

    async gameLoop() {
        // Send player data to opponents
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
        let data1: string = await event1;
        let data2: string = await event2;
        this.p1.send(data2);
        this.p2.send(data1);
        
        while (true) {
            let move: string = await new Promise((resolve) => {
                this.p1.on('message', event => {
                    resolve(JSON.parse(event.toString()));
                })
            });
            let gameOver = JSON.parse(move).gameOver;
            this.p2.send(JSON.stringify(move));

            if (gameOver) {
                break;
            }

            move = await new Promise((resolve) => {
                this.p2.on('message', event => {
                    resolve(JSON.parse(event.toString()));
                })
            });
            gameOver = JSON.parse(move).gameOver;
            this.p1.send(JSON.stringify(move));

            if (gameOver) {
                break;
            }
        }
        setTimeout(() => this.closeConnections(), 1000)
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
