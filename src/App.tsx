import { Container, CssBaseline } from '@mui/material'
import { Products } from './pages/ProductsList/ProductsList'
import { Fragment } from 'react/jsx-runtime'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <Fragment>
            <QueryClientProvider client={queryClient}>
                <CssBaseline />
                <Container sx={{ padding: 4 }} maxWidth="lg">
                    <Products />
                </Container>
            </QueryClientProvider>
        </Fragment>
    )
}

export default App
