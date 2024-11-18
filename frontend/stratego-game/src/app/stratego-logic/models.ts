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
    [FENChar.RedScout]: "/pieces/redScout-icon.png",
    [FENChar.RedSapper]: "/pieces/redSapper-icon.png",
    [FENChar.RedInfantry]: "/pieces/redInfantry-icon.png",
    [FENChar.RedCourier]: "/pieces/redCourier-icon.png",
    [FENChar.RedCavalry]: "/pieces/redCavalry-icon.png",
    [FENChar.RedArtillery]: "/pieces/redArtillery-icon.png",
    [FENChar.RedDragoon]: "/pieces/redDragoon-icon.png",
    [FENChar.RedMarine]: "/pieces/redMarine-icon.png",
    [FENChar.RedGeneral]: "/pieces/redGeneral-icon.png",
    [FENChar.RedAssassin]: "/pieces/redAssassin-icon.png",
    [FENChar.RedFlag]: "/pieces/redFlag-icon.png",
    [FENChar.RedBomb]: "/pieces/bomb-icon.png",
    [FENChar.BlueScout]: "/pieces/blueScout-icon.png",
    [FENChar.BlueSapper]: "/pieces/blueSapper-icon.png",
    [FENChar.BlueInfantry]: "/pieces/blueInfantry-icon.png",
    [FENChar.BlueCourier]: "/pieces/blueCourier-icon.png",
    [FENChar.BlueCavalry]: "/pieces/blueCavalry-icon.png",
    [FENChar.BlueArtillery]: "/pieces/blueArtillery-icon.png",
    [FENChar.BlueDragoon]: "/pieces/blueDragoon-icon.png",
    [FENChar.BlueMarine]: "/pieces/blueMarine-icon.png",
    [FENChar.BlueGeneral]: "/pieces/blueGeneral-icon.png",
    [FENChar.BlueAssassin]: "/pieces/blueAssassin-icon.png",
    [FENChar.BlueFlag]: "/pieces/blueFlag-icon.png",
    [FENChar.BlueBomb]: "/pieces/bomb-icon.png"
}