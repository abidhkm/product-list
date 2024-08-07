import { render, screen, waitFor, within } from '@testing-library/react'
import App, { queryClient } from '../App'
import { applyCategoryFilter, applySearchText } from './testingUtils'

describe('Product listing app', () => {
    beforeEach(() => {
        queryClient.clear()
    })
    test('renders the header', async () => {
        render(<App />)
        const header = screen.getByText(/Product list/i)
        expect(header).toBeInTheDocument()
    })

    test('renders the loading spinner at the start and later got removed', async () => {
        render(<App />)
        const loadingSpinner = await screen.findByTestId('loading-spinner')
        expect(loadingSpinner).toBeInTheDocument()
        await waitFor(() => {
            expect(loadingSpinner).not.toBeInTheDocument()
        })
    })

    test('3 products are rendered. Name, category and price are shown', async () => {
        render(<App />)
        const productRows = await screen.findAllByTestId('product-item')
        expect(productRows.length).toEqual(7)

        const [productRow1] = productRows
        expect(within(productRow1).getByText('Product 1')).toBeTruthy()
        expect(within(productRow1).getByText('Category A')).toBeTruthy()
        expect(within(productRow1).getByText('$29.99')).toBeTruthy()
    })

    test('renders only product 2 when search text entered is 2', async () => {
        render(<App />)
        await screen.findAllByTestId('product-item')

        applySearchText('2')
        const productRows = await screen.findAllByTestId('product-item')
        expect(productRows.length).toEqual(1)
        const [productRow1] = productRows
        expect(within(productRow1).getByText('Product 2')).toBeTruthy()
        expect(within(productRow1).getByText('Category A')).toBeTruthy()
        expect(within(productRow1).getByText('$49.99')).toBeTruthy()
    })

    test('renders 4 products when category A is selected from filter', async () => {
        render(<App />)
        await screen.findAllByTestId('product-item')
        applyCategoryFilter('Category A')

        await waitFor(async () => {
            const productRows = await screen.findAllByTestId('product-item')
            expect(productRows.length).toEqual(4)
        })
    })

    test('renders only product 6 when search text has value 6 and category B is selected', async () => {
        render(<App />)
        await screen.findAllByTestId('product-item')

        applySearchText('6')
        applyCategoryFilter('Category B')

        await waitFor(async () => {
            const productRows = await screen.findAllByTestId('product-item')
            expect(productRows.length).toEqual(1)
        })
    })
})
