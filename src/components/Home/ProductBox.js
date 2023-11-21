import React from 'react'
import ttttt from '../../images/a2zlogo.png'
import {Link}from 'react-router-dom'
import '../../css/category.css'
import ProductBox2 from './ProductBox2'



const ProductBox = () => {


    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-xs-6">
                            <div className="shop">
                                <div className="shop-img">
                                    <img src={"https://rukminim2.flixcart.com/image/832/832/xif0q/kurta/u/i/b/3xl-teal-blue-006-asagar-original-imagky4zzwzczjnd.jpeg?q=70"} alt="" />
                                </div>
                                <div className="shop-body">
                                    <h3>Up to 60% off | Styles for women<br />Collection</h3>
                                    <Link to="/products" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-xs-6">
                            <div className="shop">
                                <div className="shop-img">
                                    <img src={"https://rukminim2.flixcart.com/image/832/832/xif0q/jacket/z/6/z/l-1-no-535-2-ftx-original-imagtntpm4j4navp.jpeg?q=70"} alt="" />
                                </div>
                                <div className="shop-body">
                                    <h3>Under ₹499 | Pocket-friendly fashion<br />Collection</h3>
                                    <Link to="/products" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-xs-6">
                            <div className="shop">
                                <div className="shop-img">
                                    <img src={"https://rukminim2.flixcart.com/image/832/832/l1whaq80/earring/q/s/e/na-sjer220-royalinn-original-imagdddbagbpczkz.jpeg?q=70"} alt="" />
                                </div>
                                <div className="shop-body">
                                    <h3>Up to 70% off | Trending new launches<br />Collection</h3>
                                    <Link to="/products" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right"></i></Link>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <ProductBox2/>
        </>
    )
}

export default ProductBox