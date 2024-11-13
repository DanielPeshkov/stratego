import { Attack, Color, Coords, Defense, FENChar } from "../models";
import { Piece } from "./piece";

// Scout moves like a rook in chess
export class Scout extends Piece{
    protected override _FENChar: FENChar;
    protected override _directions: Coords[] = [
        {x: 1, y: 0},
        {x: -1, y: 0},
        {x: 0, y: 1},
        {x: 0, y: -1}
    ];
    protected override _attack: Attack = 2;
    protected override _defense: Defense = 2;

    constructor(private pieceColor: Color) {
        super(pieceColor);
        this._FENChar = pieceColor === Color.Red ? FENChar.RedScout : FENChar.BlueScout;
    }
}