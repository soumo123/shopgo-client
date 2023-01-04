import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getProclearErrors, getOrderDetails, cancelOrder } from "../../actions/orderAction";
import Loader from "../layout/loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import Metadata from '../layout/Metadata'
import DispatchDetails from './DispatchDetails';
import { useAlert } from 'react-alert'
import '../../css/orderdetails.css'
import { CANCEL_ORDER_CONSTANT } from '../../constants/orderConstant';

const OrderDetails = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const paramsId = useParams()
    console.log("paramsId", paramsId.id)
    const [reason, setReason] = useState("")



    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { success } = useSelector((state) => state.cancelOrder);


    console.log("success", success)


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("reasonn", reason)
        dispatch(cancelOrder(reason, paramsId.id))
    }



    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(getProclearErrors())
        }
        if (success) {
            navigate("/order")
            alert.success("Order Deleted")
            dispatch({ type: CANCEL_ORDER_CONSTANT })

        }

        dispatch(getOrderDetails(paramsId.id))
    }, [dispatch, error, alert, success, paramsId.id])




    return (
        <>

            {
                loading ? <Loader /> :
                    <>
                        <DispatchDetails />
                        <Metadata title="Order Details" />
                        <div className="container-fluid ">

                            <div className="row mt-5 mb-5">


                                <div className="col-sm-9">

                                    <div class="table-responsive table-hover check-table">
                                        <table class="table">

                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.orderItems &&
                                                    order.orderItems.map((item) => (
                                                        <tr>
                                                            <th scope="row">
                                                                <div class="check-img">
                                                                    <img className="img-fluid" src={item.image} alt="Product" /></div>
                                                            </th>
                                                            <td>{item.name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.price}</td>
                                                            <td>₹{(item.price * item.quantity)}</td>
                                                            <td className={
                                                                order?.paymentInfo && order?.paymentInfo.status === "succeeded" ? "text-success" : "text-danger"
                                                            }>

                                                                {
                                                                    order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"
                                                                }
                                                            </td>



                                                        </tr>



                                                    ))}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <h6 className="mb-4">Payment</h6>
                                    <div className="order-total">
                                        <p >Delivery Date :<span className=""> {new Date(order?.deliveredAt).toLocaleDateString('en-GB')}</span></p>
                                        <p >Total Order :<span className="totalprice">₹{order.totalPrice && order.totalPrice} </span></p>

                                        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h3 class="modal-title fs-5" id="exampleModalToggleLabel">Cancel Order</h3>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        Are You Sure To Cancel the Order ?
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Yes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Reason</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form encType="multipart/form-data">

                                                            <input
                                                                type="text"
                                                                placeholder="Reason"
                                                                required
                                                                value={reason}
                                                                onChange={(e) => setReason(e.target.value)}
                                                            />

                                                        </form>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Submit</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-primary" disabled={order?.paymentInfo && order?.paymentInfo.status === "succeeded" ? true : false} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Cancel</button>
                                    </div>

                                    <div className="order-details mt-4">
                                        <h6>Shipping Address</h6>
                                        <ul className="details-list">
                                            <li>Name : <span>{order.user && order.user.name}</span></li>
                                            <li>Phone : <span>+91 {order.shippingInfo && order.shippingInfo.phoneNo}</span></li>
                                            <li>Address : <span>{order.shippingInfo && `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state}${order.shippingInfo.pinCode},${order.shippingInfo.country}`}</span></li>
                                        </ul>
                                    </div>


                                </div>
                            </div>
                        </div>





                    </>
            }




        </>
    )
}

export default OrderDetails