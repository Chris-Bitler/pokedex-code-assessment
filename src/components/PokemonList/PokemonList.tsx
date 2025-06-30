import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getTypesJsx } from "src/util";
import { Search } from './Search';
import { useNavigate } from 'react-router-dom';
import { getTypeCssProperties } from '../../util';

export const PokemonList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pokemons, loading, error } = useGetPokemons();
  const [visiblePokemon, setVisiblePokemon] = useState<Pokemon[]>([]);

  const handleSearchInputUpdate = useCallback((query: string) => {
    // Not memoizing the result here because this only called when input changes
    const filteredPokemon = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(query.toLowerCase()));
    setVisiblePokemon(filteredPokemon);
  }, [pokemons]);

  useEffect(() => {
    setVisiblePokemon(pokemons);
  }, [pokemons]);

  const StyledTableCell = ({ children }: { children: ReactNode }) => <TableCell className='cell'>{children}</TableCell>

  let contents;

  switch(true) {
    case !!error:
      contents = <div>An error has occurred trying to load the list of pokemon, please try again later.</div>
    case !loading && visiblePokemon.length == 0:
      contents = <div>No pokemon found for search</div>;
      break;
    case !loading && visiblePokemon.length > 0:
      contents = (<>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Type(s)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visiblePokemon.map((pokemon) => (
              <TableRow key={pokemon.id} className={classes.item} onClick={() => navigate(`name/${pokemon.name}`)} data-testid={`pokemon-row-${pokemon.name}`}>
                <StyledTableCell>
                  {pokemon.number}
                </StyledTableCell>
                <StyledTableCell>
                  <img src={pokemon.image} className='image' />
                </StyledTableCell>
                <StyledTableCell>
                  {pokemon.name}
                </StyledTableCell>
                <StyledTableCell>
                  {getTypesJsx(pokemon.types)}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>);
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
    item: {
      '& .image': {
        width: '40px',
        height: '40px'
      },
      ...typeCssProperties,
      '&:hover': {
        backgroundColor: '#374868'
      }
    }
  },
  { name: 'PokemonList' }
);