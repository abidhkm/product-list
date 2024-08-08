import { SetupServer, setupServer } from 'msw/node'
import { rest } from 'msw/'

export const MockRequestHandler = [
    rest.get(
        `${process.env.REACT_APP_API_BASE_URL}/products`,
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        id: 1,
                        name: 'Test Product 1',
                        category: 'Category A',
                        price: 10,
                    },
                    {
                        id: 2,
                        name: 'Test Product 2',
                        category: 'Category A',
                        price: 30,
                    },
                    {
                        id: 33,
                        name: 'Test Product 3',
                        category: 'Category B',
                        price: 90.99,
                    },
                ])
            )
        }
    ),
]

export const server: SetupServer = setupServer(...MockRequestHandler)
