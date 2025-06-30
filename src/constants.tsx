import { createTheme, PaletteMode } from "@mui/material";

const themeProperties = {
    palette: {
        mode: 'dark' as PaletteMode
    }
}

export const theme = createTheme(themeProperties);

// Provided API doesn't provide an endpoint for getting type, hardcoded for now
export enum TYPES {
    BUG = 'Bug',
    DRAGON = 'Dragon',
    ELECTRIC = 'Electric',
    FIGHTING = 'Fighting',
    FIRE = 'Fire',
    FLYING = 'Flying',
    GHOST = 'Ghost',
    GRASS = 'Grass',
    GROUND = 'Ground',
    ICE = 'Ice',
    NORMAL = 'Normal',
    POISON = 'Poison',
    PSYCHIC = 'Psychic',
    ROCK = 'Rock',
    WATER = 'Water',
    FAIRY = 'Fairy',
}

// Hex codes referenced from https://bulbapedia.bulbagarden.net/wiki/Help:Color_templates#Video_game_types
export const TYPE_COLOR = {
    [TYPES.BUG]: '#91A119',
    [TYPES.DRAGON]: '#5060E1',
    [TYPES.ELECTRIC]: '#FAC000',
    [TYPES.FIGHTING]: '#FF8000',
    [TYPES.FIRE]: '#E62829',
    [TYPES.FLYING]: '#81B9EF',
    [TYPES.GHOST]: '#704170',
    [TYPES.GRASS]: '#3FA129',
    [TYPES.GROUND]: '#915121',
    [TYPES.ICE]: '#3DCEF3',
    [TYPES.NORMAL]: '#9FA19F',
    [TYPES.POISON]: '#9141CB',
    [TYPES.PSYCHIC]: '#EF4179',
    [TYPES.ROCK]: '#AFA981',
    [TYPES.WATER]: '#2980EF',
    [TYPES.FAIRY]: '#EF70EF'
}

export type GeneratedStyles = {
    [type: string]: {
        backgroundColor: typeof TYPE_COLOR,
        color: '#FFFFFF'
    }
}

export const getTypeColorStyles = (): GeneratedStyles => Object.values(TYPES).reduce((accumulator, typeValue) => ({
    ...accumulator,
    [`& .${typeValue}`]: {
        backgroundColor: TYPE_COLOR[typeValue] as string,
    }
}), {});

export const typeCssProperties = {
    '& .type': {
        borderRadius: '5px',
        textAlign: 'center',
        width: '60px',
        padding: '5px',
        display: 'inline',
        color: '#FFFFFF',
    },
    '& .typeContainer': {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left',
        gap: '5px',
    },
    ...getTypeColorStyles(),
}

