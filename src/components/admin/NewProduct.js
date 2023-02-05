import React,{useState,useEffect} from 'react'
import{useNavigate} from 'react-router-dom'
import Sidebar from './Sidebar'
import {useSelector,useDispatch} from 'react-redux'
import {createProduct,getProclearErrors} from '../../actions/productAction'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Metadata from '../layout/Metadata'
import '../../css/error.css'

const NewProduct = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const {loading,success,error} =useSelector((state) => state.newProduct)

const[name,setName] = useState("")
const[price,setPrice] = useState("")
const[discount,setDiscount] = useState(0)
const[description,setDescription] = useState("")
const[stock,setStock] = useState(0)
const[images,setImages] = useState([])
const[imagesPreview,setImagesPreview] = useState([])
const[category,setCategory] = useState("")
const[color,setColor] = useState("")
const[size,setSize] = useState("")
const [deliveryDays,setDeliveryDays] = useState("")
const[productsearch,setProductsearch] = useState("")
const[formerror,setFormerror] = useState({})



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


  useEffect(() => {
   if(error){
    toast.error("Ooops !!! Product Not Added ")
    // dispatch(getProclearErrors())
    dispatch({type:NEW_PRODUCT_RESET})
    navigate("/")
   }
   if(success){
    toast.success("Product Added Successfully")
    dispatch({type:NEW_PRODUCT_RESET})
    navigate("/")
    
   }
   
  }, [dispatch,alert,navigate,toast,success,error])
  

const validateForm = ()=>{
 let err = {}
let flag= false
 if(name.length<3){
    err.name = "Product name should be greater than 3"
 }
 if(description.length>5000){
    err.name = "Description should be less than 5000 words"
 }
 if(category.length==0){
    err.category = "Category not selected"
 }
 if(stock<0){
    err.stock = "Stock not less than 0"
 }
 if(discount<0){
    err.discount = "Discount not less than 0 "
 }
 if(deliveryDays<0){
    err.deliveryDays = "Delivery Days not less than 0"
 }
 if(imagesPreview.length <=0){
    err.imagesPreview = "Image not selected"
 }

setFormerror({...err,err})
console.log("err")
if(Object.keys(err).length==0){
    flag= true
}else{
    flag= false
}

return flag


}


  const createProductSubmitHandler = (e)=>{
    e.preventDefault()
   

    let isValid = validateForm()
    console.log("flag",isValid)
    
    if(isValid){
        const myForm = new FormData()
        myForm.set("name",name)
        myForm.set("price",price)
        myForm.set("description",description)
        myForm.set("stock",stock)
        myForm.set("discount",discount)
        myForm.set("category",category)
        myForm.set("color",color)
        myForm.set("size",size)
        myForm.set("deliveryDays",deliveryDays)
        myForm.set("productsearch",name+category)
        images.forEach((image)=>{
            myForm.append("images",image)
        })
        console.log("comming here")
        dispatch(createProduct(myForm))
    }else{
        console.log("isValid - comming here",isValid)
        toast.error("Check the Fields")
    }
   
}


const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };




    return (
        <>
        <Metadata title="Add Product"/>
        <div className="container-fluid display-table">
      <div className="row display-table-row">
        <Sidebar/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">

                        <div className="formdiv">
                            <h1>Add New Product</h1>
                            <form className="form"
                                encType="multipart/form-data"
                                onSubmit={createProductSubmitHandler}
                            >
                                <div className="row">

                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Product Name</label>

                                            <input
                                                type="text" className="form-control inputtext"
                                                placeholder="Name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <span className="error-color">{formerror.name}</span>
                                        </div>
                                    </div>

                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Price</label>

                                            <input
                                                type="number" className="form-control inputtext"
                                                placeholder="Price"
                                                required
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>

                                            <textarea
                                                type="number" className="form-control inputtext"
                                                placeholder="Description"
                                                required
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                            <span className="error-color">{formerror.description}</span>
                                        </div>
                                    </div>

                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Category</label>
                                        <select onChange={(e)=>setCategory(e.target.value)}>
                                            <option value="">Choose Category</option> 
                                            {
                                                categories.map((cate)=>(
                                                    <option key={cate} value={cate}>{cate}</option>
                                                ))
                                            }

                                        </select>
                                        
                                           
                                        </div>
                                        <span className="error-color">{formerror.category}</span>
                                    </div>

                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Stock</label>

                                            <input
                                                type="number" className="form-control inputtext"
                                                placeholder="Stock"
                                                required
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                                size="10"
                                            />
                                            <span className="error-color">{formerror.stock}</span>
                                        </div>
                                    </div>

                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Discount</label>

                                            <input
                                                type="number" className="form-control inputtext"
                                                placeholder="Discount"
                                                required
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                                size="10"
                                            />
                                            <span className="error-color">{formerror.discount}</span>

                                        </div>
                                    </div>
                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Color</label>

                                            <input
                                                type="text" className="form-control inputtext"
                                                placeholder="Color"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                size="10"
                                            />
                                        </div>
                                    </div>
                                            
                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Size</label>

                                            <input
                                                type="text" className="form-control inputtext"
                                                placeholder="Size"
                                                value={size}
                                                onChange={(e) => setSize(e.target.value)}
                                                size="10"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Delivery Days</label>

                                            <input
                                                type="number" className="form-control inputtext"
                                                placeholder="Delivery Days"
                                                value={deliveryDays}
                                                onChange={(e) => setDeliveryDays(e.target.value)}
                                                size="10"
                                            />
                                            <span className="error-color">{formerror.deliveryDays}</span>

                                        </div>
                                    </div>




                                
                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            <label className="form-label">Image</label>

                                            <input
                                                type="file" className="form-control inputtext"
                                                placeholder="Choose the image"
                                                
                                                
                                                accept="image/*"
                                                onChange={createProductImagesChange}
                                                multiple
                                            />
                                            <span className="error-color">{formerror.imagesPreview}</span>

                                        </div>
                                    </div>

                                    <div className="col-sm-4 ">
                                        <div className="mb-3">
                                            {
                                                imagesPreview.map((image,index)=>(
                                                    <img key={index} src={image} alt="Image"/>
                                                ))
                                            }
                                        </div>
                                    </div>




                                    <div className="col-sm-12 text-center">
                                        <div className="mb-3">
                                            <input
                                                type="submit"
                                                value="Continue"
                                                className="button cart_button_checkout"
                                                disabled={loading ? true : false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
</div>
<ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                
                  
                  
                   />
</div>

        </>
    )
}

export default NewProduct