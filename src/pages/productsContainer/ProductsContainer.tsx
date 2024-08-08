import {
    Box,
    Button,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { Product } from '../../types'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { Filter } from '../../components/filter/Filter'
import { Search } from '../../components/search/Search'
import { ProductList } from '../../components/productList/ProductList'
import { filterProductsByNameAndCategory } from './filterProducts'

const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`)
    return await res.json()
}

export const ProductsContainer = () => {
    const [searchText, setSearchText] = useState('')
    const [selectedCategories, setSelectedCategoryList] = useState<string[]>([])
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })

    const isLargeScreen = useMediaQuery<Theme>((theme) =>
        theme.breakpoints.up('md')
    )

    const uniqueCategories = useMemo(
        () => Array.from(new Set(data?.map((item) => item.category))),
        [data]
    )

    const products = useMemo(
        () =>
            filterProductsByNameAndCategory(
                data || [],
                searchText,
                selectedCategories
            ),
        [data, searchText, selectedCategories]
    )

    const onCategorySelectionChange = useCallback(
        (updatedCategorySelection: string[]) =>
            setSelectedCategoryList(updatedCategorySelection),
        []
    )

    const resetFiltersAndSearch = () => {
        setSelectedCategoryList([])
        setSearchText('')
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h3">Product list</Typography>

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent={'flex-start'}
                spacing={[2, 2]}
            >
                <Search
                    searchText={searchText}
                    onSearchTextChange={(value) => setSearchText(value)}
                />
                <Filter
                    categoryList={uniqueCategories}
                    selectedCategories={selectedCategories}
                    onCategorySelectionChange={onCategorySelectionChange}
                />

                {isLargeScreen && (
                    <Button onClick={resetFiltersAndSearch}>Clear</Button>
                )}
            </Stack>

            <Box pt={4}>
                <ProductList isLoading={isLoading} products={products} />
            </Box>
        </Stack>
    )
}
