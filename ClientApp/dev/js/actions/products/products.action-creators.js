
import { API_URL } from '../../../config'
import { PRODUCTS_FETCHED, PRODUCT_FETCHED } from './products.action-types'
import { push } from "connected-react-router";
import { adminPanelProducts } from "../../helpers/routes"


export const getAllProducts = () => {
    return async (dispatch) => {

        let response;
        //let headers = new Headers();
        //headers.append("Authorization", "Bearer " + sessionStorage.access_token);
        try {
            response = await fetch(`${API_URL}products`, {
                mode: "cors",
                method: "get"
            });
        }
        catch (error) {
            console.log("Data fetching failed", error)
            return;
        }
        const products = await response.json()

        dispatch({
            type: PRODUCTS_FETCHED,
            payload: {
                products
            }
        })
    }
}


export const getProduct = (id) => {
    return async (dispatch) => {
        let response;
        //let headers = new Headers();
        //headers.append("Authorization", "Bearer " + sessionStorage.access_token);
        try {
            response = await fetch(`${API_URL}products/${id}`, {
                mode: "cors",
                method: "get"
            });
        }
        catch (error) {
            console.log("Data fetching failed", error)
            return;
        }
        const product = await response.json()

        dispatch({
            type: PRODUCT_FETCHED,
            payload: product
        })
    }
}

export const deleteProduct = (id) => {
    return async (dispatch) => {
        let response;

        try {
            response = await fetch(`${API_URL}products/${id}`, {
                mode: "core",
                method: "delete"
            })
        }
        catch (error) {
            console.error("Product delete failed", error)
            return;
        }

        if (response.ok) {
            dispatch(getAllProducts())
        }
    }
}

export const addProduct = (product) => {
    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Content-type", "application/json");

        try {
            response = await fetch(`${API_URL}products`, {
                method: "post",
                mode: "cors",
                headers: headers,
                body: JSON.stringify(product)
            })
        }
        catch (error) {
            console.error("Product posting failed", error)
            return;
        }
        dispatch(push(adminPanelProducts))
    }
}

export const editProduct = (id, product) => {
    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Content-type", "application/json");

        try {
            response = await fetch(`${API_URL}products/${id}`, {
                method: "put",
                mode: "cors",
                headers: headers,
                body: JSON.stringify(product)
            })
        }
        catch (error) {
            console.error("Product editing failed", error)
            return;
        }
        dispatch(push(adminPanelProducts))
    }
}