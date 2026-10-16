import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Col, Row, CardImg } from 'reactstrap';
import BurgerMenu from "./Burger"
import MediaQuery from 'react-responsive';
import { Link as RouterLink } from 'react-router-dom';
import logo from "../images/favicon.ico"
import { FaGoogle, FaTimes, FaUser, FaShoppingBag } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const Example = (props) => {

  const ordPage = props.isOpen
  const handleCart = () => {
    props.toggleCart();
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = (event) => {
    toggleModal();
    props.loginUser({ username: username.value, password: password.value });
    event.preventDefault();
  };

  const handleGoogleLogin = (event) => {
    toggleModal();
    props.googleLogin();
    event.preventDefault();
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  let username, password;

  return (
    <>
      <MediaQuery maxWidth={639}>
          <>
          <BurgerMenu/>
            <div className='mobile-shoping'>
              <FaShoppingBag onClick={props.toggleCart} className='ml-3'/>
                {props.orders.length > 0 && (
                  <div className="bubble">
                    {props.orders.length}
                  </div>
                )}
            </div>          
          </>
      </MediaQuery>
      <div className='d-flex justify-content-center'>
        <div className='nav-c pt-2 pb-2'>
          <Navbar light expand="md">
            <NavbarBrand href="https://www.velourabd.com/#/home" className='text-dark mr-auto'><img className='logo' src={logo}/></NavbarBrand>
            <MediaQuery minWidth={640}>
              <Nav navbar className="mx-auto">
                <NavItem className="nav-ele">
                  <div className="nav-label">Menswear</div>
                  <ul className="nav-sub" style={{ listStyleType: "none" }}>
                    <li className="pl-3 pb-1" style={{ color: "rgb(255, 153, 0)" }}>Shirt</li>
                      <RouterLink style={{ textDecoration: "none", color: "inherit" }} to="/home/shirt">
                        <li className="pl-4 pb-1">
                          <span className="sub-lable">Half Sleeve</span>
                        </li>
                      </RouterLink>
                      <RouterLink style={{ textDecoration: "none", color: "inherit" }} to="/home/full shirt">
                        <li className="pl-4 pb-1">
                          <span className="sub-lable">Full Sleeve</span>
                        </li>
                      </RouterLink>
                    <li className="pl-3 pb-1" style={{ color: "rgb(255, 153, 0)" }}>Polo</li>
                      <RouterLink style={{ textDecoration: "none", color: "inherit" }} to="/home/polo">
                        <li className="pl-4 pb-1">
                          <span className="sub-lable">Polo Shirt</span>
                        </li>
                      </RouterLink>
                    <li className="pl-3 pb-1" style={{ color: "rgb(255, 153, 0)" }}>Luxury Wear</li>
                      <RouterLink style={{ textDecoration: "none", color: "inherit" }} to="/home/luxury shirt">
                        <li className="pl-4 pb-1">
                          <span className="sub-lable">Luxury Shirt</span>
                        </li>
                      </RouterLink>
                      <RouterLink style={{ textDecoration: "none", color: "inherit" }} to="/home/luxury polo">
                        <li className="pl-4 pb-1">
                          <span className="sub-lable">Luxury Polo</span>
                        </li>
                      </RouterLink>
                    <li className="pl-3 pb-1" style={{ color: "rgb(255, 153, 0)" }}>Summer Collection</li>
                      <RouterLink style={{ textDecoration: "none", color: "inherit" }} to="/home/summer polo">
                        <li className="pl-4 pb-1">
                          <span className="sub-lable">Summer Polo</span>
                        </li>
                      </RouterLink>
                      <RouterLink style={{ textDecoration: "none", color: "inherit" }} to="/home/summer shirt">
                        <li className="pl-4 pb-1">
                          <span className="sub-lable">Summer Shirt</span>
                        </li>
                      </RouterLink>
                  </ul>
                </NavItem>
                <NavItem className='nav-ele'>
                  <div className="nav-label">Womenswear</div>
                  <ul className='nav-sub' style={{ listStyleType: 'none' }}>
                    <li className='text-center'>Coming Soon</li>
                  </ul>
                </NavItem>
                <NavItem className='nav-ele'>
                  <div className="nav-label">Kidswear </div>
                  <ul className='nav-sub' style={{ listStyleType: 'none' }}>
                    <li className='text-center'>Coming Soon</li>
                  </ul>
                </NavItem>
                <NavItem className='nav-ele'>
                  <div className="nav-label">Accessories </div>
                  <ul className='nav-sub' style={{ listStyleType: 'none' }}>
                    <li className='text-center'>Coming Soon</li>
                  </ul>
                </NavItem>
                <NavItem className='nav-ele'>
                  <RouterLink style={{textDecoration: "none", color: "inherit"}} to="/home/aboutus">
                    <div className="nav-label">About Us</div>
                  </RouterLink>
                </NavItem>
              </Nav>
            </MediaQuery>
            <MediaQuery minWidth={639}>
{/*                 <div>
                  {!props.auth.isAuthenticated ?
                    <button className='butt' onClick={toggleModal}>
                      <FaUser className='mr-2 mb-1' />Login
                      {props.auth.isFetching ?
                        <i className="fa fa-sign-in" aria-hidden="true"></i>
                        : null
                      }
                    </button>
                    :
                    <div>
                      <RouterLink to="/cart"><FaShoppingBag className='mr-3' /></RouterLink>
                      <div className="navbar-text text-dark mr-3">
                        <img
                          src={props.auth.user.photoURL}
                          alt={props.auth.user.displayName}
                          className="rounded-circle mr-2"
                          style={{ width: '30px' }}
                        />
                      </div>
                      <span onClick={handleLogout}>
                        <span className="fa fa-sign-out fa-lg"></span> Logout
                        {props.auth.isFetching ?
                          <span className="fa fa-spinner fa-pulse fa-fw"></span>
                          : null
                        }
                      </span>
                    </div>
                  }
                </div> */}
                <div className='ml-auto' style={{position: "relative", width: "5%"}}>
                  <FaShoppingBag onClick={handleCart} className='ml-3'/>
                    {props.orders.length > 0 && (
                      <div className="bubble">
                        {props.orders.length}
                      </div>
                    )}
                </div>
            </MediaQuery>
          </Navbar>
{/*           <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className='modal-back'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <motion.div
                  className='d-flex justify-content-center m-5'
                  initial={{ opacity: 0, y: -70 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -70 }}>
                  <Container className='d-flex justify-content-center' style={{ position: "absolute" }}>
                    <Col md={5} xs={12} className="p-4" style={{ borderRadius: "20px", backgroundColor: '#EDEADF' }}>
                      <h2 className="text-center mb-4">Login</h2>
                      <Form onSubmit={handleLogin}>
                        <FormGroup>
                          <Label htmlFor="username">Email</Label>
                          <Input type="text" id="username" name="username"
                            placeholder='Your Name'
                            innerRef={(input) => username = input} />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="password">Password</Label>
                          <Input type="password" id="password" name="password"
                            placeholder='Password'
                            innerRef={(input) => password = input} />
                        </FormGroup>
                        <div className='d-flex justify-content-center pb-2'>
                          <Button variant="primary" type="submit">
                            Login
                          </Button>
                        </div>
                        <div className='d-flex justify-content-center pb-2'>Or</div>
                        <div className='d-flex justify-content-center'>
                          <Button onClick={handleGoogleLogin} variant="secondary outline">
                            <FaGoogle className="mr-1" /> Sign in with Google
                          </Button>
                        </div>
                        <FaTimes onClick={toggleModal} style={{ position: "absolute", top: "10", right: "10" }} />
                      </Form>
                    </Col>
                  </Container>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence> */}
{/*           <AnimatePresence mode='wait'>
            {ordPage && (
              <OrderBar orders={props.orders} handleOrdPage={handleCart} removeOrder={props.removeExistingOrder}/>
            )}
          </AnimatePresence> */}
        </div>
      </div>
    </>
  );
};

export default Example;
