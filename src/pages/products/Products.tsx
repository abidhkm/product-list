import { Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Product } from "../../types"
import { ProductItem } from "../../components/ProductItem/ProductItem"
import Grid2 from "@mui/material/Unstable_Grid2"



export const Products = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('http://localhost:3001/products')
            setProducts(await res.json())
        }

        fetchProducts()
    }, [])

    return <Stack spacing={2}>
        <Typography variant="h3">Product list</Typography>

        <Grid2 container spacing={[1,1]}>
            {products.map(product => <Grid2  
            key={product.id} 
            lg={3} 
            md={4} 
            sm={6} 
            xs={12}
            >
                <ProductItem  {...product} />
            </Grid2> )}
        </Grid2>

        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
        </Stack>
    </Stack>
}