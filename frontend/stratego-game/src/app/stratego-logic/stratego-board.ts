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

export class StrategoBoard{
    private strategoBoard:(Piece|null)[][];
    private strategoBoardSize: number = 12;
    private _playerColor = Color.Blue;
    private _safeSquares: SafeSquares;

    constructor(){
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
        let pieces = this.generatePieces(Color.Blue);
        let positions = this.randomizePositions(false);
        while (positions.length > 0) {
            let pos = positions.pop()!;
            this.strategoBoard[pos[0]][pos[1]] = pieces.pop()!;
        }
        let pieces2 = this.generatePieces(Color.Red);
        let positions2 = this.randomizePositions(true);
        while (positions2.length > 0) {
            let pos = positions2.pop()!;
            this.strategoBoard[pos[0]][pos[1]] = pieces2.pop()!;
        }
        this._safeSquares = this.findSafeSquares();
    }

    public get playerColor(): Color {
        return this._playerColor;
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

    public areCoordsValid(x: number, y: number): boolean {
        return x >= 0 && y >= 0 && x < this.strategoBoardSize && y < this.strategoBoardSize;
    }

    private findSafeSquares(): SafeSquares{
        const safeSquares: SafeSquares = new Map<string, Coords[]>();

        for (let x = 0; x < this.strategoBoardSize; x++) {
            for (let y = 0; y < this.strategoBoardSize; y++) {
                const piece: Piece | null = this.strategoBoard[x][y];
                if (!piece || piece.color !== this._playerColor) continue;
                // if (!piece) continue;

                const pieceSafeSquares: Coords[] = [];
                for (const {x: dx, y: dy} of piece.directions) {
                    let newX: number = x + dx;
                    let newY: number = y + dy;

                    if (!this.areCoordsValid(newX, newY)) continue;

                    let newPiece: Piece | null = this.strategoBoard[newX][newY];
                    if (newPiece && newPiece.color === piece.color) continue;

                    if (piece instanceof Bomb || piece instanceof Flag) {
                    } else if (piece instanceof Scout) {
                        while (this.areCoordsValid(newX, newY)) {
                            newPiece = this.strategoBoard[newX][newY];
                            if (newPiece && newPiece.color === piece.color) break;
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
        if (!piece || piece.color !== this._playerColor) return;

        const pieceSafeSquares: Coords[] | undefined = this._safeSquares.get(prevX + "," + prevY);
        if (!pieceSafeSquares || !pieceSafeSquares.find(coords => coords.x === newX && coords.y === newY))
            throw new Error("Square is not safe");

        this.strategoBoard[prevX][prevY] = null;
        this.strategoBoard[newX][newY] = piece;

        /* Change This!! */
        this._playerColor = this._playerColor === Color.Blue ? Color.Red : Color.Blue;
        this._safeSquares = this.findSafeSquares();
    }
}