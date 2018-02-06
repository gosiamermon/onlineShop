import { combineReducers } from 'redux';
import UsersReducer from './users-reducer'
import { reducer as formReducer } from 'redux-form'
import ProductsReducer from './products-reducer'
import OrdersReducer from './orders-reducer'
import AuthReducer from './auth-reducer'


const allReducers = combineReducers({
    users: UsersReducer,
    form: formReducer,
    orders: OrdersReducer,
    products: ProductsReducer,
    auth: AuthReducer
});

export const rootReducer = (state, action) => {
    return allReducers(state, action)
}

