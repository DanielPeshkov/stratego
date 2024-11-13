import { Attack, Color, Coords, Defense, FENChar, Swim } from "../models";
import { Piece } from "./piece";

export class Artillery extends Piece{
    protected override _FENChar: FENChar;
    protected override _directions: Coords[] = [
        {x: 1, y: 0},
        {x: -1, y: 0},
        {x: 0, y: 1},
        {x: 0, y: -1}
    ];
    protected override _attack: Attack = 7;
    protected override _defense: Defense = 7;
    protected override _swim: Swim = false;

    constructor(private pieceColor: Color) {
        super(pieceColor);
        this._FENChar = pieceColor === Color.Red ? FENChar.RedArtillery : FENChar.BlueArtillery;
    }
}