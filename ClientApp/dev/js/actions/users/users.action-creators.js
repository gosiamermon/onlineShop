
import { API_URL } from '../../../config'
import { USERS_FETCHED, USER_FETCHED } from './users.action-types'
import { push } from "connected-react-router";
import { adminPanelUsers } from "../../helpers/routes"


export const getAllUsers = () => {
    return async (dispatch) => {

        let response;
        //let headers = new Headers();
        //headers.append("Authorization", "Bearer " + sessionStorage.access_token);
        try {
            response = await fetch(`${API_URL}users`, {
                mode: "cors",
                method: "get"
            });
        }
        catch (error) {
            console.log("Data fetching failed", error)
            return;
        }
        const usersData = await response.json()
        const users = usersData.map(user => {
            if (user.isAdmin) {
                user.role = "admin"
            }
            else {
                user.role = "client"
            }
            return user
        })
        console.log(users)
        dispatch({
            type: USERS_FETCHED,
            payload: {
                users
            }
        })
    }
}

export const getUser = (id) => {
    return async (dispatch) => {
        let response;
        //let headers = new Headers();
        //headers.append("Authorization", "Bearer " + sessionStorage.access_token);
        try {
            response = await fetch(`${API_URL}users/${id}`, {
                mode: "cors",
                method: "get"
            });
        }
        catch (error) {
            console.log("Data fetching failed", error)
            return;
        }
        const userData = await response.json()
        let user = userData
        if (userData.isAdmin) {
            user.role = "admin"
        }
        else {
            user.role = "client"
        }
        dispatch({
            type: USER_FETCHED,
            payload: user
        })
    }
}

export const deleteUser = (userId) => {
    return async (dispatch) => {
        let response;

        try {
            response = await fetch(`${API_URL}users/${userId}`, {
                mode: "core",
                method: "delete"
            })
        }
        catch (error) {
            console.error("User delete failed", error)
            return;
        }
        if (response.ok) {
            dispatch(getAllUsers())
        }
    }
}

export const addUser = (user) => {
    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Content-type", "application/json");

        try {
            response = await fetch(`${API_URL}users/registerAdmin`, {
                method: "post",
                mode: "cors",
                headers: headers,
                body: JSON.stringify(user)
            })
        }
        catch (error) {
            console.error("User posting failed", error)
            return;
        }
        dispatch(push(adminPanelUsers))
    }
}

export const editUser = (id, user) => {
    return async (dispatch) => {
        let response;
        let headers = new Headers();
        headers.append("Content-type", "application/json");

        try {
            response = await fetch(`${API_URL}users/${id}`, {
                method: "put",
                mode: "cors",
                headers: headers,
                body: JSON.stringify(user)
            })
        }
        catch (error) {
            console.error("User editing failed", error)
            return;
        }
        dispatch(push(adminPanelUsers))
    }
}