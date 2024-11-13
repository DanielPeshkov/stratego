import { Attack, Color, Coords, Defense, FENChar, Swim } from "../models";
import { Piece } from "./piece";

// 
export class Bomb extends Piece{
    protected override _FENChar: FENChar;
    protected override _directions: Coords[] = [
        {x: 0, y: 0},
    ];
    protected override _attack: Attack = 0;
    protected override _defense: Defense = 15;
    protected override _swim: Swim = false;

    constructor(private pieceColor: Color) {
        super(pieceColor);
        this._FENChar = pieceColor === Color.Red ? FENChar.RedBomb : FENChar.BlueBomb;
    }
}