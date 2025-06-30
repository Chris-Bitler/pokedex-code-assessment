import { TextField } from "@mui/material";
import { useState } from "react";
import { createUseStyles } from "react-jss";

type SearchProps = {
    handleSearchInputUpdate: (input: string) => void;
    className?: string;
};

export const Search = ({ handleSearchInputUpdate, className = '' }: SearchProps) => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState('');
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        handleSearchInputUpdate(value);
        setSearchInput(value);
    }
    return <>
        <div className={classes.filterInputLabel}>Filter:</div>
        <TextField variant="filled" value={searchInput} onChange={handleInputChange} label="Pokemon" placeholder="Bulbasaur" className={className} data-testid="search-field" />
    </>
}

const useStyles = createUseStyles(
  {
    filterInputLabel: {
      marginBottom: "10px"
    },
  },
  { name: 'SearchInput' }
);
