import React, { useEffect, useState } from 'react'
import { getProduct, getProclearErrors } from '../../actions/productAction'
import Loader from '../layout/loader/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Product from '../Home/Product'
import { useParams } from 'react-router-dom'
import '../../css/pagination.css'
import '../../css/category.css'
import '../../css/responsive.css'
import Slider from '@mui/material/Slider';
import Metadata from '../layout/Metadata'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

const categories = [
  "Men-Shirts",
  "Men-Trousers",
  "Sharees",
  "Womens-Accessory",
  "Mobile-covers",
  "Chocolate-Covers",
  "Home-Decoratives",
  "Paintings",
  "jewellery"
  // "oven",
  // "electronics",
  // "machine",
  // "accesries",
  // "Shirts",
  // "Jweallries"
]
const AllProduct = () => {


  const dispatch = useDispatch()
  const alert = useAlert()
  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)
  const [price, setPrice] = useState([0, 20000])
  const [productCategories, setCategories] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [types, setTypes] = useState([])
  const [selectedTypes, setSelectedTypes] = useState("");
  const [discountValue, setDiscountValue] = useState('');
  const [value2, setValue2] = React.useState([0, 15000]);
  const [totalPage, setTotalPage] = useState("")
  const [page, setPage] = useState(1);
  const[type,setType]=useState("")
  const [gender, setGender] = React.useState('');

  // const { products, loading, error, productscount, resultPerPage, filterProductsCount } = useSelector((state) => state.products)
  const { keyword } = useParams()

  // const priceHandler = (event, newPrice) => {
  //   setPrice(newPrice)
  // }
  // useEffect(() => {
  //   if (error) {
  //     alert.error(error)
  //     dispatch(getProclearErrors())
  //   }
  //   dispatch(getProduct(keyword, currentPage, price, category))
  // }, [dispatch, keyword, currentPage, price, category, alert, error])


  // let count = filterProductsCount


  const getProducts = () => {

    axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/all_products?limit=${limit}&offset=${0}&keyword=${""}&discount=${discountValue}&maxPrice=${value2[1]}&minPrice=${value2[0]}&visible_for=${gender}`, { categories: selectedTypes }).then((res) => {
      setLoading(false)
      setProducts(res.data.products)
      setTotalPage(res.data.totalPage)
    }).catch((err) => {
      console.log(err)
    })
  }


  useEffect(() => {
    getProducts()
  }, [discountValue, selectedTypes, value2,gender])


  const addMoreData = async () => {
    const offsetnew = calculateOffset()
    console.log("offsetnew", offsetnew)
    const response = await axios.post(
      `${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/all_products?limit=${limit}&offset=${offsetnew}&keyword=${""}&discount=${discountValue}&maxPrice=${value2[1]}&minPrice=${value2[0]}`, { categories: selectedTypes });
    const resdata = response.data.products;
    setTimeout(() => {
      setProducts(resdata);
    }, 500);
  };


  useEffect(() => {
    addMoreData()
  }, [page])

  // const fetchMoreData = () => {
  //   addMoreData()
  // };



  function valuetext(value) {
    return `${value.toLocaleString()} units`; // Adjust the label based on your needs
  }

  const minDistance = 10;


  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 15000 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  const getAllTypes = async () => {

    await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/dealer/categories`).then((res) => {
      setTypes(res.data.data)
    }).catch((err) => {
      console.log(err)

    })

  }



  useEffect(() => {
    getAllTypes()
  }, [])



  const handleCheckboxChange = (event) => {
    setSelectedTypes(Number(event.target.value))
    setType("")
    setCategories([])
    setGender("")
    // if (selectedTypes.includes(type)) {
      //   setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
      // } else {
        
        //   setSelectedTypes([...selectedTypes, type]);
        // }
        // setSelectedTypes(type)
        setOffset(10)
  };


  const handleRadioChange = (event) => {
    setDiscountValue(event.target.value);
    setOffset(10)
  };



  const handleChange = (event, value) => {
    setPage(value);
  };

  const calculateOffset = () => {
    return (page - 1) * limit;
  };


  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  console.log("selectedTypes", selectedTypes)


