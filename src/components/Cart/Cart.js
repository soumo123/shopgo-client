import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItemsToCart, removeItemsToCart } from '../../actions/cartAction'
import '../../css/bootstrap.css';
import '../../css/responsive.css';
import '../../css/ui.css'
import './cart.css'
import '../../css/button.css'


import Metadata from '../layout/Metadata'

const Cart = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)


  const increaseQuantity = (id, quantity, stock) => {

    const newqty = quantity + 1;

    if (stock <= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newqty))
  }




  const decreaseQuantity = (id, quantity) => {

    const newqty = quantity - 1;

    if (1 >= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newqty))
  }


  const deleteCartItems = (id) => {
    dispatch(removeItemsToCart(id))
  }

  const checkoutHandler = () => {
    navigate("/shipping")
  }



  return (


    <>
      <Metadata title="Cart" />

      {
        cartItems && cartItems.length === 0 ?
          <div className="container">
            <div className="row">
              <div className="noitemcart">

                <h1>No Items in Cart</h1><i class="fa fa-shopping-cart" aria-hidden="true"></i>

              </div>

            </div>

          </div>
          : <div className="App">
            <section class="section-content padding-y">
              <div class="container">

                <div class="row">
                  <main class="col-md-12">
                    <div class="card">
                      {
                        cartItems && cartItems.map((item) => (
                          <div>
                          <table class="table table-borderless table-shopping-cart">
                            <thead class="text-muted">
                              <tr class="small text-uppercase">
                                <th scope="col">Product</th>
                                <th scope="col" width="">Quantity</th>
                                <th scope="col" width="">Price</th>
                                <th scope="col" width="">Total</th>

                                <th scope="col" class="text-right" width=""> </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>

                                <td>
                                  <figure class="itemside">
                                    <div class="aside"><img src={item.image} class="img-sm" /></div>
                                    <figcaption class="info">
                                      <a href="#" class="title text-dark">{item.name}</a>
                                
                                
                                      {/* <p class="text-muted small">Size: XL, Color: blue, <br /> Brand: Gucci</p> */}
                                    </figcaption>
                                  </figure>
                                </td>
                                <td>
                                  <form>
                                    <div class="value-button" id="decrease" onClick={() => decreaseQuantity(item.product, item.quantity)}>-</div>
                                    <input type="number" id="number" value={item.quantity} readonly />
                                    <div class="value-button" id="increase" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} value="Increase Value">+</div>
                                  </form>
                                </td>
                                <td>
                                  <div class="price-wrap">
                                    <var class="price">₹{item.price.toFixed(1)}</var>

                                  </div>
                                </td>

                                <td>
                                  <div class="price-wrap">
                                    <var class="price">₹{(item.price * item.quantity).toFixed(1)}</var>

                                  </div>
                                </td>
                                <td class="text-right">
                                  <div data-original-title="Save to Wishlist" title="" href="" class="btn btn-light mr-2" data-toggle="tooltip"> <i className="fa fa-trash"></i></div>
                                  <button class="btn btn-light" onClick={() => deleteCartItems(item.product)}> Remove</button>
                                </td>
                              </tr>
                              
                            </tbody>
                          
                          </table>
                   
                          </div>
                        ))}


                      <div class="card-body border-top d-sm-flex align-items-center justify-content-between">
  
                       <div class="">
                        <Link to="/products"><i class="fa fa-chevron-left"></i> Continue shopping </Link>
                        </div>

                       <div class="">
                           <b><p>Total Order : <span>{`₹${cartItems.reduce(
                                      (acc, item) => acc + item.quantity * item.price,
                                      0
                                    )}`}</span></p></b>
                        </div>
                        <div class="">
                        <button class="btn btn-primary float-md-right" onClick={checkoutHandler}> Make Purchase <i class="fa fa-chevron-right"></i> </button>
                       </div>
                        </div>
                    </div>

                    <div class="alert alert-success mt-3">
                      <p class="icontext"><i class="icon text-success fa fa-truck"></i> Fast Delivery within 1 week</p>
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