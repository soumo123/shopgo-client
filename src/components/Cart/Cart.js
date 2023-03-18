import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItemsToCart, removeItemsToCart } from '../../actions/cartAction'
import '../../css/bootstrap.css';
import '../../css/responsive.css';
import '../../css/ui.css'
import './cart.css'
import '../../css/button.css'
import { useAlert } from 'react-alert'

import Metadata from '../layout/Metadata'

const Cart = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)
  const {isAuthenticated,user} = useSelector((state)=>state.user)

  const increaseQuantity = (id, quantity, stock) => {

    const newqty = quantity + 1;

    if (stock <= quantity) {
      return
    }
    dispatch(addItemsToCart(id,newqty,user))
  }

  const total = cartItems.reduce(
    (acc, item) => (acc + item.quantity * item.price),
    0
  )



  const decreaseQuantity = (id, quantity) => {

    const newqty = quantity - 1;

    if (1 >= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newqty,user))
  }


  const deleteCartItems = (id) => {
    dispatch(removeItemsToCart(id))
  }

  const checkoutHandler = () => {
    if(isAuthenticated){
      navigate("/shipping")
    }else{
        alert.error("Please Login First")
    }
    
  }





  return (


    <>
      <Metadata title="Cart" />

      {
        cartItems && cartItems.length === 0 ?
          <div className="container">
            <div className="row">
              <div className="noitemcart">

                <h1>No Items in Cart</h1><i className="fa fa-shopping-cart" aria-hidden="true"></i>

              </div>

            </div>

          </div>
          : <div className="App">
            <section className="section-content padding-y">
              <div className="container">

                <div className="row">
                  <main className="col-md-12">
                    <div className="card">
                      {
                        cartItems && cartItems.map((item) => (
                          <div>
                          <table className="table table-borderless table-shopping-cart">
                            <thead className="text-muted">
                              <tr className="small text-uppercase">
                                <th scope="col">Product</th>
                                <th scope="col" width="">Quantity</th>
                                <th scope="col" width="">Price</th>
                                <th scope="col" width="">Total</th>

                                <th scope="col" className="text-right" width=""> </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>

                                <td>
                                  <figure className="itemside">
                                    <div className="aside"><img src={item.image} className="img-sm" /></div>
                                    <figcaption className="info">
                                      <a href="#" className="title text-dark">{item.name}</a>
                                
                                
                                      {/* <p className="text-muted small">Size: XL, Color: blue, <br /> Brand: Gucci</p> */}
                                    </figcaption>
                                  </figure>
                                </td>
                                <td>
                                  <form>
                                    <div className="value-button" id="decrease" onClick={() => decreaseQuantity(item.product, item.quantity)}>-</div>
                                    <input type="number" id="number" value={item.quantity} readonly />
                                    <div className="value-button" id="increase" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} value="Increase Value">+</div>
                                  </form>
                                </td>
                                <td>
                                  <div className="price-wrap">
                                    <var className="price">₹{item.price}</var>

                                  </div>
                                </td>

                                <td>
                                  <div className="price-wrap">
                                    <var className="price">₹{(item.price * item.quantity).toFixed(2)}</var>

                                  </div>
                                </td>
                                <td className="text-right">
                                  <div data-original-title="Save to Wishlist" title="" href="" data-toggle="tooltip"></div>
                                  <button className="btn btn-outline-danger" onClick={() => deleteCartItems(item.product)}> Remove</button>
                                </td>
                              </tr>
                              
                            </tbody>
                          
                          </table>
                   
                          </div>
                        ))}


                      <div className="card-body border-top d-sm-flex align-items-center justify-content-between">
  
                       <div className="">
                        <Link to="/products"><i className="fa fa-chevron-left"></i> Continue shopping </Link>
                        </div>

                       <div className="">
                           <b><p>Total Order : <span>₹{total.toFixed(2)}</span></p></b>
                        </div>
                        <div className="">
                        <button className="btn btn-primary float-md-right" onClick={checkoutHandler}> Make Purchase <i className="fa fa-chevron-right"></i> </button>
                       </div>
                        </div>
                    </div>

                    <div className="alert alert-success mt-3">
                      <p className="icontext"><i className="icon text-success fa fa-truck"></i> Fast Delivery within 3-4 Days</p>
                    </div>

                  </main>
                </div>

              </div>
            </section>
          </div>

      }


    </>
  )
}

export default Cart