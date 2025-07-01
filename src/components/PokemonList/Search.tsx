import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { SearchType } from './types';

type SearchProps = {
  handleSearchInputUpdate: (input: string, filterType: SearchType) => void;
  className?: string;
};

const getPlaceholderByFilter = (filterType: SearchType) => {
  switch (filterType) {
    case SearchType.Name:
      return 'Bulbasaur';
    case SearchType.Number:
      return '1';
    case SearchType.Type:
      return 'Grass';
  }
};

export const Search = ({ handleSearchInputUpdate }: SearchProps) => {
  const classes = useStyles();
  const [filterType, setFilterType] = useState<SearchType>(SearchType.Name);
  const [searchInput, setSearchInput] = useState('');
  const handleQueryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchInput(value);
  };
  const handleFilterOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setFilterType(value as SearchType);
  };

  useEffect(() => {
    // Send update when either part of the search is changed
    handleSearchInputUpdate(searchInput, filterType);
  }, [searchInput, filterType]);

  return (
    <>
      <div className={classes.filterInputLabel}>Filter Pokemon:</div>
      <select
        className={`${classes.input} ${classes.filterInput}`}
        onChange={handleFilterOptionChange}
        value={filterType}
        data-testid="filter-field"
      >
        {Object.keys(SearchType).map((type) => {
          return <option value={type}>{type}</option>;
        })}
      </select>
      <input
        value={searchInput}
        onChange={handleQueryChange}
        placeholder={getPlaceholderByFilter(filterType)}
        className={`${classes.input} ${classes.textInput}`}
        data-testid="search-field"
      />
    </>
  );
};

const useStyles = createUseStyles(
  {
    filterInputLabel: {
      marginBottom: '5px',
    },
    input: {
      backgroundColor: '#171e2b',
      border: '1px solid white',
    },
    filterInput: {
      height: '30px',
      borderRight: '0',
    },
    textInput: {
      height: '24px',
      paddingLeft: '5px',
    },
  },
  { name: 'SearchInput' }
);
