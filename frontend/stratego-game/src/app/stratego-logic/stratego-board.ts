import { Color, FENChar } from "./models";
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
    private _playerColor = Color.Blue;

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
    }

    public get playerColor(): Color {
        return this._playerColor;
    }

    public get strategoBoardView(): (FENChar|null)[][] {
        return this.strategoBoard.map(row => {
            return row.map(piece => piece instanceof Piece ? piece.FENChar : null);
        });
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
}