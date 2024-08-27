import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_EVENTS_FAILURE, CREATE_EVENTS_REQUEST, CREATE_EVENTS_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_EVENTS_FAILURE, DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_RESTAURANT_FAILURE, GET_ALL_RESTAURANT_REQUEST, GET_ALL_RESTAURANT_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANT_CATEGOEY_FAILURE, GET_RESTAURANT_CATEGOEY_REQUEST, GET_RESTAURANT_CATEGOEY_SUCCESS, GET_RESTAURANT_EVENTS_EVENTS_FAILURE, GET_RESTAURANT_EVENTS_EVENTS_REQUEST, GET_RESTAURANT_EVENTS_EVENTS_SUCCESS, UPDATEL_RESTAURANT_FAILURE, UPDATEL_RESTAURANT_REQUEST, UPDATEL_RESTAURANT_STATUS_FAILURE, UPDATEL_RESTAURANT_STATUS_REQUEST, UPDATEL_RESTAURANT_STATUS_SUCCESS, UPDATEL_RESTAURANT_SUCCESS } from "./ActionType"

import {api} from "../../config/api";


export const getAllRestaurantAction = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
        try {
            const { data } = await api.get("/api/restaurants", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
            console.log("all restaurant", data)
        } catch (error) {
            console.log("catch error", error)
            dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error })
        }
    }
}

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const response = await api.get(`/api/restaurants/${reqData.restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
            });
            dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("error", error)
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error })
        }
    }
}
export const getRestaurantByUserId = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
        try {
            const {data} = await api.get(`/api/admin/restaurants/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("get restaurant by user id", data)
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
        } catch (error) {
            console.log("error", error)
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error.message })
        }
    }
}

export const createRstaurant = (reqData) => {
    console.log("token...", reqData.token)
    return async (dispatch) => {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/restaurants`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            });
            dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data })
            console.log("create restaurant data", data)
        } catch (error) {
            console.log("error", error)
            dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
        }
    }
}

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATEL_RESTAURANT_REQUEST });
        try {
            const response = await api.put(`/api/admin/restaurants/${restaurantId}`, restaurantData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({ type: UPDATEL_RESTAURANT_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("error", error)
            dispatch({ type: UPDATEL_RESTAURANT_FAILURE, payload: error });
        }
    }
}

export const deleteRestaurant = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {
            const response = await api.delete(`/api/admin/restaurants/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("delete restaurant", response)
            dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId })
        } catch (error) {
            console.log("error", error)
            dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
        }
    }
}

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATEL_RESTAURANT_STATUS_REQUEST });
        try {
            const response = await api.put(`/api/admin/restaurants/status/${restaurantId}`, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("update restaurant status", response)
            dispatch({ type: UPDATEL_RESTAURANT_STATUS_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("error", error)
            dispatch({ type: UPDATEL_RESTAURANT_STATUS_FAILURE, payload: error });
        }
    }
}

export const createEventAction = ({ data, restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_EVENTS_REQUEST });
        try {
            const response = await api.post(`/api/admin/events/${restaurantId}`, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("create event", response)
            dispatch({ type: CREATE_EVENTS_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("error", error)
            dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
        }
    }
}

export const getAllEvent = ({ jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_EVENTS_REQUEST });
        try {
            const response = await api.get(`/api/events`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("get all event", response)
            dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("error", error)
            dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
        }
    }
}

export const deleteEventAction = ({ eventId , jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_EVENTS_REQUEST });
        try {
            const response = await api.delete(`/api/admin/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("delete event", response)
            dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId })
        } catch (error) {
            console.log("error", error)
            dispatch({ type: DELETE_EVENTS_FAILURE, payload: error });
        }
    }
}

export const getRestaurantEvent = ({ restaurantId , jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_EVENTS_EVENTS_REQUEST });
        try {
            const response = await api.get(`/api/admin/events/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("get restaurant event", response)
            dispatch({ type: GET_RESTAURANT_EVENTS_EVENTS_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("error", error)
            dispatch({ type: GET_RESTAURANT_EVENTS_EVENTS_FAILURE, payload: error });
        }
    }
}

export const createCategoryAction = ({ reqData , jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_CATEGORY_REQUEST });
        try {
            const response = await api.post(`/api/admin/categories`,reqData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("create category", response)
            dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("error", error)
            dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
        }
    }
}

export const getRestaurantCategory = ({ restaurantId , jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_CATEGOEY_REQUEST });
        try {
            const response = await api.get(`/api/categories/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("get restaurant category", response)
            dispatch({ type: GET_RESTAURANT_CATEGOEY_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("error", error)
            dispatch({ type: GET_RESTAURANT_CATEGOEY_FAILURE, payload: error });
        }
    }
}