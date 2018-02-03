import { USERS_FETCHED, USERS_FETCH_STARTED, USERS_FETCH_FAILED } from '../actions/users/users.action-types'


const initialUsersState = {
    usersList: { users: [], error: null }
}

const UsersReducer = (state = initialUsersState, action) => {

    switch (action.type) {
        case USERS_FETCHED:
            return {
                ...state,
                usersList: { users: action.payload.users, error: null }
            }
        case USERS_FETCH_STARTED:
            return {
                ...state,
                usersList: { ...state.usersList }
            }
    }
    return state;
}

export default UsersReducer;
