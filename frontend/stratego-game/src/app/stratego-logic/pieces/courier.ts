import { Attack, Color, Coords, Defense, FENChar, Swim } from "../models";
import { Piece } from "./piece";

// Courier can drag any friendly piece behind it
// This includes bombs, flag, or other pieces
// The piece being "dragged" will just inhabit the last tile Courier was in
// to create a "drag" effect. 
// Choosing when to drag and when to drop will be options for the player, could get tricky but fun
export class Courier extends Piece{
    protected override _FENChar: FENChar;
    protected override _directions: Coords[] = [
        {x: 1, y: 0},
        {x: -1, y: 0},
        {x: 0, y: 1},
        {x: 0, y: -1}
    ];
    protected override _attack: Attack = 5;
    protected override _defense: Defense = 5;
    protected override _swim: Swim = false;

    constructor(private pieceColor: Color) {
        super(pieceColor);
        this._FENChar = pieceColor === Color.Red ? FENChar.RedCourier : FENChar.BlueCourier;
    }
}