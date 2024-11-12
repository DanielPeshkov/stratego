import { FENChar, Coords, Color, Attack, Defense } from "../models";

export abstract class Piece{
    protected abstract _FENChar: FENChar;
    protected abstract _directions: Coords[];
    protected abstract _attack: Attack;
    protected abstract _defense: Defense;

    constructor(private _color: Color) {}

    public get FENChar(): FENChar{
        return this._FENChar;
    }

    public get directions(): Coords[]{
        return this._directions;
    }

    public get color(): Color {
        return this._color;
    }

    public get attack(): Attack {
        return this._attack;
    }

    public get defense(): Defense {
        return this._defense;
    }
}