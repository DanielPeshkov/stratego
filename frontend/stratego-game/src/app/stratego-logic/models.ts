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