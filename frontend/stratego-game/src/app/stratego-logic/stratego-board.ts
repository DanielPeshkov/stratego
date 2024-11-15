import { first, take } from "rxjs";
import { Color, Coords, FENChar, SafeSquares } from "./models";
import { Artillery } from "./pieces/artillery";
import { Assassin } from "./pieces/assassin";
import { Bomb } from "./pieces/bomb";
import { Cavalry } from "./pieces/cavalry";
import { Courier } from "./pieces/courier";
import { Dragoon } from "./pieces/dragoon";
import { Flag } from "./pieces/flag";
import { General } from "./pieces/general";
import { Infantry } from "./pieces/infantry";
import { Marine } from "./pieces/marine";
import { Piece } from "./pieces/piece";
import { Sapper } from "./pieces/sapper";
import { Scout } from "./pieces/scout";
import  { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export class StrategoBoard {
    private strategoBoard:(Piece|null)[][];
    private strategoBoardSize: number = 12;
    private _playerColor = Color.Blue;
    private _turnColor = Color.Blue;
    private _safeSquares: SafeSquares;
    public _gameOver: boolean = false;
    private server: WebSocketSubject<any>;

    private environment: (number)[][];
    public randomSeed: number = 0;
    private mapPaths: string[] = [
        '/battlefields/rocky-water-field.png',
        '/battlefields/snowy-water-field.png',
        '/battlefields/wooded-water-field.png',  
        '/battlefields/desert-water-field.png',
        '/battlefields/basic-field.png',      
    ]
    public backgroundImage: string = '';

    constructor(){
        this.server = webSocket('ws://localhost:3000')
        this.server.subscribe();
        this.strategoBoard = [
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null, null],
        ]
        this._safeSquares = this.findSafeSquares();
        this.environment = this.getEnvironment();
    }

    getEnvironment() {
        // rocky-water-field
        if (this.randomSeed === 0) {
            return this.environment = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
        } 
        // snowy-water-field
        else if (this.randomSeed === 1) {
            return this.environment = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
        }
        // wooded-water-field
        else if (this.randomSeed === 2) {
            return this.environment = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
        }
        // desert-water-field
        else if (this.randomSeed === 3) {
            return this.environment = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
        }
        // basic-field
        else {
            return this.environment = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
        }
    }

    async init(): Promise<void> {
        let response: ConnectionResponse = await new Promise((resolve) => {
            this.server.asObservable().pipe(first()).subscribe((msg) => {
                resolve(msg);
            })
          });
        if (!response.gameStarted) {
            response = await new Promise((resolve) => {
            this.server.asObservable().pipe(first()).subscribe((msg) => {
                resolve(msg);
                })
            });
        }
        this.backgroundImage = this.mapPaths[response.randomSeed];
        
        if (response.player == 1) {
            let pieces = this.generatePieces(Color.Blue);
            let positions = this.randomizePositions(false);
            this.server.next(JSON.stringify({'pieces': pieces, 'positions': positions}));
            while (positions.length > 0) {
                let pos = positions.pop()!;
                this.strategoBoard[pos[0]][pos[1]] = pieces.pop()!;
            }
            let data: OpponentData = await new Promise((resolve) => {
                this.server.asObservable().pipe(first()).subscribe(msg => {
                    resolve(msg);
                })
            });
            let pieces2 = data.pieces;
            let positions2 = data.positions;
            while (positions2.length > 0) {
                let pos = positions2.pop()!;
                let pieceCode = pieces2.pop()!;
                this.strategoBoard[pos[0]][pos[1]] =  this.pieceFromCode(pieceCode, Color.Red);
            }
        } else {
            this._playerColor = Color.Red;
            let pieces2 = this.generatePieces(Color.Red);
            let positions2 = this.randomizePositions(true);
            this.server.next(JSON.stringify({'pieces': pieces2, 'positions': positions2}));
            while (positions2.length > 0) {
                let pos = positions2.pop()!;
                this.strategoBoard[pos[0]][pos[1]] = pieces2.pop()!;
            }
            let data: OpponentData = await new Promise((resolve) => {
                this.server.asObservable().pipe(first()).subscribe(msg => {
                    resolve(msg);
                })
            });
            let pieces = data.pieces;
            let positions = data.positions;
            while (positions.length > 0) {
                let pos = positions.pop()!;
                let pieceCode = pieces.pop()!;
                this.strategoBoard[pos[0]][pos[1]] =  this.pieceFromCode(pieceCode, Color.Blue);
            }
        }
        this._safeSquares = this.findSafeSquares();
    }

    public async waitForMove() {
        let {x1, x2, y1, y2, gameOver}: MoveData = await new Promise((resolve) => {
            this.server.asObservable().pipe(take(1)).subscribe(msg => {
                resolve(JSON.parse(msg.toString()))
            })
        });
        return {x1, y1, x2, y2, gameOver};
    }

    public get playerColor(): Color {
        return this._playerColor;
    }

    public get turnColor(): Color {
        return this._turnColor;
    }

    public get gameOver(): boolean {
        return this._gameOver;
    }

    public set gameOver(go: boolean) {
        this._gameOver = go;
    }

    public get strategoBoardView(): (FENChar|null)[][] {
        return this.strategoBoard.map(row => {
            return row.map(piece => piece instanceof Piece ? piece.FENChar : null);
        });
    }

    public get safeSquares(): SafeSquares {
        return this._safeSquares;
    }

    public randomizePositions(invert: boolean): number[][] {
        let pos: number[] = [];
        for (let index = 0; index < 48; index++) {
            pos.push(index);            
        }
        pos = this.shuffle(pos);
        let positions = [];
        for(let p of pos.slice(0, 40)) {
            let r = Math.floor(p / 12)
            let c = p % 12
            if (invert) {
                positions.push([11-r, 11-c]);
            } else {
                positions.push([r, c]);
            }
        }
        return positions;
    }

    // Fisher-Yates Shuffle Algorithm
    public shuffle(array: number[]): number[] {
        let currInd = array.length;

        while (currInd != 0) {
            let randInd = Math.floor(Math.random() * currInd);
            currInd--;
            [array[currInd], array[randInd]] = [array[randInd], array[currInd]];
        }
        return array;
    }

    public generatePieces(color: Color) {
        let pieces: Piece[] = [
            new Flag(color), new Assassin(color), new General(color), new Marine(color),
            new Dragoon(color), new Dragoon(color)
        ];
        for (let index = 0; index < 3; index++) {
            pieces.push(new Artillery(color))
        }
        for (let index = 0; index < 4; index++) {
            pieces.push(new Cavalry(color))
        }
        for (let index = 0; index < 5; index++) {
            pieces.push(new Courier(color))
        }
        for (let index = 0; index < 5; index++) {
            pieces.push(new Infantry(color))
        }
        for (let index = 0; index < 5; index++) {
            pieces.push(new Sapper(color))
        }
        for (let index = 0; index < 6; index++) {
            pieces.push(new Scout(color))
        }
        for (let index = 0; index < 6; index++) {
            pieces.push(new Bomb(color))
        }
        return pieces;
    }

    public pieceFromCode(c: Piece, color: Color): Piece {
        switch (JSON.parse(JSON.stringify(c))._FENChar.toUpperCase()) {
        case "S":
            return new Scout(color);
        case "P":
            return new Sapper(color);
        case "I":
            return new Infantry(color);
        case "C":
            return new Courier(color);
        case "H":
            return new Cavalry(color);
        case "A":
            return new Artillery(color);
        case "D":
            return new Dragoon(color);
        case "M":
            return new Marine(color);
        case "G":
            return new General(color);
        case "K":
            return new Assassin(color);
        case "F":
            return new Flag(color);        
        default:
            return new Bomb(color);
        }
    }

    public areCoordsValid(x: number, y: number): boolean {
        return x >= 0 && y >= 0 && x < this.strategoBoardSize && y < this.strategoBoardSize;
    }

    private findSafeSquares(): SafeSquares{
        const safeSquares: SafeSquares = new Map<string, Coords[]>();

        for (let x = 0; x < this.strategoBoardSize; x++) {
            for (let y = 0; y < this.strategoBoardSize; y++) {
                const piece: Piece | null = this.strategoBoard[x][y];
                // cant move it if it's not your piece or if its a blank tile
                if (!piece || piece.color !== this._playerColor) continue;
                // if (!piece) continue;

                const pieceSafeSquares: Coords[] = [];
                for (const {x: dx, y: dy} of piece.directions) {
                    let newX: number = x + dx;
                    let newY: number = y + dy;

                    // if the new move would take you off the board, it continues
                    if (!this.areCoordsValid(newX, newY)) continue;

                    let newPiece: Piece | null = this.strategoBoard[newX][newY];
                    
                    if (newPiece && newPiece.color === piece.color) continue;

                    if (piece instanceof Bomb || piece instanceof Flag) {
                    } else if (piece instanceof Scout) {
                        while (this.areCoordsValid(newX, newY)) {
                            newPiece = this.strategoBoard[newX][newY];
                            // cant move to a space already occupied by your own piece
                            if (newPiece && newPiece.color === piece.color) break;
                            if (this.environment[newX][newY] === 1) break;
                            pieceSafeSquares.push({x: newX, y: newY});

                            if (newPiece !== null) break;
                            newX += dx;
                            newY += dy;
                        }
                    } else if (piece instanceof Cavalry) {
                        pieceSafeSquares.push({x: newX, y: newY});
                        if (newPiece != null) continue;
                        newX += dx;
                        newY += dy;
                        if (!this.areCoordsValid(newX, newY)) continue;
                        newPiece = this.strategoBoard[newX][newY];
                        if (newPiece && newPiece.color === piece.color) continue;
                        pieceSafeSquares.push({x: newX, y: newY});
                    } else {
                        pieceSafeSquares.push({x: newX, y: newY});
                    }
                }
                if (pieceSafeSquares.length) {
                    safeSquares.set(x + "," + y, pieceSafeSquares);
                }
            }
        }
        return safeSquares;
    }

    public move(prevX: number, prevY: number, newX: number, newY: number): void {
        if (!this.areCoordsValid(prevX, prevY) || !this.areCoordsValid(newX, newY)) return;
        const piece: Piece | null = this.strategoBoard[prevX][prevY];
        if (!piece || piece.color !== this._playerColor || this._playerColor !== this._turnColor) return;
        if (!piece) return;

        const pieceSafeSquares: Coords[] | undefined = this._safeSquares.get(prevX + "," + prevY);
        if (!pieceSafeSquares || !pieceSafeSquares.find(coords => coords.x === newX && coords.y === newY))
            throw new Error("Square is not safe");

        this.strategoBoard[prevX][prevY] = null;
        const opponentPiece: Piece | null = this.strategoBoard[newX][newY];
        if (opponentPiece instanceof Flag) {
            this.gameOver = true;
            console.log(`${this._playerColor + 1} Player Wins`);
        }
        if (!opponentPiece) {
            this.strategoBoard[newX][newY] = piece;
        } else {
            this.strategoBoard[newX][newY] = this.comparePieces(piece, opponentPiece);
        }

        if (this.strategoBoardView[newX][newY]?.toUpperCase() == "C") {
            this.server.next(JSON.stringify({x1: prevX, y1: prevY, x2: newX, y2: newY, gameOver: this.gameOver, drag: true}));
        } else {
        this.server.next(JSON.stringify({x1: prevX, y1: prevY, x2: newX, y2: newY, gameOver: this.gameOver}));
        }
        
        this._safeSquares = this.findSafeSquares();
        this._turnColor = this._turnColor === Color.Blue ? Color.Red : Color.Blue;
    }

    public moveOpponent(prevX: number, prevY: number, newX: number, newY: number): void {
        if (!this.areCoordsValid(prevX, prevY) || !this.areCoordsValid(newX, newY)) return;
        const piece: Piece | null = this.strategoBoard[prevX][prevY];
        if (!piece) return;

        this.strategoBoard[prevX][prevY] = null;
        const opponentPiece: Piece | null = this.strategoBoard[newX][newY];
        if (opponentPiece instanceof Flag) {
            this.gameOver = true;
            console.log(`${this._playerColor + 1} Player Wins`);
        }
        if (!opponentPiece) {
            this.strategoBoard[newX][newY] = piece;
        } else {
            this.strategoBoard[newX][newY] = this.comparePieces(piece, opponentPiece);
        }
        this._safeSquares = this.findSafeSquares();
        this._turnColor = this._turnColor === Color.Blue ? Color.Red : Color.Blue;
    }

    public moveOpponentDrag(prevX: number, prevY: number, newX: number, newY: number): void {
        if (!this.areCoordsValid(prevX, prevY) || !this.areCoordsValid(newX, newY)) return;
        const piece: Piece | null = this.strategoBoard[prevX][prevY];
        if (!piece) return;

        this.strategoBoard[prevX][prevY] = null;
        const opponentPiece: Piece | null = this.strategoBoard[newX][newY];
        if (opponentPiece instanceof Flag) {
            this.gameOver = true;
            console.log(`${this._playerColor + 1} Player Wins`);
        }
        if (!opponentPiece) {
            this.strategoBoard[newX][newY] = piece;
        } else {
            this.strategoBoard[newX][newY] = this.comparePieces(piece, opponentPiece);
        }
        this._safeSquares = this.findSafeSquares();
    }

    public comparePieces(a: Piece, b: Piece): Piece | null {
        if (a instanceof Sapper && b instanceof Bomb) {
            return a;
        } else if (a instanceof Artillery && b instanceof Bomb) {
            return null;
        } else if (a instanceof Assassin && (b instanceof General || b instanceof Assassin)) {
            return a;
        } else if (a.attack >= b.defense) {
            return a;
        } else {
            return b;
        }
    }

    public visible(x: number, y: number): boolean {
        return this.strategoBoard[x][y]?.color === this._playerColor;
    }

    public checkCourierTargets(x: number, y: number): Coords[] {
        let targets: Coords[] = [];
        for (let t of [[1, 0], [0, -1], [-1, 0], [0, 1]]) {
            if (this.areCoordsValid(t[0]+x, t[1]+y) && this.strategoBoard[t[0]+x][t[1]+y]?.color === this.playerColor) {
                targets.push({x: t[0]+x, y: t[1]+y})
            }
        }
        return targets;
    }

    public invertTurn(): void {
        this._turnColor = this.turnColor === Color.Blue ? Color.Red : Color.Blue;
    }

    public drag(prevX: number, prevY: number, newX: number, newY: number): void {
        const piece: Piece | null = this.strategoBoard[prevX][prevY];
        if (!piece || piece.color !== this._playerColor || this._playerColor !== this._turnColor) return;
        if (!piece) return;

        this.strategoBoard[prevX][prevY] = null;
        this.strategoBoard[newX][newY] = piece;
        this.server.next(JSON.stringify({x1: prevX, y1: prevY, x2: newX, y2: newY, gameOver: this.gameOver}));
        
        this._safeSquares = this.findSafeSquares();
        this._turnColor = this._turnColor === Color.Blue ? Color.Red : Color.Blue;
    }

    public noDrag(): void {
        this.server.next(JSON.stringify({x1: -1, y1: -1, x2: -1, y2: -1, gameOver: this.gameOver}))
        this._turnColor = this._turnColor === Color.Blue ? Color.Red : Color.Blue;
    }
}

type ConnectionResponse = {
    gameStarted: boolean;
    player: number;
    randomSeed: number;
}

type OpponentData = {
    pieces: Piece[];
    positions: number[][];
}

type MoveData = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    gameOver: boolean;
}