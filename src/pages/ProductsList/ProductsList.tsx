import { CircularProgress, Stack, Typography } from '@mui/material'
import { Product } from '../../types'
import { ProductItem } from '../../components/ProductItem/ProductItem'
import Grid2 from '@mui/material/Unstable_Grid2'
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

    const uniqueCategories = useMemo(
        () => Array.from(new Set(data?.map((item) => item.category))),
        [data]
    )

    const products = filterProducts(data || [], searchText, selectedCategories)

    return (
        <Stack spacing={2}>
            <Typography variant="h3">Product list</Typography>

            <Stack direction="row" spacing={2} px={0.5}>
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
            </Stack>

            <Grid2 container spacing={1}>
                {isLoading && (
                    <CircularProgress data-testid="loading-spinner" />
                )}
                {products?.map((product) => (
                    <Grid2 key={product.id} lg={3} md={4} sm={6} xs={12}>
                        <ProductItem {...product} />
                    </Grid2>
                ))}
            </Grid2>

            <Stack
                direction="row"
                useFlexGap
                flexWrap="wrap"
                spacing={2}
            ></Stack>
        </Stack>
    )
}