const getSpecificCategoryTypes = async()=>{

  await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/types?type_id=${selectedTypes}&gender=${gender}`).then((res) => {
    setCategories(res.data.data)
  }).catch((err) => {
    console.log(err)

  })

}

useEffect(() => {
  getSpecificCategoryTypes()
}, [selectedTypes,gender])



const handleTypeChange = (event)=>{
  setType(event.target.value)
  setOffset(10)
}


  return (
    // <>
    //   {
    //     loading ? <Loader /> :
    //       <>
    //         <Metadata title="All Products" />

    //         <div className="container">
    //           <div className="row justify-content-center">

    //             <div className="col-sm-12">
    //               <div className="row">


    //                 <div className="main-wrapper">

    //                 <div className="">
    //               <h4 className="">Categories</h4>
    //               </div>
    //                 {/* <div class="productssss">
    //                   {
    //                     productCategories.map((ele) => (

    //                       <div class="cardsss highlight-div">
    //                         <Link to={`/categories?type=${ele.type}&title=${ele.cat_name}`}>
    //                           <div class="card">
    //                             <div className="yoyo">
    //                             <img src={ele.link} class="card-img-top" alt="..." />
    //                             </div>
    //                             <div class="product-head">
    //                               <p class="">{ele.cat_name}</p>
    //                             </div>
    //                           </div>

    //                         </Link>
    //                       </div>

    //                     ))
    //                   }

    //                 </div> */}

    //                 </div>  
    //               <Product  product={products}  updatePagination={fetchMoreData} />



    //               </div>
    //             </div>
    //           </div>
    //         </div>


    //       </>
    //   }
    // </>
    <>




      <Metadata title="All Products" />
      <div className="section">
        <div className="container">
          <div className="row">
            <div id="aside" className="col-md-3">
              <div className="aside">
                <h3 className="aside-title">Categories</h3>
                <div className="checkbox-filter">

                  {/* {
                    types.map((ele) => (
                      <div className="input-checkbox">
                        <input type="checkbox" id={ele.type} value={ele.type} onChange={handleCheckboxChange} />
                        <label for={ele.type}>
                          <span></span>
                          {ele.cat_name}

                        </label>
                      </div>
                    ))
                  } */}
                  <FormControl>
                    
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="radio-buttons-group"
                      onChange={handleCheckboxChange} 
                    >
                       {
                    types.map((ele) => (
                      <div className="input-checkbox">
                       <FormControlLabel value={ele.type} control={<Radio />} label= {ele.cat_name} />
                      </div>
                    ))
                  } 
                     
                      {/* <FormControlLabel value="20" control={<Radio />} label="25% Off or more" />
                      <FormControlLabel value="30" control={<Radio />} label="35% Off or more" />
                      <FormControlLabel value="40" control={<Radio />} label="50% Off or more" />
                      <FormControlLabel value="50" control={<Radio />} label="60% Off or more" />
                      <FormControlLabel value="60" control={<Radio />} label="70% Off or more" />
                      <FormControlLabel value="" control={<Radio />} label="None" /> */}




                    </RadioGroup>
                  </FormControl>

                </div>
              </div>



              <div className="aside">
                <h3 className="aside-title">Price</h3>
                <div className="price-filter">

                  <Slider
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={value2}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    min={0}
                    max={15000}
                    style={{ width: "143px" }}
                  // valueLabelDisplay="on"
                  />
                  <div className="" style={{ width: "176px" }}>
                    <span>
                      Minimum Price :
                      <input type="text" value={`Rs: ₹ ${value2[0]}`} className="input-class" disabled />
                    </span>
                    <span>
                      Maximum Price :
                      <input type="text" value={`Rs: ₹ ${value2[1]}`} className="input-class" disabled />
                    </span>
                  </div>

                </div>
              </div>


              <div className="aside">
                <h3 className="aside-title">Discount</h3>
                <div className="checkbox-filter">
                
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue=""
                      name="radio-buttons-group"
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel value="10" control={<Radio />} label="10% Off or more" />
                      <FormControlLabel value="20" control={<Radio />} label="25% Off or more" />
                      <FormControlLabel value="30" control={<Radio />} label="35% Off or more" />
                      <FormControlLabel value="40" control={<Radio />} label="50% Off or more" />
                      <FormControlLabel value="50" control={<Radio />} label="60% Off or more" />
                      <FormControlLabel value="60" control={<Radio />} label="70% Off or more" />
                      <FormControlLabel value="" control={<Radio />} label="None" />




                    </RadioGroup>
                  </FormControl>
                </div>
              </div>

            </div>



            <div id="store" className="col-md-9">
              <div className="store-filter clearfix">
                <div className="store-sort">
                  <label>
                    Sort By:
                    <select className="input-select">
                      <option value="0">Popular</option>
                      <option value="1">Position</option>
                    </select>
                  </label>
                  {
                    selectedTypes === 1  ||  selectedTypes === 2 ? (
                      <>
                    
                      <label>
                      For:
                        <select className="input-select" value={gender} onChange={handleGenderChange}>
                          <option value="">Select</option>
                          <option value="1">Men</option>
                          <option value="2">Women</option>
    
                        </select>
                      </label>
                      <label>
                      Types:
                        <select className="input-select" value={type} onChange={handleTypeChange}>
                        <option value={""}>Select</option>
                          {
                            productCategories.length > 0 && productCategories.map((ele)=>{
                              return(
                                <option value={ele?.value}>{ele?.label}</option>
                              ) 
                            })
                          }
                        
                  
    
                        </select>
                      </label>
                      </>
                    ):(
                      ""
                    )
                  }
               


          
                  

                </div>
                 

                <Stack spacing={2}>
                  <Pagination count={totalPage} page={page} onChange={handleChange} color="primary" />

                </Stack>
               
              </div>

              <Product product={products} />


            </div>

          </div>

        </div>

      </div>





    </>
  )
}

export default AllProduct