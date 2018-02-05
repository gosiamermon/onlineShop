import { API_URL } from '../../../config'
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_LOGIN_FAILED } from './auth.action-types'
import { push } from "connected-react-router";
import { login } from "../../helpers/routes"


export const logIn = (formValues) => {
    return async (dispatch) => {


        let response;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        try {
            response = await fetch(`${API_URL}users/authenticateUser`, {
                method: "post",
                mode: "cors",
                headers: headers,
                body: JSON.stringify(formValues)
            })

        } catch (error) {
            console.error("Data posting failed!", error);
            return;
        }

        if (response.ok) {
            const responseData = await response.json();
            addToSessionsStorage(responseData)
            dispatch({
                type: AUTH_LOGIN,
                payload: {
                    accessToken: responseData.token,
                    expireDate: new Date(responseData.expires),
                    userEmail: responseData.email,
                    isAdmin: responseData.isAdmin

                }
            })
        }
        else {
            dispatch({
                type: AUTH_LOGIN_FAILED
            })

        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        sessionStorage.clear()
        dispatch(push('/'))
        dispatch({
            type: AUTH_LOGOUT
        })
    }
}

function addToSessionsStorage(responseData, expire_date) {

    sessionStorage.setItem("access_token", responseData.token);
    sessionStorage.setItem("user_email", responseData.email);
    sessionStorage.setItem("isAdmin", responseData.isAdmin);
    sessionStorage.setItem("expire_date", responseData.expires)
}