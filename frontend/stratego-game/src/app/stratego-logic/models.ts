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
    [FENChar.RedScout]: "assets/pieces/scout-icon.png",
    [FENChar.RedSapper]: "assets/pieces/sapper-icon.png",
    [FENChar.RedInfantry]: "assets/pieces/infantry-icon.png",
    [FENChar.RedCourier]: "assets/pieces/courier-icon.png",
    [FENChar.RedCavalry]: "assets/pieces/cavalry-icon.png",
    [FENChar.RedArtillery]: "assets/pieces/artillery-icon.png",
    [FENChar.RedDragoon]: "assets/pieces/dragoon-icon.png",
    [FENChar.RedMarine]: "assets/pieces/marine-icon.png",
    [FENChar.RedGeneral]: "assets/pieces/general-icon.png",
    [FENChar.RedAssassin]: "assets/pieces/assassin-icon.png",
    [FENChar.RedFlag]: "assets/pieces/redFlag-icon.png",
    [FENChar.RedBomb]: "assets/pieces/bomb-icon.png",
    [FENChar.BlueScout]: "assets/pieces/scout-icon.png",
    [FENChar.BlueSapper]: "assets/pieces/sapper-icon.png",
    [FENChar.BlueInfantry]: "assets/pieces/infantry-icon.png",
    [FENChar.BlueCourier]: "assets/pieces/courier-icon.png",
    [FENChar.BlueCavalry]: "assets/pieces/cavalry-icon.png",
    [FENChar.BlueArtillery]: "assets/pieces/artillery-icon.png",
    [FENChar.BlueDragoon]: "assets/pieces/dragoon-icon.png",
    [FENChar.BlueMarine]: "assets/pieces/marine-icon.png",
    [FENChar.BlueGeneral]: "assets/pieces/general-icon.png",
    [FENChar.BlueAssassin]: "assets/pieces/assassin-icon.png",
    [FENChar.BlueFlag]: "assets/pieces/blueFlag-icon.png",
    [FENChar.BlueBomb]: "assets/pieces/bomb-icon.png"
}