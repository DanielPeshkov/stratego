import { Attack, Color, Coords, Defense, FENChar, Swim } from "../models";
import { Piece } from "./piece";

// Marine is strong and can Swim
export class Marine extends Piece{
    protected override _FENChar: FENChar;
    protected override _directions: Coords[] = [
        {x: 1, y: 0},
        {x: -1, y: 0},
        {x: 0, y: 1},
        {x: 0, y: -1}
    ];
    protected override _attack: Attack = 9;
    protected override _defense: Defense = 9;
    protected override _swim: Swim = true;

    constructor(private pieceColor: Color) {
        super(pieceColor);
        this._FENChar = pieceColor === Color.Red ? FENChar.RedMarine : FENChar.BlueMarine;
    }
}