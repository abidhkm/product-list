import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Product } from '../../types'
import { memo } from 'react'

export const ProductItem = memo((product: Product) => {
    const showLabelAndValue = (label: string, value: string) => {
        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body1" color={'text.secondary'}>
                    {label}:
                </Typography>
                <Typography variant="body2" color={'text.primary'}>
                    {value}
                </Typography>
            </Stack>
        )
    }

    return (
        <Card
            data-testid="product-item"
            sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                ':hover': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            <CardContent
                sx={{
                    px: 4,
                    py: 2,
                }}
            >
                <Stack spacing={1}>
                    {showLabelAndValue('Name', product.name)}
                    {showLabelAndValue('Category', product.category)}
                    {showLabelAndValue('Price', `$${product.price}`)}
                </Stack>
            </CardContent>
        </Card>
    )
})

ProductItem.displayName = 'ProductItem'
