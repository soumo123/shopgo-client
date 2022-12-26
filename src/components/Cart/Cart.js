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











          // : <div className="cart_section">
          //   <div className="container-fluid">
          //     <div className="row">
          //       <div className="col-lg-10 offset-lg-1">
          //         <div className="cart_container">
          //           <div className="cart_title">Add To Cart</div>
          //           <div className="cart_items">
          //             <ul className="cart_list">

          //               {
          //                 cartItems && cartItems.map((item) => (
          //                   <li className="cart_item clearfix">
          //                     <div className="cart_item_image"><img src={item.image} alt="" /></div>
          //                     <div className="cart_item_info d-flex flex-md-row align-items-center flex-column justify-content-between">
          //                       <div className="cart_item_name cart_info_col">
          //                         <div className="cart_item_title">Name</div>
          //                         <div className="cart_item_text">{item.name}</div>
          //                       </div>
          //                        <div className="cart_item_color cart_info_col">
          //                       <div class="input-group">
          //                         <span class="input-group-btn">
          //                           <button type="button" onClick={() => decreaseQuantity(item.product, item.quantity)} class="btn btn-danger btn-number" data-type="minus" data-field="quant[2]">
          //                             <span class="fa fa-minus"></span>
          //                           </button>
          //                         </span>
          //                         <input type="text" class="form-control input-number" value={item.quantity} readonly />
          //                         <span class="input-group-btn">
          //                           <button type="button" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} class="btn btn-success btn-number" data-type="plus" data-field="quant[2]">
          //                             <span class="fa fa-plus"></span>
          //                           </button>
          //                         </span>
          //                       </div>
          //                       </div>


          //                       {/* <div className="cart_item_quantity cart_info_col">
          //                             <div className="cart_item_title">Quantity</div>
          //                             <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
          //                             <input className="cart_item_text" type="number" value={item.quantity} readonly  />
          //                             <button onClick = {()=>decreaseQuantity(item.product,item.quantity)}>-</button>
          //                         </div> */}
          //                       <div className="cart_item_price cart_info_col">
          //                         <div className="cart_item_title">Price</div>
          //                         <div className="cart_item_text">₹{item.price.toFixed(1)}</div>
          //                       </div>

          //                       <div className="cart_item_total cart_info_col">
          //                         <div className="cart_item_title">Total</div>
          //                         <div className="cart_item_text">₹{(item.price * item.quantity).toFixed(1)}</div>
          //                       </div>
          //                       <div className="cart_item_total cart_info_col">
          //                         <div className="cart_item_title"></div>
          //                         <div className="cart_item_text" onClick={() => deleteCartItems(item.product)}><i className="fa fa-trash"></i></div>
          //                       </div>
          //                     </div>
          //                   </li>
          //                 ))
          //               }
          //             </ul>
          //           </div>
          //           <div className="order_total">
          //             <div className="order_total_content text-end">
          //               <div className="order_total_title">Order Total:</div>
          //               <div className="order_total_amount">{`₹${cartItems.reduce(
          //           (acc, item) => acc + item.quantity * item.price,
          //           0
          //         )}`}</div>
          //             </div>
          //           </div>
          //           <div className="cart_buttons">
          //             <Link to="/products"> <button type="button" className="button cart_button_clear" >Continue Shopping</button> </Link>
          //             <button type="button" className="button cart_button_checkout" onClick={checkoutHandler}>Check Out </button> </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
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
                      <p class="icontext"><i class="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
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