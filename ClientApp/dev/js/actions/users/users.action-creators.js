
import { API_URL } from '../../../config'
import { USERS_FETCHED } from './users.action-types'

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
        const users = await response.json()
        dispatch({
            type: USERS_FETCHED,
            payload: {
                users
            }
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
        console.log(response)
        if (response.ok) {
            dispatch(getAllUsers())
        }
    }
}