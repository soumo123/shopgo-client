import React from 'react';
import { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import profileImage from '../../../images/profile.png'
import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import shopgo from '../../../images/shopgo.png'
import UserOptions from './UserOptions';
import '../../../css/header.css'
import '../../../Responsive.css'
import { useNavigate } from "react-router-dom"
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import '../../../css/Navbar.css'

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState()
  const { products, loading, error, productscount, resultPerPage, filterProductsCount } = useSelector((state) => state.products)
  const [searchData, setSearchData] = useState([]);
  const[inputValue,setInputValue]=useState("")
  const [selected, setSelected] = useState({});

  const [text, setText] = useState("");

  
  const submitHandler = (e) => {
    console.log("comminggg")
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate(`/products`)
    }
  }



  const handleOnSelect = (item) => {
    console.log("item",item);
    console.log("comming")
    if (item.name.trim()) {
      navigate(`/products/${item.name}`)
    } else {
      navigate(`/products`)
    }

  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  const formatResult = (item) => {

    return (
      <div className="result-wrapper">
        {item.name.length > 10
          ? <span className="result-span" >{`${item.name.substring(0, 35)}...`}</span>
          : <span className="result-span" >{item.name}</span>}

      </div>
    );
  };


  


  const handleOnSearchorg = async(string, results) => {
    setInputValue(string)
    if (string.length > 2 ) {
     await axios.get(`http://localhost:8000/api/soummya/products?keyword=${string}`).then((res) => {
        setSearchData(res.data.products);
      })
    }
  };

  const handleOnHoverorg = (result) => {

  };


  const handleOnSelectorg = (item) => {
    // console.log(item);
    if (item) {
      console.log("item",item)
      setSelected(item);
      setInputValue("")
      navigate(`/products/${item.name}`)

    }else{
      navigate(`/products/${inputValue}`)

    }
  };

console.log("inputVlaue",inputValue)
  const handleOnFocusorg = () => {
  
  };







  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Navbar collapseOnSelect expand="lg" className="navbar-color">
          <Link to='#' className='menu-bars'>
            <i class="fa fa-bars" aria-hidden="true" onClick={showSidebar} style={{ color: 'black' }}></i>
          </Link>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <i class="fa fa-times" style={{ color: 'white' }} aria-hidden="true"></i>
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="home-image">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Container fluid>
            <Navbar.Brand href="/"><h3 className="font-link">Shopgo.in</h3></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="m-auto">

                {/* <Nav.Link href="/" >HOME</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link> */}
                {/* <Nav.Link href="/search">search</Nav.Link> */}

                <div class="container_search">
                  <div style={{ width: 300, margin: 20 }}>
                    {/* <ReactSearchAutocomplete
                      items={searchData}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={handleOnSelect}
                      onFocus={handleOnFocus}
                      onClear={handleOnClear}
                      styling={{ zIndex: 1 }}
                      formatResult={formatResult}
                      onSubmit={submitHandler}
                      value={products}
                      placeholder='Search Products'
                      autoFocus
                    /> */}
                    <ReactSearchAutocomplete
                                items={searchData}
                                fuseOptions={{
                                  shouldSort: true,
                                  threshold: 0.6,
                                  location: 0,
                                  distance: 100,
                                  maxPatternLength: 32,
                                  minMatchCharLength: 3,
                                  keys: ["name", "name"],
                                }} // Search on both fields
                                resultStringKeyName="name" // String to display in the results
                                onSearch={handleOnSearchorg}
                                onHover={handleOnHoverorg}
                                inputSearchString={selected.lavel}
                                onSelect={handleOnSelectorg}
                                placeholder={"Search by organization name"}
                                onFocus={handleOnFocusorg}
                                onClear={handleOnClear}
                                showIcon={false}
                                styling={{
                                  height: "34px",
                                  border: "1px solid black",
                                  borderRadius: "4px",
                                  backgroundColor: "white",
                                  boxShadow: "none",
                                  hoverBackgroundColor: "#EA702B",
                                  color: "black",
                                  fontSize: "12px",
                                  fontFamily: "Courier",
                                  iconColor: "green",
                                  lineColor: "#EA702B",
                                  placeholderColor: "black",
                                  clearIconMargin: "3px 8px 0 0",
                                  zIndex: 1,
                                }}
                              />
                  </div>
                  <button type="submit" onClick={submitHandler}>search</button>




                  {/* <form onSubmit={submitHandler}>

                  <input type="text" id="box" placeholder="Search Products" className="search__box" onChange={(e) => setKeyword(e.target.value)} />
                  <i className="fa fa-search ml-3"></i>
                </form> */}
                </div>
              </Nav>
              <UserOptions />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </IconContext.Provider>
      {/* <div class="col-md-12 mega-menu">
        <span>1st</span>
      </div> */}
    </>

  )

};

export default Header;
