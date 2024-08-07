import { TextField } from '@mui/material'

type SearchProps = {
    searchText: string
    onSearchTextChange: (searchText: string) => void
}

export const Search = ({ searchText, onSearchTextChange }: SearchProps) => {
    return (
        <TextField
            sx={{ width: 300 }}
            placeholder="Search..."
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
        />
    )
}
