import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_LOGIN_FAILED } from '../actions/auth/auth.action-types'



const initalAuthState = {
    userEmail: sessionStorage.getItem("user_email") || "",
    expireDate: new Date(sessionStorage.getItem("expire_date") || null),
    accessToken: sessionStorage.getItem("access_token") || "",
    loggedIn: !!sessionStorage.getItem("access_token"),
    isAdmin: sessionStorage.getItem("isAdmin") === 'true',
    error: null
}

const AuthReducer = (state = initalAuthState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                expireDate: action.payload.expireDate,
                userEmail: action.payload.userEmail,
                isAdmin: action.payload.isAdmin,
                loggedIn: true,
                error: null
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                loggedIn: false
            }
        case AUTH_LOGIN_FAILED:

            return {
                ...state,
                error: true
            }
    }
    return state
}


export default AuthReducer;