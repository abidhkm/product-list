import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const applyCategoryFilter = async (category: string) => {
    userEvent.click(
        screen.getByRole('combobox', {
            name: /filter/i,
        })
    )
    userEvent.click(
        await screen.findByRole('option', {
            name: category,
        })
    )
}

export const applySearchText = async (searchText: string) => {
    const searchField = screen.getByRole('textbox')
    userEvent.type(searchField, searchText)
}
