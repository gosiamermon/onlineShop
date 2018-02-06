
import { API_URL } from '../../../config'
import { ORDER_FETCHED, ORDERS_FETCHED, CURRENT_ORDERID_FETCHED } from './orders.action-types'
import { push } from "connected-react-router";
import { adminPanelOrders } from "../../helpers/routes"
import moment from "moment";

export const getAllOrders = () => {
    return async (dispatch) => {

        let response;
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);
        try {
            response = await fetch(`${API_URL}order`, {
                mode: "cors",
                method: "get",
                headers: headers
            });
        }
        catch (error) {
            console.log("Data fetching failed", error)
            return;
        }
        const ordersData = await response.json()

        const orders = ordersData.map(order => {
            order.orderDate = moment(order.orderDate).format("DD-MM-YYYY HH:mm")
            return order
        })
        ///TODO 
        dispatch({
            type: ORDERS_FETCHED,
            payload: {
                orders
            }
        })
    }
}


export const getOrder = (id) => {
    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);
        try {
            response = await fetch(`${API_URL}order/GetOrderById/${id}`, {
                mode: "cors",
                method: "get",
                headers: headers
            });
        }
        catch (error) {
            console.log("Data fetching failed", error)
            return;
        }
        const orderData = await response.json()
        const order = orderData;
        order.orderDate = moment(orderData.orderDate).format("DD-MM-YYYY HH:mm")
        let userData
        try {
            userData = await fetch(`${API_URL}users/${order.userId}`, {
                mode: "cors",
                method: "get",
                headers: headers
            });
        }
        catch (error) {
            console.log("Data fetching failed", error)
            return;
        };

        const user = await userData.json();
        order.user = user;

        for (const item of order.orderItems) {
            let productData;
            try {
                productData = await fetch(`${API_URL}products/${item.productId}`, {
                    mode: "cors",
                    method: "get",
                    headers: headers
                });
            }
            catch (error) {
                console.log("Data fetching failed", error)
                return;
            }
            const product = await productData.json();

            item.imageSmall = product.imageSmall
            item.color = product.color
            item.producer = product.producer
            item.cost = product.cost
            item.itemNumber = product.itemNumber
        }

        dispatch({
            type: ORDER_FETCHED,
            payload: order
        })
    }
}


export const changeStatus = (id, status) => {
    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);

        try {
            response = await fetch(`${API_URL}order/ChangeStatus`, {
                method: "put",
                mode: "cors",
                headers: headers,
                body: JSON.stringify({
                    orderId: id,
                    status: status,
                })
            })
        }
        catch (error) {
            console.error("Change status failed", error)
            return;
        }

        dispatch(getOrder(id))
    }
}

export const getCurrentOrder = (userId) => {

    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);

        try {
            response = await fetch(`${API_URL}order/GetAllReletedByUser/${userId}`, {
                mode: "cors",
                method: "get",
                headers: headers
            })
        }
        catch (error) {
            console.error("Get orders by user failed", error)
        }
        const ordersData = await response.json()

        const currentOrder = ordersData.find(order => {
            return order.status === "Created"
        })
        console.log('currentOrder', currentOrder)
        dispatch({
            type: CURRENT_ORDERID_FETCHED,
            payload: {
                currentOrderId: currentOrder ? currentOrder.orderId : null,
                itemsCount: currentOrder ? currentOrder.orderItemsCount : 0
            }
        })
    }
}

export const createOrder = (productId, amount, size) => {

    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);

        try {
            response = await fetch(`${API_URL}order/Create/`, {
                method: "post",
                mode: "cors",
                headers: headers,
                body: JSON.stringify({
                    userId: sessionStorage.userId,
                    productId: productId,
                    amount: amount,
                    size: size
                })
            })
        }
        catch (error) {
            console.error("Creating order failed", error)
        }
        const orderData = await response.json();

        sessionStorage.setItem("orderId", orderData.orderId)
        dispatch({
            type: CURRENT_ORDERID_FETCHED,
            payload: {
                currentOrderId: orderData.orderId,
                itemsCount: orderData.orderItems.length
            }
        })
        dispatch({
            type: ORDER_FETCHED,
            payload: orderData
        })
    }
}

export const addToBasket = (orderId, productId, amount, size) => {
    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);

        try {
            response = await fetch(`${API_URL}order/AddToBasket/`, {
                method: "post",
                mode: "cors",
                headers: headers,
                body: JSON.stringify({
                    orderId: orderId,
                    productId: productId,
                    amount: amount,
                    size: size
                })
            })
        }
        catch (error) {
            console.error("Add to basket failed", error)
        }
        const orderData = await response.json();
        dispatch({
            type: CURRENT_ORDERID_FETCHED,
            payload: {
                currentOrderId: orderData.orderId,
                itemsCount: orderData.orderItems.length
            }
        })
        dispatch({
            type: ORDER_FETCHED,
            payload: orderData
        })
    }
}

export const changeAmount = (orderId, productId, amount) => {
    console.log(orderId, productId, amount)
    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);

        try {
            response = await fetch(`${API_URL}order/ChangeAmount/`, {
                method: "post",
                mode: "cors",
                headers: headers,
                body: JSON.stringify({
                    orderId: orderId,
                    productId: productId,
                    amount: amount
                })
            })
        }
        catch (error) {
            console.error("Add to basket failed", error)
        }

        dispatch(getOrder(orderId))
    }
}

export const removeFromBasket = (orderId, productId) => {
    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);

        try {
            response = await fetch(`${API_URL}order/RemoveFromBasket/${orderId}/${productId}`, {
                method: "delete",
                mode: "cors",
                headers: headers
            })
        }
        catch (error) {
            console.error("Remove from basket failed", error)
        }

        dispatch(getOrder(orderId))
    }
}
