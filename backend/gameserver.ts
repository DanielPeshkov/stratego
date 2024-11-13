import { Game } from "./game";
import { WebSocket } from "ws";

export class GameServer {
    playerLobby: WebSocket | null = null;

    addPlayer(ws: WebSocket) {
        if (this.playerLobby?.readyState == WebSocket.OPEN) {
            let game = new Game(this.playerLobby, ws);
            this.playerLobby = null;
        } else {
            this.playerLobby = ws;
            ws.send(JSON.stringify({'gameStarted': false}));
        }
    }
}
