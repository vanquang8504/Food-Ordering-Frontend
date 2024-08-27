import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEM_BY_RESTAURANTS_ID_FAILURE, GET_MENU_ITEM_BY_RESTAURANTS_ID_REQUEST, GET_MENU_ITEM_BY_RESTAURANTS_ID_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANTS_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANTS_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANTS_ID_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEM_AVAILABILITY_FAILURE, UPDATE_MENU_ITEM_AVAILABILITY_REQUEST, UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS } from "./ActionType"
import { api } from "../../config/api";


export const createMenuItem = ({ menu, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.post("/api/admin/foods", menu, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("create menu", data)
            dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log("catch error", error);
            dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error })
        }
    }
}

export const getMenuItemByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEM_BY_RESTAURANTS_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/foods/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
            });
            console.log("menu item by restaurants", data)
            dispatch({ type: GET_MENU_ITEM_BY_RESTAURANTS_ID_SUCCESS, payload: data })
        } catch (error) {
            console.log("catch error", error);
            dispatch({ type: GET_MENU_ITEM_BY_RESTAURANTS_ID_FAILURE, payload: error })
        }
    }
}
export const getAllMenuItemByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANTS_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/foods/restaurant/${reqData.restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
            });
            console.log("menu item by restaurants", data)
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANTS_ID_SUCCESS, payload: data })
        } catch (error) {
            console.log("catch error", error);
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANTS_ID_FAILURE, payload: error })
        }
    }
}

export const searchMenuItem = ({keyword, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.post(`/api/foods/search?name=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("search menu item", data)
            dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log("catch error", error);
            dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error })
        }
    }
}

export const updateMenuItemAvailabitity = ({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_REQUEST });
        try {
            const { data } = await api.put(`/api/admin/foods/${foodId}`,{}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("update menu item availability", data)
            dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS, payload: data })
        } catch (error) {
            console.log("catch error", error);
            dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_FAILURE, payload: error })
        }
    }
}

export const deleteFoodAction = ({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.delete(`/api/admin/foods/${foodId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("update menu item availability", data)
            dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId })
        } catch (error) {
            console.log("catch error", error);
            dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error })
        }
    }
}