import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import { Link as RouterLink } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import BurgerMenu from "./Burger";
import logo from "../images/favicon.ico";

const Example = (props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ordersCount = props.orders?.length || 0;

  return (
    <header className="veloura-nav-wrap">
      <div className={`veloura-nav-bar liquid-glass ${scrolled ? "scrolled" : ""}`}>
        <Navbar light expand="md" className="w-100 p-0 d-flex align-items-center justify-content-between">
          {/* Brand Identity */}
          <RouterLink
            to="/home"
            className="d-inline-flex align-items-center text-decoration-none mr-auto"
            style={{ gap: "0.65rem" }}
          >
            <img className="logo" src={logo} alt="Veloura Logo" />
            <span className="brand-wordmark">Veloura</span>
          </RouterLink>

          {/* Desktop Navigation */}
          <Nav navbar className="mx-auto d-none d-md-flex align-items-center">
            <NavItem className="nav-ele">
              <div className="nav-label">Menswear</div>
              <ul className="nav-sub">
                <li className="nav-sub-group">Shirt</li>
                <li>
                  <RouterLink className="text-decoration-none" to="/home/shirt">
                    <span className="sub-lable">Half Sleeve</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink className="text-decoration-none" to="/home/full shirt">
                    <span className="sub-lable">Full Sleeve</span>
                  </RouterLink>
                </li>

                <li className="nav-sub-group">Polo</li>
                <li>
                  <RouterLink className="text-decoration-none" to="/home/polo">
                    <span className="sub-lable">Polo Shirt</span>
                  </RouterLink>
                </li>

                <li className="nav-sub-group">Luxury Wear</li>
                <li>
                  <RouterLink className="text-decoration-none" to="/home/luxury shirt">
                    <span className="sub-lable">Luxury Shirt</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink className="text-decoration-none" to="/home/luxury polo">
                    <span className="sub-lable">Luxury Polo</span>
                  </RouterLink>
                </li>

                <li className="nav-sub-group">Summer Collection</li>
                <li>
                  <RouterLink className="text-decoration-none" to="/home/summer polo">
                    <span className="sub-lable">Summer Polo</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink className="text-decoration-none" to="/home/summer shirt">
                    <span className="sub-lable">Summer Shirt</span>
                  </RouterLink>
                </li>
              </ul>
            </NavItem>

            <NavItem className="nav-ele">
              <div className="nav-label">Womenswear</div>
              <ul className="nav-sub text-center" style={{ minWidth: "170px" }}>
                <li className="eyebrow-label justify-content-center">Coming Soon</li>
              </ul>
            </NavItem>

            <NavItem className="nav-ele">
              <div className="nav-label">Kidswear</div>
              <ul className="nav-sub text-center" style={{ minWidth: "170px" }}>
                <li className="eyebrow-label justify-content-center">Coming Soon</li>
              </ul>
            </NavItem>

            <NavItem className="nav-ele">
              <div className="nav-label">Accessories</div>
              <ul className="nav-sub text-center" style={{ minWidth: "170px" }}>
                <li className="eyebrow-label justify-content-center">Coming Soon</li>
              </ul>
            </NavItem>

            <NavItem className="nav-ele">
              <RouterLink className="nav-label" to="/home/aboutus">
                About Us
              </RouterLink>
            </NavItem>
          </Nav>

          {/* Right Action Controls (Cart + Mobile Burger) */}
          <div className="d-flex align-items-center ml-auto" style={{ gap: "0.75rem" }}>
            <button
              type="button"
              onClick={props.toggleCart}
              className="nav-cart-btn"
              aria-label="Open shopping bag"
            >
              <FaShoppingBag size={15} />
              {ordersCount > 0 && <span className="bubble">{ordersCount}</span>}
            </button>

            <div className="d-md-none">
              <BurgerMenu />
            </div>
          </div>
        </Navbar>
      </div>
    </header>
  );
};

export default Example;
