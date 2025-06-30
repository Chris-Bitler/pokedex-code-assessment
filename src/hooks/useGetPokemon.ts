import { useMemo } from 'react';
import { QueryResult, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  number: string;
  name: string;
  weight: {
    minimum: number;
    maximum: number;
  };
  height: {
    minimum: number;
    maximum: number;
  };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
};

export type UseGetPokemonArguments = {
  id?: string;
  name?: string;
};
export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemon = ({
  id,
  name,
}: UseGetPokemonArguments): Omit<
  QueryResult & { pokemon: Pokemon },
  'data'
> => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      id,
      name,
    },
  });

  // Note: This memoization may not be necessary as the normalized cache used by useQuery should maintain
  // a stable reference to the pokemon property of `data` as long as it doesn't change.
  const pokemon: Pokemon = useMemo(() => data?.pokemon || [], [data]);
  return {
    pokemon,
    ...queryRes,
  };
};
