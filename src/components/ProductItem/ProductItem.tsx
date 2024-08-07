import { Stack, Typography } from "@mui/material"
import { Product } from "../../types"

export const ProductItem = (product: Product) => {

    const showLabelAndValue = (label: string, value: string) => {
        return <Stack direction="row" spacing={1} >
        <Typography>{label}:</Typography>
        <Typography>{value}</Typography>
    </Stack>
    }

    return <Stack px={4} py={2} spacing={1} border={"1px solid black"} borderRadius={4}
    sx={{
        cursor: "pointer",
        transition: 'transform 0.3s ease-in-out',
        ":hover":{
            transform: 'scale(1.05)'
        }
    }}
    >
    {showLabelAndValue("Name", product.name)}
    {showLabelAndValue("Category", product.category)}
    {showLabelAndValue("Price", `$${product.price}`)}
</Stack>
}