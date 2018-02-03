import { PRODUCTS_FETCHED, PRODUCT_FETCHED } from '../actions/products/products.action-types'


const initialProductsState = {
    productsList: { products: [], error: null }
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
    }
    return state;
}

export default ProductsReducer;
