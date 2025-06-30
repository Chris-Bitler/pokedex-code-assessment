import { useMemo } from 'react';
import { QueryResult, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  name: string;
  number: string;
  types: string[];
  image: string;
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      types
      image
    }
  }
`;

export const useGetPokemons = (): Omit<
  QueryResult & { pokemons: Pokemon[] },
  'data'
> => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  // Note: This memoization may not be necessary as the normalized cache used by useQuery should maintain
  // a stable reference to the pokemons property of `data` as long as it doesn't change.
  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);
  return {
    pokemons,
    ...queryRes,
  };
};
