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
        console.log("Piece Data Recieved");
        this.p1.send(data2);
        this.p2.send(data1);
        
        while (true) {
            if (this.checkGameOver()) {
                break;
                }
        }

        this.closeConnections();
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
