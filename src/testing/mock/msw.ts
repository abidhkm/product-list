import { SetupServer, setupServer } from 'msw/node'
import { rest } from 'msw/'

export const MockRequestHandler = [
    rest.get(`http://localhost:3001/products`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: 1,
                    name: 'Test Product 1',
                    category: 'Test Category A',
                    price: 10,
                },
                {
                    id: 2,
                    name: 'Test Product 2',
                    category: 'Test Category A',
                    price: 30,
                },
                {
                    id: 33,
                    name: 'Test Product 3',
                    category: 'Test Category B',
                    price: 90.99,
                },
            ])
        )
    }),
]

export const server: SetupServer = setupServer(...MockRequestHandler)
