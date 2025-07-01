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
          <div className={classes.table}>
            <ul className='headers'>
              <li className='numberItem'>ID</li>
              <li className='imageItem'>Image</li>
              <li className='nameItem'>Name</li>
              <li className='tableTypesItem'>Type(s)</li>
            </ul>
            {visiblePokemon.map((pokemon) => (
              <ul
                key={pokemon.id}
                className={classes.item}
                onClick={() => navigate(`name/${pokemon.name}`)}
                data-testid={`pokemon-row-${pokemon.name}`}
              >
                <li className="numberItem">{pokemon.number}</li>
                <li className="imageItem">
                  <img src={pokemon.image} className="image" />
                </li>
                <li className="nameItem">{pokemon.name}</li>
                <li className="tableTypesItem">
                  <div className='typesContainer'>
                    {getTypesJsx(pokemon.types)}
                  </div>
                </li>
              </ul>
            ))}
          </div>
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

const typeCssProperties = getTypeCssProperties('center');
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
      width: '100%',
      textAlign: 'left',
      '& ul': {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0',
        marginBottom: '0',
        flexDirection: 'row',
        '@media (max-width: 700px)': {
          flexDirection: 'column',
          '& li': {
            width: '100% !important',
            textAlign: 'center',
          }
        } 
      },
      '& .headers': {
        borderBottom: '1px solid',
        listStyleType: 'none',
        '@media (max-width: 700px)': {
          display: 'none',
        }
      },
      '& th': {
        borderBottom: '1px solid',
      },
      '& ul:not(.headers)': {
        borderBottom: '1px solid rgba(105, 105, 105, 0.23)',
        listStyleType: 'none',
        '& li': {
          paddingTop: '4px',
        },
        '@media (max-width: 700px)': {
          paddingLeft: '0',
        }
      },
      '& .numberItem': {
        width: '9%',
      },
      '& .imageItem': {
        width: '24%',
      },
      '& .nameItem': {
        width: '26%',
      },
      '& .tableTypesItem': {
        width: '41%',
        '& .typesContainer': {
          height: '100%',
          display: 'flex',
          '@media (max-width: 700px)': {
            justifyContent: 'center',
            marginBottom: '10px',
          }
        }
      },
    },
    item: {
      '& .image': {
        width: '80px',
        height: '80px',
      },
      ...typeCssProperties,
      '&:hover, &:active': {
        backgroundColor: '#374868',
      },
    },
  },
  { name: 'PokemonList' }
);
