import {
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material'
import { memo } from 'react'

type FilterProps = {
    selectedCategories: string[]
    categoryList: string[]
    onCategorySelectionChange: (value: string[]) => void
}

export const Filter = memo(
    ({
        selectedCategories,
        categoryList,
        onCategorySelectionChange,
    }: FilterProps) => {
        const handleChange = (
            event: SelectChangeEvent<typeof categoryList>
        ) => {
            const {
                target: { value },
            } = event
            onCategorySelectionChange(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value
            )
        }

        return (
            <FormControl
                sx={{ m: 1, minWidth: 200, width: { xs: 'unset', lg: 300 } }}
            >
                <InputLabel id="category-filter">Filter</InputLabel>
                <Select
                    labelId="category-filter"
                    id="category-filter-demo"
                    multiple
                    value={selectedCategories}
                    onChange={handleChange}
                    input={<OutlinedInput label="Filter" />}
                >
                    {categoryList.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }
)

Filter.displayName = 'Filter'
