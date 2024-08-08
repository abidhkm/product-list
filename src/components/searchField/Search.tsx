import { TextField } from '@mui/material'
import { memo } from 'react'

type SearchProps = {
    searchText: string
    onSearchTextChange: (searchText: string) => void
}

export const Search = memo(
    ({ searchText, onSearchTextChange }: SearchProps) => {
        return (
            <TextField
                fullWidth
                sx={{ width: { xs: 'unset', lg: 300 } }}
                placeholder="Search..."
                value={searchText}
                onChange={(e) => onSearchTextChange(e.target.value)}
            />
        )
    }
)

Search.displayName = 'Search'
