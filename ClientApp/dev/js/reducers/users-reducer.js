import { USERS_FETCHED, USER_FETCHED } from '../actions/users/users.action-types'


const initialUsersState = {
    usersList: { users: [], error: null },
    user: null
}

const UsersReducer = (state = initialUsersState, action) => {

    switch (action.type) {
        case USERS_FETCHED:
            return {
                ...state,
                usersList: { users: action.payload.users, error: null }
            }
        case USER_FETCHED:
            return {
                ...state,
                user: action.payload
            }
    }
    return state;
}

export default UsersReducer;
