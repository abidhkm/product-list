import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import { Products } from './pages/productsList/ProductsList'
import { Fragment } from 'react/jsx-runtime'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from './theme'

export const queryClient = new QueryClient()

function App() {
    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <CssBaseline />
                    <Container sx={{ padding: 4 }} maxWidth="lg">
                        <Products />
                    </Container>
                </QueryClientProvider>
            </ThemeProvider>
        </Fragment>
    )
}

export default App
