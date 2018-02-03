import { ORDERS_FETCHED } from '../actions/orders/orders.action-types'


const initialOrdersState = {
    ordersList: { orders: [], error: null }
}

const OrdersReducer = (state = initialOrdersState, action) => {

    switch (action.type) {
        case ORDERS_FETCHED:
            return {
                ...state,
                ordersList: { orders: action.payload.orders, error: null }
            }
    }
    return state;
}

export default OrdersReducer;