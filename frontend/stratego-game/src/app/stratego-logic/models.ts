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
    
    [FENChar.RedScout]: "assets/piece-icons/scout-icon.png",
    [FENChar.RedSapper]: "assets/piece-icons/sapper-icon.png",
    [FENChar.RedInfantry]: "assets/piece-icons/infantry-icon.png",
    [FENChar.RedCourier]: "assets/piece-icons/courier-icon.png",
    [FENChar.RedCavalry]: "assets/piece-icons/cavalry-icon.png",
    [FENChar.RedArtillery]: "assets/piece-icons/artillery-icon.png",
    [FENChar.RedDragoon]: "assets/piece-icons/dragoon-icon.png",
    [FENChar.RedMarine]: "assets/piece-icons/marine-icon.png",
    [FENChar.RedGeneral]: "assets/piece-icons/general-icon.png",
    [FENChar.RedAssassin]: "assets/piece-icons/assassin-icon.png",
    [FENChar.RedFlag]: "assets/piece-icons/redFlag-icon.png",
    [FENChar.RedBomb]: "assets/piece-icons/bomb-icon.png",
    [FENChar.BlueScout]: "assets/piece-icons/scout-icon.png",
    [FENChar.BlueSapper]: "assets/piece-icons/sapper-icon.png",
    [FENChar.BlueInfantry]: "assets/piece-icons/infantry-icon.png",
    [FENChar.BlueCourier]: "assets/piece-icons/courier-icon.png",
    [FENChar.BlueCavalry]: "assets/piece-icons/cavalry-icon.png",
    [FENChar.BlueArtillery]: "assets/piece-icons/artillery-icon.png",
    [FENChar.BlueDragoon]: "assets/piece-icons/dragoon-icon.png",
    [FENChar.BlueMarine]: "assets/piece-icons/marine-icon.png",
    [FENChar.BlueGeneral]: "assets/piece-icons/general-icon.png",
    [FENChar.BlueAssassin]: "assets/piece-icons/assassin-icon.png",
    [FENChar.BlueFlag]: "assets/piece-icons/blueFlag-icon.png",
    [FENChar.BlueBomb]: "assets/piece-icons/bomb-icon.png"
}