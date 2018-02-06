
import { API_URL } from '../../../config'
import { PRODUCTS_FETCHED, PRODUCT_FETCHED, PRODUCTS_SMALL_PHOTO, PRODUCTS_BIG_PHOTO } from './products.action-types'
import { push } from "connected-react-router";
import { adminPanelProducts } from "../../helpers/routes"


export const getAllProducts = () => {
    return async (dispatch) => {

        let response;
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);
        try {
            response = await fetch(`${API_URL}products`, {
                mode: "cors",
                method: "get",
                headers: headers
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
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);
        try {
            response = await fetch(`${API_URL}products/${id}`, {
                mode: "cors",
                method: "get",
                headers
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
        let headers = new Headers()
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);
        try {
            response = await fetch(`${API_URL}products/${id}`, {
                mode: "core",
                method: "delete",
                headers: headers
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
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);

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
        headers.append("Authorization", "Bearer " + sessionStorage.access_token);
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

export const uploadSmallPhoto = (photoFile, wasRemoved = false) => {
    return (dispatch) => {
        dispatch({
            type: PRODUCTS_SMALL_PHOTO,
            payload: {
                photo: photoFile,
                wasRemoved: wasRemoved
            }
        })
    }
}

export const uploadBigPhoto = (photoFile, wasRemoved = false) => {
    return (dispatch) => {
        dispatch({
            type: PRODUCTS_BIG_PHOTO,
            payload: {
                photo: photoFile,
                wasRemoved: wasRemoved
            }
        })
    }
}