import { Box, CircularProgress, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Product } from '../../types'
import { ProductItem } from '../productItemCard/ProductItem'

type ProductListProps = {
    isLoading: boolean
    products: Product[]
}
export const ProductList = ({ isLoading, products }: ProductListProps) => {
    if (!isLoading && !products.length) {
        return (
            <Box
                p={4}
                height={300}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h6">No products found</Typography>
            </Box>
        )
    }

    return (
        <Grid container spacing={[4, 2]}>
            {isLoading && <CircularProgress data-testid="loading-spinner" />}
            {products?.map((product) => (
                <Grid key={product.id} lg={3} md={4} sm={6} xs={12}>
                    <ProductItem {...product} />
                </Grid>
            ))}
        </Grid>
    )
}
