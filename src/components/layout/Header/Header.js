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
  const [top100Films, settop100Films] = useState([]);
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


  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);

  };
  const search = (text) => {
    axios
      .get(
        `http://localhost:8000/api/soummya/products?keyword=${text}`
      )
      .then((ele) => {
        console.log(ele.data.products);
        settop100Films(ele.data.products);
      })
      .catch((err) => {
        console.log(err);
        settop100Films([]);
      });
  };


  useEffect(() => {
    search(text);
  }, [text]);

  const handleOnSelect = (item) => {
    console.log(item);
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
                    <ReactSearchAutocomplete
                      items={top100Films}
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
                    />
                  </div>





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
