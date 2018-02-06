import { ORDERS_FETCHED, ORDER_FETCHED, CURRENT_ORDERID_FETCHED } from '../actions/orders/orders.action-types'


const initialOrdersState = {
    ordersList: { orders: [], error: null },
    order: null,
    currentOrder: {
        currentOrderId: null,
        itemsCount: 0
    }
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
        case CURRENT_ORDERID_FETCHED:
            return {
                ...state,
                currentOrder: action.payload
            }
    }
    return state;
}

export default OrdersReducer;