import React,{useEffect,useState} from 'react'
import '../../../src/Responsive.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { Rating } from "@material-ui/lab";
import InfiniteScroll from "react-infinite-scroll-component";



const Product = ({ product,updatePagination }) => {

  
  // const options = {
  //   size: "large",
  //   value: product?.ratings==0 ? 3 : product?.ratings,
  //   readOnly: true,
  //   precision: 0.5

  // }

  console.log("comming products",product)


 
  return (
    <>
      <div className="col-sm-12  mt-5">
        <div className="box-list">
     
        {
          product.map((ele)=>(
            <div className="productcard">
            <Link className="" to={`/product/${ele._id}`}>
              <div className="product-img">
                <img src={ele?.images[0]?.url} style={{ height: 200 }} />
              </div>
  
              <div className="details-box">
                <h4>{ele.name}</h4>
                <div className="rating d-sm-flex justify-content-around">
                  <Rating size="large" value= {ele?.ratings==0 ? 3 : ele?.ratings} readOnly= {true} precision={0.5}/><span className="review">{ele.numOfReviews} reviews</span>
                </div>
                <span className="price">{`₹${ele.price}`}</span>
              </div>
  
            </Link>
          </div>
          ))
        }
       

     
      </div>
      </div>
    </>
  )
}

export default Product
