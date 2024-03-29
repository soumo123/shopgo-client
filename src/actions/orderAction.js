import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    MY_ORDER_FAIL, CLEAR_ERRORS, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAIL,
    STATUS_ORDER_REQUEST,
    STATUS_ORDER_SUCCESS,
    STATUS_ORDER_FAIL
} from '../constants/orderConstant'
import axios from 'axios'
//New order

export const createOrder = (order) => async (dispatch, getState) => {


    try {
        const token = localStorage.getItem('token')
        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': "application/json",
                // 'Accept':"/"
            },
            withCredentials: true
        }

        const { data } = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/order/new/${token}`, order, config)
        
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })


    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message })
    }

}


//My orders




export const myOrders = () => async (dispatch, getState) => {

    try {

        const token = localStorage.getItem('token')
        dispatch({ type: MY_ORDER_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/orders/me/${token}`)
        dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders })



    } catch (error) {
        dispatch({ type: MY_ORDER_FAIL, payload: error.response.data.message })
    }


}





//Get single order


export const getOrderDetails = (id) => async (dispatch) => {

    try {
        
        const token = localStorage.getItem('token')
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/order/${id}/${token}`)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })



    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message })
    }


}



//Get all orders by admin 

export const getAllOrders = () => async (dispatch) => {

    try {

        const token = localStorage.getItem('token')
        dispatch({ type: ALL_ORDER_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/admin/orders/${token}`)
        dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders })



    } catch (error) {
        dispatch({ type: ALL_ORDER_FAIL, payload: error.response.data.message })
    }


}


//Update Order by  Admin 




export const updateOrder = (id,order) => async (dispatch) => {

    try {
        const token = localStorage.getItem('token')
        dispatch({ type: UPDATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': "application/json",
            },
            withCredentials: true
        }

        const { data } = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/admin/order/${id}/${token}`, order, config)
        console.log("updatee",data)
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message })
    }

}


//delete order By admin

export const deleteOrder = (id) => async (dispatch) => {

    try {
        const token = localStorage.getItem('token')
        dispatch({ type: DELETE_ORDER_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/admin/order/${id}/${token}`)
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message })
    }

}



//sending mail///

export const sendMail = (to,name) => async () => {
try {
 
    const config = {
        headers: {
            'Content-Type': "application/json",
            // 'Accept':"/"
        },
        withCredentials: true
    }

    const mesage = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/message`, {to:to,name:name},config)
    console.log("mesage",mesage)
   
} catch (error) {
    console.log(error)
}

}




//Cancel Order////////////////////////////////
export const cancelOrder = (order,id) => async (dispatch) => {

console.log("id..........",order , id)
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: CANCEL_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': "application/json",
                // 'Accept':"/"
            },
            withCredentials: true
        }

        const { data } = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/cancel/${token}/${id}`, {reason:order}, config)
        dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data })


    } catch (error) {
        dispatch({ type: CANCEL_ORDER_FAIL, payload: error.response.data.message })
    }

}







// shipment check //  ----------------

export const shipmentDetails = (order_id) => async (dispatch) => {

        try {
            console.log(order_id,"order_id")
            const token = localStorage.getItem('token')
            dispatch({ type: STATUS_ORDER_REQUEST })

            const  data  = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/shipment-status/${token}?order_id=${order_id}`)
            dispatch({ type: STATUS_ORDER_SUCCESS, payload: data })
    
    
        } catch (error) {
            dispatch({ type: STATUS_ORDER_FAIL, payload: error.response.data.message })
        }
    
    }



export const getProclearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS })
}
