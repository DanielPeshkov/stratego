import { Attack, Color, Coords, Defense, FENChar } from "../models";
import { Piece } from "./piece";

export class Flag extends Piece{
    protected override _FENChar: FENChar;
    protected override _directions: Coords[] = [
        {x: 0, y: 0}
    ];
    protected override _attack: Attack = 0;
    protected override _defense: Defense = 0;

    constructor(private pieceColor: Color) {
        super(pieceColor);
        this._FENChar = pieceColor === Color.Red ? FENChar.RedFlag : FENChar.BlueFlag;
    }
    
}