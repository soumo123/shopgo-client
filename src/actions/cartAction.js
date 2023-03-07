import { ADD_TO_CART ,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO} from '../constants/cartConstants'
import axios from 'axios'
import { useSelector } from 'react-redux'


//Add To Cart


export const addItemsToCart = (id, quantity,user) => async (dispatch,getState) => {

    const { data } = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/product/${id}`)
    let d = new Date();
    let delivered = d.setDate(d.getDate() + Number(data.product.deliveryDays));
    const deliveredAt = new Date(delivered).toISOString();
    dispatch({
        type: ADD_TO_CART,
        payload:{
            customer_name:user.name,
            product:data.product._id,
            user:data.product.user,
            deliveryTime:deliveredAt,
            name:data.product.name,
            price:data.product.actualpricebydiscount,
            stock:data.product.stock,
            image:data.product.images[0].url,
            quantity
        }
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

//Remove Cart

export const removeItemsToCart = (id) => async (dispatch,getState) => {

    dispatch({ type:REMOVE_CART_ITEM,payload:id})

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}


//Save Shipping Info//

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({ type:SAVE_SHIPPING_INFO,payload:data})

    localStorage.setItem("shippingInfo",JSON.stringify(data))
}
