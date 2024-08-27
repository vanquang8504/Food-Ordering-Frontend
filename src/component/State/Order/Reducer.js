import { GET_USERS_ORDER_FAILURE, GET_USERS_ORDER_REQUEST, GET_USERS_ORDER_SUCCESS } from "./ActionTypes";

const initialState = {
    loading: false,
    orders: [],
    error: null,
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_ORDER_REQUEST:
            return {
                ...state,
                error: null,
                loading: true
            }
        case GET_USERS_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload
            }
        case GET_USERS_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return state;
    }
}