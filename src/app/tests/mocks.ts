import { GET_POKEMON } from 'src/hooks/useGetPokemon';
import { GET_POKEMONS } from 'src/hooks/useGetPokemons';

const mockPokemons = {
  data: {
    pokemons: [
      {
        id: 'UG9rZW1vbjowMDE=',
        name: 'Bulbasaur',
        number: '001',
        types: ['Grass', 'Poison'],
        image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
        __typename: 'Pokemon',
      },
      {
        id: 'UG9rZW1vbjowMDI=',
        name: 'Ivysaur',
        number: '002',
        types: ['Grass', 'Poison'],
        image: 'https://img.pokemondb.net/artwork/ivysaur.jpg',
        __typename: 'Pokemon',
      },
      {
        id: 'UG9rZW1vbjowMDM=',
        name: 'Venusaur',
        number: '003',
        types: ['Grass', 'Poison'],
        image: 'https://img.pokemondb.net/artwork/venusaur.jpg',
        __typename: 'Pokemon',
      },
      {
        id: 'UG9rZW1vbjowMDQ=',
        name: 'Charmander',
        number: '004',
        types: ['Fire'],
        image: 'https://img.pokemondb.net/artwork/charmander.jpg',
        __typename: 'Pokemon',
      },
      {
        id: 'UG9rZW1vbjowMDU=',
        name: 'Charmeleon',
        number: '005',
        types: ['Fire'],
        image: 'https://img.pokemondb.net/artwork/charmeleon.jpg',
        __typename: 'Pokemon',
      },
      {
        id: 'UG9rZW1vbjowMDY=',
        name: 'Charizard',
        number: '006',
        types: ['Fire', 'Flying'],
        image: 'https://img.pokemondb.net/artwork/charizard.jpg',
        __typename: 'Pokemon',
      },
    ],
  },
};

const mockPokemon = {
  data: {
    pokemon: {
      id: 'UG9rZW1vbjowMDE=',
      number: '001',
      name: 'Bulbasaur',
      weight: {
        minimum: '6.04kg',
        maximum: '7.76kg',
        __typename: 'PokemonDimension',
      },
      height: {
        minimum: '0.61m',
        maximum: '0.79m',
        __typename: 'PokemonDimension',
      },
      classification: 'Seed Pokémon',
      types: ['Grass', 'Poison'],
      resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
      weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
      fleeRate: 0.1,
      maxCP: 951,
      maxHP: 1071,
      image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
      __typename: 'Pokemon',
    },
  },
};

export const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        first: 151,
      },
    },
    result: mockPokemons,
  },
  {
    request: {
      query: GET_POKEMON,
      variables: {
        first: 151,
      },
    },
    result: mockPokemons,
  },
];
