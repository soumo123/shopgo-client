import React from 'react';
import {useState} from 'react'
import { Link } from 'react-router-dom'
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

const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState()

  const submitHandler = (e) => {
      e.preventDefault()
      if (keyword.trim()) {
          navigate(`/products/${keyword}`)
      } else {
          navigate(`/products`)
      }
  }
  return (
    <>
<Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/"><h3 className="font-link">Shopgo.in</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
      
            <Nav.Link href="/" className='btn ' ><i class="fa fa-home" ></i>HOME</Nav.Link>
            <Nav.Link href="/products" className='btn'>Products</Nav.Link>
            <Nav.Link href="/contact" className='btn '>Contact</Nav.Link>
            {/* <Nav.Link href="/search">search</Nav.Link> */}

            <div class="container_search">

      <input type="text" id="box" placeholder="Search Products" className="search__box" onChange={(e) => setKeyword(e.target.value)} />
     {/* <span className='btn btn-outline-primary' style={{padding:'10px' ,marginLeft:'5px' }}><i className="fas fa-search search__icon " id="icon" onclick="toggleShow()" ></i></span>  */}
     <button type="button" className="btn btn-primary" style={{marginLeft:'5px', size:"small"}} onClick={submitHandler}>Search</button>
      </div>
          </Nav>
        <UserOptions/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
      </>
      
  )

};

export default Header;
