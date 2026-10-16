import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './Burger.css';
import { NavItem } from 'reactstrap';

const BurgerMenu = () => {
  const location = useLocation();
  const [isMen, setIsMen] = useState(false);
  const [isWomen, setIsWomen] = useState(false);
  const [iskids, setIskids] = useState(false);
  const [isasc, setIsasc] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMen = () => {
    setIsMen(!isMen);
  };

  const toggleWomen = () => {
    setIsWomen(!isWomen);
  };

  const toggleKids = () => {
    setIskids(!iskids);
  };

  const toggleAsc = () => {
    setIsasc(!isasc);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

const [activeLink, setActiveLink] = useState('');

useEffect(() => {
  setActiveLink(location.pathname);
}, [location]);

  return (
    <div style={{overflowY: "auto"}}>
      <div className="burger-menu">
        <div className="burger-icon" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`} style={{width: "50%"}}></div>
        </div>
      </div>

      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <div className='d-flex justify-content-center'>
            <li>
              <NavItem
                onClick={toggleMen}
              >
                <div className={`burg-menu pr-2 pl-2 text-center ${activeLink === '/menu' ? 'active' : ''}`}>
                  Menswear
                </div>
                <AnimatePresence>
                  {isMen && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ paddingTop: "10px" }} // Added styles
                    >
                      <h4 style={{ color: "rgb(255, 153, 0)" }} className='text-center'>T Shirt</h4>
                        <Link to="/home/shirt" style={{textDecoration: "none", color: "inherit"}} onClick={toggleMenu}>
                          <h5 className='text-center'>Half Sleve</h5>
                        </Link>
                        <Link to="/home/full shirt" style={{textDecoration: "none", color: "inherit"}} onClick={toggleMenu}>
                          <h5 className='text-center'>Full Sleve</h5>
                        </Link>
                      <h4 style={{ color: "rgb(255, 153, 0)" }} className='text-center'>Polo</h4>
                        <Link to="/home/polo" style={{textDecoration: "none", color: "inherit"}} onClick={toggleMenu}>
                          <h5 className='text-center'>Polo Shirt</h5>
                        </Link>
                      <h4 style={{ color: "rgb(255, 153, 0)" }} className='text-center'>Luxury Wear</h4>
                        <Link to="/home/luxury shirt" style={{textDecoration: "none", color: "inherit"}} onClick={toggleMenu}>
                          <h5 className='text-center'>Luxury Shirt</h5>
                        </Link>
                        <Link to="/home/luxury polo" style={{textDecoration: "none", color: "inherit"}} onClick={toggleMenu}>
                          <h5 className='text-center'>Luxury Polo</h5>
                        </Link>
                      <h4 style={{ color: "rgb(255, 153, 0)" }} className='text-center'>Summer Collection</h4>
                        <Link to="/home/summer polo" style={{textDecoration: "none", color: "inherit"}} onClick={toggleMenu}>
                          <h5 className='text-center'>Summer Polo</h5>
                        </Link>
                        <Link to="/home/summer shirt" style={{textDecoration: "none", color: "inherit"}} onClick={toggleMenu}>
                          <h5 className='text-center'>Summer Shirt</h5>
                        </Link>
                    </motion.div>
                  )}
                </AnimatePresence>             
              </NavItem>
              <NavItem
                onClick={toggleWomen}
              >
                <div className={`burg-menu pr-2 pl-2 text-center ${activeLink === '/menu' ? 'active' : ''}`}>
                  Womenswear
                </div>
                <AnimatePresence>
                  {isWomen && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ paddingTop: "10px" }} // Added styles
                    >
                      <h5 className='text-center'>Coming Soon</h5>
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavItem>
              <NavItem
                onClick={toggleKids}
              >
                <div className={`burg-menu pr-2 pl-2 text-center ${activeLink === '/menu' ? 'active' : ''}`}>
                  Kidswear
                </div>
                <AnimatePresence>
                  {iskids && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ paddingTop: "10px" }} // Added styles
                    >
                      <h5 className='text-center'>Coming Soon</h5>
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavItem>
              <NavItem
                onClick={toggleAsc}
              >
                <div className={`burg-menu pr-2 pl-2 text-center ${activeLink === '/menu' ? 'active' : ''}`}>
                  Accessories
                </div>
                <AnimatePresence>
                  {isasc && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ paddingTop: "10px" }} // Added styles
                    >
                      <h5 className='text-center'>Coming Soon</h5>
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavItem>
              <NavItem>
                <Link to="/home/aboutus" onClick={toggleMenu}> 
                  <div className={`burg-menu pr-2 pl-2 text-center ${activeLink === '/menu' ? 'active' : ''}`}>
                    About Us
                  </div>
                </Link>
              </NavItem>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
