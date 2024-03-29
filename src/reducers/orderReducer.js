import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CREATE_ORDER_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
    CLEAR_ERRORS,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAIL,
    CANCEL_ORDER_CONSTANT,
    STATUS_ORDER_REQUEST,
    STATUS_ORDER_SUCCESS,
    STATUS_ORDER_FAIL

} from '../constants/orderConstant'


export const newOrderReducer = (state = {}, action) => {

    switch (action.type) {

        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case CREATE_ORDER_FAIL:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}



export const myOrderReducer = (state = { orders: [] }, action) => {

    switch (action.type) {

        case MY_ORDER_REQUEST:
            return {
                loading: true
            }
        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case MY_ORDER_FAIL:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}


export const orderDetailsReducer = (state = { order: {} }, action) => {

    switch (action.type) {

        case ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}





export const allOrdersReducer = (state = { orders: [] }, action) => {

    switch (action.type) {

        case ALL_ORDER_REQUEST:
            return {
                loading: true
            }
        case ALL_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ALL_ORDER_FAIL:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}



export const orderReducer = (state = {}, action) => {

    switch (action.type) {

        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }



        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            }

        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
            }


        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false,
                error: false
            }
        default:
            return state
    }

}









export const cancelOrderReducer = (state = {}, action) => {

    switch (action.type) {

        case CANCEL_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CANCEL_ORDER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CANCEL_ORDER_CONSTANT:
            return {
                success: false
            }

        case CANCEL_ORDER_FAIL:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}




export const statusOrderReducer = (state = {}, action) => {

    switch (action.type) {

        case STATUS_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case STATUS_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
                data:action.payload.data.paymentData
            }

        case STATUS_ORDER_FAIL:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}