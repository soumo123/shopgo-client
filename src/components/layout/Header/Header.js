import React from 'react';
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

const Header = () => {

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

      <input type="text" id="box" placeholder="Search anything..." className="search__box" />
     <span className='btn btn-outline-primary' style={{padding:'10px' ,marginLeft:'5px' }}><i className="fas fa-search search__icon " id="icon" onclick="toggleShow()" ></i></span> 
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
