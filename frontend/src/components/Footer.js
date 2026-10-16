import React from 'react';
import pay from "../images/sslcom.png"
import { Form, Button, Container, Row, Col, FormGroup, Input } from 'reactstrap';
import ssl from "../images/Pay logo/1 (1).png"
import ae from '../images/Pay logo/ae.png';
import ak from '../images/Pay logo/ak.png';
import bk from '../images/Pay logo/bk.png';
import ipat from '../images/Pay logo/ipat.png';
import iw from '../images/Pay logo/iw.png';
import masterc from '../images/Pay logo/masterc.png';
import mc from '../images/Pay logo/mc.png';
import nagad from '../images/Pay logo/nagad.png';
import np from '../images/Pay logo/np.png';
import qc from '../images/Pay logo/qc.png';
import rc from '../images/Pay logo/rc.png';
import unip from '../images/Pay logo/unip.png';
import up from '../images/Pay logo/up.png';
import visa from '../images/Pay logo/visa.png';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const paymentIcons = [
  ae,
  ak,
  bk,
  ipat,
  iw,
  masterc,
  mc,
  nagad,
  np,
  qc,
  rc,
  unip,
  up,
  visa,
];

function Footer() {
  return (
    <>
    <div
      style={{
        /* borderTop: "2px solid rgba(199, 198, 197, 0.13)", */
        background: "rgba(163, 163, 163, 0.41)",
        padding: "5% 0",
      }}
    >
      <Container className='pt-4' style={{ maxWidth: "91%" }}>
        <Row className='d-felx justify-content-center'>
          <Col md={2}>
            <h3 className='text-center mt-4'>Legal</h3>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/privacy">
              <div className='text-center mt-3' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>Privacy Policy</div>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/payment">
              <div className='text-center mt-2' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>Payment Policy</div>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/shipping">
              <div className='text-center mt-2' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>Shipping Policy</div>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/terms">
              <div className='text-center mt-2' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>Terms & Conditions</div>
            </Link>
          </Col>
          <Col md={2}>
            <h3 className='text-center mt-4'>Information</h3>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/refund">
              <div className='text-center mt-3' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>Return & Refund Policy</div>
            </Link>
          </Col>
          <Col md={2}>
            <h3 className='text-center mt-4'>Company</h3>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/aboutus">
              <div className='text-center mt-3' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>About us</div>
            </Link>
          </Col>
          <Col md={2}>
            <h3 className='text-center mt-4'>Socials</h3>
            <div className='d-flex justify-content-center mt-3 mb-4'>
              <a href="https://www.facebook.com/velourabd" target="_blank" rel="noopener noreferrer" className="mr-2">
                <FaFacebook color='black' size={25} />
              </a>
              <a href="https://www.instagram.com/velourabd" target="_blank" rel="noopener noreferrer" className="mr-2">
                <FaInstagram color='black' size={25} />
              </a>
            </div>

            <div className='text-center mb-2'>
              <a href="tel:01629743377" className="text-dark">01629743377</a>
            </div>

            <div className='text-center mt-3'>Email Us...</div>
            <div className='text-center mb-4'>
              <a href="mailto:velourabd.online@gmail.com" className="text-dark">velourabd.online@gmail.com</a>
            </div>

            <div className='text-center mt-3'>Warehouse Location</div>
            <div className='text-center mb-4'>
              <a
                href="https://maps.app.goo.gl/sDs3fmfQAaif4wDU6?g_st=com.google.maps.preview.copy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark"
              >
                View on Google Maps
              </a>
            </div>
          </Col>
        </Row>
        <Row className='d-felx justify-content-center'>
          <Col md={8} className='d-flex justify-content-center'>
            <div className='mt-4'>
              <h3 className='text-center'>Payment Partners</h3>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col md={7}>
            <Row className="g-0 d-flex justify-content-center pr-3 pl-3">
              {paymentIcons.map((icon, idx) => (
                <Col
                  md={1}
                  sm={3}
                  xs={3}
                  key={idx}
                  className="text-center border-start border-end px-1 mb-2"
                >
                  <img
                    className="text-dark p-2 rounded"
                    style={{width: "100%", border: "1px solid black", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"}}
                    src={icon}
                  />
                </Col>
              ))}
            </Row>
          </Col>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
              <div>
                <div className='text-center mb-1 mt-3'>Verified by</div>
                  <img style={{width: "125px"}} src={ssl}/>
              </div>
            </div>
            <div className='text-center mt-3'>Trade License Number 10/458 </div>
        </Row>
      </Container>
    </div>
    <div className='w-100 text-white text-center py-3' style={{backgroundColor: "black"}}>
      <div>All rights Reserved Veloura © 2025</div>
      <div className="small text-muted mt-2">
        Developed By{" "}
        <a
          href="https://www.linkedin.com/in/fardin-rahman-2311942bb/" // <-- replace with your actual LinkedIn URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-primary"
        >
          Fardin Rahman
        </a>
      </div>
{/*       <div className="small text-muted">Northern University of Business & Texhnology Khulna</div> */}
    </div>
    </>
  );
}

export default Footer;
