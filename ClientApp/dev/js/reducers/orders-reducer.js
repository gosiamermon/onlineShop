import { ORDERS_FETCHED, ORDER_FETCHED } from '../actions/orders/orders.action-types'


const initialOrdersState = {
    ordersList: { orders: [], error: null },
    order: null
}

const OrdersReducer = (state = initialOrdersState, action) => {

    switch (action.type) {
        case ORDERS_FETCHED:
            return {
                ...state,
                ordersList: { orders: action.payload.orders, error: null }
            }
        case ORDER_FETCHED:
            return {
                ...state,
                order: payload
            }
    }
    return state;
}

export default OrdersReducer;