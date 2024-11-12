import { Color, Coords, FENChar } from "../models";
import { Piece } from "./piece";

export class Courier extends Piece{
    protected override _FENChar: FENChar;
    protected override _directions: Coords[] = [
        {x: 0, y: 0},
    ];

    constructor(private pieceColor: Color) {
        super(pieceColor);
        this._FENChar = pieceColor === Color.Red ? FENChar.RedCourier : FENChar.BlueCourier;
    }
}