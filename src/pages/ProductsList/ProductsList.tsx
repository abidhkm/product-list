import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { Product } from '../../types'
import { ProductItem } from '../../components/ProductItem/ProductItem'
import Grid from '@mui/material/Unstable_Grid2'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Filter } from '../../components/Filter/Filter'
import { Search } from '../../components/Search/Search'

const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('http://localhost:3001/products')
    return await res.json()
}

const filterProducts = (
    products: Product[],
    nameSearchText: string,
    categoryFilterSelection: string[]
) => {
    const nameSearchResult = products?.filter((product) =>
        String(product.name.replaceAll(' ', ''))
            .toLowerCase()
            .includes(nameSearchText.replaceAll(' ', '').toLowerCase())
    )
    const categorySearchResult = nameSearchResult.filter((product) =>
        categoryFilterSelection.length
            ? categoryFilterSelection.includes(product.category)
            : true
    )
    return categorySearchResult
}

export const Products = () => {
    const [searchText, setSearchText] = useState('')
    const [selectedCategories, setSelectedCategoryList] = useState<string[]>([])
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })
    const theme = useTheme()
    const isLargeScreen = useMediaQuery<Theme>((theme) =>
        theme.breakpoints.up('md')
    )

    const uniqueCategories = useMemo(
        () => Array.from(new Set(data?.map((item) => item.category))),
        [data]
    )

    const products = filterProducts(data || [], searchText, selectedCategories)

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
                    onCategorySelectionChange={(updatedCategorySelection) =>
                        setSelectedCategoryList(updatedCategorySelection)
                    }
                />

                {isLargeScreen && (
                    <Button onClick={resetFiltersAndSearch}>Clear</Button>
                )}
            </Stack>

            <Box pt={4}>
                <Grid container spacing={[4, 2]}>
                    {isLoading && (
                        <CircularProgress data-testid="loading-spinner" />
                    )}
                    {products?.map((product) => (
                        <Grid key={product.id} lg={3} md={4} sm={6} xs={12}>
                            <ProductItem {...product} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {!isLoading && !products.length && (
                <Box
                    p={4}
                    height={300}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="h6">No products found</Typography>
                </Box>
            )}
        </Stack>
    )
}
