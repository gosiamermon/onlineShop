
import { API_URL } from '../../../config'
import { ORDER_FETCHED, ORDERS_FETCHED, ORDERS_BYUSER_FETCHED } from './orders.action-types'
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
                method: "get"
            });
        }
        catch (error) {
            console.log("Data fetching failed", error)
            return;
        }

        const user = await userData.json();
        order.user = user;
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

export const getOrdersByUser = (userId) => {
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

        const orders = ordersData.map(order => {
            order.orderDate = moment(order.orderDate).format("DD-MM-YYYY HH:mm")
            return order
        })

        dispatch({
            type: ORDERS_BYUSER_FETCHED,
            payload: orders
        })
    }
}
