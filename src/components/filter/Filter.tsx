import { FormControl, InputLabel, Select, OutlinedInput, MenuItem, SelectChangeEvent } from "@mui/material"
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type FilterProps = {
    selectedCategories: string[]
    categoryList: string[]
    onCategorySelectionChange: (value: string[]) => void
}

export const Filter = ({selectedCategories, categoryList, onCategorySelectionChange}: FilterProps) => {

    const handleChange = (event: SelectChangeEvent<typeof categoryList>) => {
        const {   target: { value }} = event;
        onCategorySelectionChange(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    return <FormControl sx={{ m: 1, width: 300 }}>
    <InputLabel id="category-filter">Filter</InputLabel>
    <Select
      labelId="category-filter"
      multiple
      value={selectedCategories}
      onChange={handleChange}
      input={<OutlinedInput label="Name" />}
      MenuProps={MenuProps}
    >
      {categoryList.map((name) => (
        <MenuItem
          key={name}
          value={name}
        >
          {name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}