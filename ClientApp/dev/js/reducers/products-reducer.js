import { PRODUCTS_FETCHED, PRODUCT_FETCHED, PRODUCTS_SMALL_PHOTO, PRODUCTS_BIG_PHOTO } from '../actions/products/products.action-types'


const initialProductsState = {
    productsList: { products: [], error: null },
    product: null,
    smallPhoto: { photo: "", wasRemoved: false },
    bigPhoto: { photo: "", wasRemoved: false }
}

const ProductsReducer = (state = initialProductsState, action) => {

    switch (action.type) {
        case PRODUCTS_FETCHED:
            return {
                ...state,
                productsList: { products: action.payload.products, error: null }
            }
        case PRODUCT_FETCHED:
            return {
                ...state,
                product: action.payload
            }
        case PRODUCTS_SMALL_PHOTO:
            return {
                ...state,
                smallPhoto: action.payload
            }
        case PRODUCTS_BIG_PHOTO:
            return {
                ...state,
                bigPhoto: action.payload
            }
    }
    return state;
}

export default ProductsReducer;
