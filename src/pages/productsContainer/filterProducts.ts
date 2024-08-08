import { Product } from '../../types'

export const filterProductsByNameAndCategory = (
    products: Product[],
    searchText: string,
    selectedCategories: string[]
) => {
    // Filter by product name (case-insensitive, whitespace-insensitive)
    const filteredByName = products.filter((product) =>
        product.name
            .toLowerCase()
            .replace(/\s/g, '')
            .includes(searchText.toLowerCase().replace(/\s/g, ''))
    )

    // Filter by selected categories (if any)
    const filteredByCategory =
        selectedCategories.length > 0
            ? filteredByName.filter((product) =>
                  selectedCategories.includes(product.category)
              )
            : filteredByName

    return filteredByCategory
}
