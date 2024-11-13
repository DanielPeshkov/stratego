export enum Color{
    Red,
    Blue
}

export type Coords = {
    x: number;
    y: number;
}

export enum FENChar{
    RedScout="S",
    RedSapper="P",
    RedInfantry="I",
    RedCourier="C",
    RedCavalry="H",
    RedArtillery="A",
    RedDragoon="D",
    RedMarine="M",
    RedGeneral="G",
    RedAssassin="K",
    RedFlag="F",
    RedBomb="B",
    BlueScout="s",
    BlueSapper="p",
    BlueInfantry="i",
    BlueCourier="c",
    BlueCavalry="h",
    BlueArtillery="a",
    BlueDragoon="d",
    BlueMarine="m",
    BlueGeneral="g",
    BlueAssassin="k",
    BlueFlag="f",
    BlueBomb="b"
}

export type Attack = number;

export type Defense = number;

export type Swim = boolean;

export type SafeSquares = Map<string, Coords[]>;


export const pieceImagePaths: Readonly<Record<FENChar, string>> = {
    [FENChar.RedScout]: "/pieces/scout-icon.png",
    [FENChar.RedSapper]: "/pieces/sapper-icon.png",
    [FENChar.RedInfantry]: "/pieces/infantry-icon.png",
    [FENChar.RedCourier]: "/pieces/courier-icon.png",
    [FENChar.RedCavalry]: "/pieces/cavalry-icon.png",
    [FENChar.RedArtillery]: "/pieces/artillery-icon.png",
    [FENChar.RedDragoon]: "/pieces/dragoon-icon.png",
    [FENChar.RedMarine]: "/pieces/marine-icon.png",
    [FENChar.RedGeneral]: "/pieces/general-icon.png",
    [FENChar.RedAssassin]: "/pieces/assassin-icon.png",
    [FENChar.RedFlag]: "/pieces/redFlag-icon.png",
    [FENChar.RedBomb]: "/pieces/bomb-icon.png",
    [FENChar.BlueScout]: "/pieces/scout-icon.png",
    [FENChar.BlueSapper]: "/pieces/sapper-icon.png",
    [FENChar.BlueInfantry]: "/pieces/infantry-icon.png",
    [FENChar.BlueCourier]: "/pieces/courier-icon.png",
    [FENChar.BlueCavalry]: "/pieces/cavalry-icon.png",
    [FENChar.BlueArtillery]: "/pieces/artillery-icon.png",
    [FENChar.BlueDragoon]: "/pieces/dragoon-icon.png",
    [FENChar.BlueMarine]: "/pieces/marine-icon.png",
    [FENChar.BlueGeneral]: "/pieces/general-icon.png",
    [FENChar.BlueAssassin]: "/pieces/assassin-icon.png",
    [FENChar.BlueFlag]: "/pieces/blueFlag-icon.png",
    [FENChar.BlueBomb]: "/pieces/bomb-icon.png"
}