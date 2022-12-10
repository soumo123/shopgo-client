import axios from 'axios'
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    PRODUCT_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ADMIN_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DEAL_PRODUCT_REQUEST,
    DEAL_PRODUCT_SUCCESS,
    DEAL_PRODUCT_FAIL,
    LIKE_PRODUCT_REQUEST,
    LIKE_PRODUCT_SUCCESS,
    LIKE_PRODUCT_FAIL,
    GET_LIKE_PRODUCT_REQUEST,
    GET_LIKE_PRODUCT_SUCCESS,
    GET_LIKE_PRODUCT_FAIL
} from '../constants/productConstants'
//to gett all products//
export const getProduct = (keyword = "", currentPage = 1, price = [0, 20000], category) => async (dispatch) => {

    try {


        dispatch({ type: ALL_PRODUCT_REQUEST })
        if (!category) {
            const link = `/api/soummya/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
            const { data } = await axios.get(link)
            dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data })
        } else {
            const link = `/api/soummya/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
            const { data } = await axios.get(link)
            dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data })
        }


    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}






export const getProductDetails = (product) => {
    return {
        type: PRODUCT_DETAILS_SUCCESS,
        payload: product
    }

}





export const getProductDetailsss = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/soummya/product/${id}`);

  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };






//create product by admin
export const createProduct = (productData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: NEW_PRODUCT_REQUEST })
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }
        const { data } = await axios.post(`/api/soummya/admin/product/new/${token}`,productData,config)
       
        dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}





//get products by admin
export const getAdminProducts = () => async (dispatch) => {

    try {

        const token = localStorage.getItem('token')
        dispatch({type:ADMIN_PRODUCT_REQUEST})

        const {data} = await axios.get(`/api/soummya/admin/products/${token}`)
      
        dispatch({type:ADMIN_PRODUCT_SUCCESS,payload:data.products})

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }

}



//New review  //
export const newReview = (reviewData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: NEW_REVIEW_REQUEST })
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }
        const { data } = await axios.put(`/api/soummya/review/${token}`,reviewData,config)
        
        dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success })

    } catch (error) {
      
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.success
        })
    }
}


//delete product by admin

export const deleteProduct = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: DELETE_PRODUCT_REQUEST })
        const { data } = await axios.delete(`/api/soummya/admin/product/${id}/${token}`)
      
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


//update product by admin

export const updateProduct = (id,productData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }

        const { data } = await axios.put(`/api/soummya/admin/product/${id}/${token}`,productData,config)
       
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}



//get all Reviews By admin

export const getAllReviews = (id) => async (dispatch) => {

    try {

        const token = localStorage.getItem('token')
        dispatch({type:ALL_REVIEW_REQUEST})

        const {data} = await axios.get(`/api/soummya/reviews?id=${id}`)
        dispatch({type:ALL_REVIEW_SUCCESS,payload:data.reviews})

    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }

}


//delete reviews by admin

export const deleteReviews = (reviewId,productId) => async (dispatch) => {

    try {

        dispatch({type:DELETE_REVIEW_REQUEST})

        const {data} = await axios.delete(`/api/soummya/reviews?id=${reviewId}&productId=${productId}`)
        
        dispatch({type:DELETE_REVIEW_SUCCESS,payload:data.success})

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }

}




//get deal products

export const getDealProductDetails = () => async (dispatch) => {
    try {
      dispatch({ type: DEAL_PRODUCT_REQUEST });
  
      const { data } = await axios.get(`/api/soummya/discountProducts`);

      dispatch({
        type: DEAL_PRODUCT_SUCCESS,
        payload: data.dealproducts,
      });
    } catch (error) {
      dispatch({
        type: DEAL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };




//like product 





export const updateLike = (id,likes) => async (dispatch) => {

  
  
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: LIKE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }

        const { data } = await axios.put(`/api/soummya/like/${id}/${token}?likes=${likes}`,config)
       
        dispatch({ type: LIKE_PRODUCT_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({
            type: LIKE_PRODUCT_FAIL,
            payload: error.response.data.success
        })
        
    }
}


//get all likeble products ///




export const getallLikebleProducts = () => async (dispatch) => {
    try {
      dispatch({ type: GET_LIKE_PRODUCT_REQUEST });
  
      const { data } = await axios.get(`/api/soummya/likes`);
     
  
      dispatch({
        type: GET_LIKE_PRODUCT_SUCCESS,
        payload: data.likebleProducts,
      });
    } catch (error) {
      dispatch({
        type: GET_LIKE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//CLEAR ERRORS//
export const getProclearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS })
}