import { ORDERS_FETCHED, ORDER_FETCHED, ORDERS_BYUSER_FETCHED } from '../actions/orders/orders.action-types'


const initialOrdersState = {
    ordersList: { orders: [], error: null },
    order: null,
    ordersByUser: []
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
                order: action.payload
            }
        case ORDERS_BYUSER_FETCHED:
            return {
                ...state,
                ordersByUser: action.payload
            }
    }
    return state;
}

export default OrdersReducer;