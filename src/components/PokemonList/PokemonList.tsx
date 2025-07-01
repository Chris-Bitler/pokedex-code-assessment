import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { getTypesJsx } from 'src/util';
import { Search } from './Search';
import { useNavigate } from 'react-router-dom';
import { getTypeCssProperties } from '../../util';
import { SearchType } from './types';

export const PokemonList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pokemons, loading, error } = useGetPokemons();
  const [visiblePokemon, setVisiblePokemon] = useState<Pokemon[]>([]);

  // Not memoizing the result here because this only called when input changes
  const handleSearchInputUpdate = useCallback(
    (query: string, filterType: SearchType) => {
      // Shortcircuit if no input
      if (query.length == 0) {
        setVisiblePokemon(pokemons);
        return;
      }
      const filteredPokemon = pokemons.filter((pokemon) => {
        switch (filterType) {
          case SearchType.Name:
            return pokemon.name.toLowerCase().includes(query.toLowerCase());
          case SearchType.Number: {
            const numberInt = parseInt(pokemon.number);
            const queryInt = parseInt(query);
            return (
              !Number.isNaN(numberInt) &&
              !Number.isNaN(queryInt) &&
              numberInt == queryInt
            );
          }
          case SearchType.Type:
            return pokemon.types.some((type) =>
              type.toLowerCase().includes(query.toLowerCase())
            );
        }
      });
      setVisiblePokemon(filteredPokemon);
    },
    [pokemons]
  );

  useEffect(() => {
    setVisiblePokemon(pokemons);
  }, [pokemons]);

  let contents;

  switch (true) {
    case !!error:
      contents = (
        <div>
          An error has occurred trying to load the list of pokemon, please try
          again later.
        </div>
      );
    case !loading && visiblePokemon.length == 0:
      contents = <div>No pokemon found for search</div>;
      break;
    case !loading && visiblePokemon.length > 0:
      contents = (
        <>
          <table className={classes.table}>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Type(s)</th>
            </tr>
            <tbody>
              {visiblePokemon.map((pokemon) => (
                <tr
                  key={pokemon.id}
                  className={classes.item}
                  onClick={() => navigate(`name/${pokemon.name}`)}
                  data-testid={`pokemon-row-${pokemon.name}`}
                >
                  <td className="number">{pokemon.number}</td>
                  <td className="image">
                    <img src={pokemon.image} className="image" />
                  </td>
                  <td className="name">{pokemon.name}</td>
                  <td className="tableTypes">{getTypesJsx(pokemon.types)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
      break;
    case loading:
    default:
      contents = <div>Loading...</div>;
      break;
  }

  return (
    <div className={classes.root}>
      {!loading && <Search handleSearchInputUpdate={handleSearchInputUpdate} />}
      {contents}
    </div>
  );
};

const typeCssProperties = getTypeCssProperties('left');
const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    table: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '32px',
      borderCollapse: 'collapse',
      minWidth: '700px',
      width: '100%',
      textAlign: 'left',
      '& th': {
        borderBottom: '1px solid',
      },
      '& tbody': {
        '& tr': {
          borderBottom: '1px solid rgba(105, 105, 105, 0.23)',
          '& td': {
            paddingTop: '4px',
          },
          '& .number': {
            width: '9%',
          },
          '& .image': {
            width: '24%',
          },
          '& .name': {
            width: '26%',
          },
          '& .tableTypes': {
            width: '41%',
          },
        },
      },
    },
    item: {
      '& .image': {
        width: '80px',
        height: '80px',
      },
      ...typeCssProperties,
      '&:hover': {
        backgroundColor: '#374868',
      },
    },
  },
  { name: 'PokemonList' }
);
