import React, { useEffect, useState } from 'react'
import './home.css'
import Product from './Product.js'
import Loader from '../layout/loader/Loader'
import Metadata from '../layout/Metadata'
import { getProduct, getDealProductDetails } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import BannerImg from '../../images/banner.jpg'
import BannerImg2 from '../../images/banner4.jpg'
import BannerImg3 from '../../images/chocolate-covers.jpg'
import BannerImg4 from '../../images/jwel-banner.jpg'
import BannerImg5 from '../../images/back-cover-banner.jpg'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'
import Carousels from "react-elastic-carousel";
import Item from "../../Item";
import LikeableProducts from '../products/LikeableProducts'
import '../../../src/Responsive.css'
import axios from 'axios'
import ProductBox from './ProductBox.js'




const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  // const { loading, error, products, productscount } = useSelector((state) => state.products)
  const { product } = useSelector((state) => state.dealProduct)




  const { isRegistered } = useSelector((state) => state.user)


  const [index, setIndex] = useState(0);
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(10)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  useEffect(() => {
    dispatch(getProduct())
    dispatch(getDealProductDetails())
  }, [dispatch, alert, isRegistered])


  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 5 }
  ];






  const getProducts = () => {
    axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/listofproducts?limit=${limit}&offset=${0}&keyword=${""}`).then((res) => {
      setLoading(false)
      setProducts(res.data.products)
    }).catch((err) => {
      console.log(err)
    })
  }


  useEffect(() => {
    getProducts()
 
  }, [])


  

  const addMoreData = async () => {
    setOffset(offset + 10);
    const response = await axios.get(
      `${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/listofproducts?limit=${limit}&offset=${offset}&keyword=${""}`
    );
    const resdata = response.data.products;
    setTimeout(() => {
      setProducts(products.concat(resdata));
    }, 500);
  };

  const fetchMoreData = () => {
    addMoreData()
  };



  {/* <div className="item" data-value="1">1</div> */ }







  return (
    <>
      {
        loading ? <Loader /> : <>
          <Metadata title="Shopgo" />
          <Link className="" to={`/products`}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={BannerImg}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3><span>Welcome To</span>Shopgo.in</h3>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img

                  className="d-block w-100"
                  src={BannerImg2}
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3 className="ban">Get Huge Discounts on</h3>
                  <h3 className="ban">Shirts & Trousers</h3>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>


                <img
                  className="d-block w-100 "
                  src={BannerImg4}
                  alt="Third slide"
                />
              </Carousel.Item>

              <Carousel.Item>


                <img
                  className="d-block w-100 "
                  src={BannerImg3}
                  alt="Third slide"
                />
              </Carousel.Item>



              <Carousel.Item>


                <img
                  className="d-block w-100 "
                  src={BannerImg5}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
            {/* <img src={BannerImg} alt=""/> */}
          </Link>
          <section className="products">
            <div className="container">

              <div className="row">

                <h2>Feature Products</h2>

                <div className="d-sm-flex align-item-center justify-content-center flex-wrap mt-4">

                  <Product product={products} updatePagination={fetchMoreData} />



                </div>

              </div>

            </div>
            <div className="carao">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 mb-3 mt-3" >
                    <h1>Todays Deal</h1>
                  </div>

                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12" >
                    <Carousels breakPoints={breakPoints}>

                      {
                        product && product.map((element) => (


                          <Item>
                            <Link className="" to={`/product/${element._id}`}>
                              <div className="slider-img">
                                <img className="img-fluid" src={element.images[0]?.url} />
                                <div className="discount">
                                  <p className="dis">Upto {element.discount}%</p>
                                </div>
                              </div>

                            </Link>

                          </Item>



                        ))
                      }

                    </Carousels>
                  </div>
                </div>
              </div>




            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12" >
                  <LikeableProducts />
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12" >
                  <ProductBox />
                </div>
              </div>
            </div>
          




          </section>
        </>

      }

    </>
  )
}

export default Home