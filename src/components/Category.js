import React from "react";
import { Container, Row, Col, CardImg, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./card.css";
import women from "../images/kyle-loftus-d5GlpSOAzzg-unsplash.jpg";
import men from "../images/sedulur-papat-ktoq-6_vr-0-unsplash.jpg"
import demo from "../images/kyle-loftus-6TIoPIpMvLc-unsplash.jpg"
 
function Category () {
    return (
        <Container className="cat-container pb-5 pt-4 mt-4">
            <Row className="mt-5">
                <Col md={6} className="py-2">
                    <div className="catcard">
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to= "/home/shirt">
                            <div>
                                <CardImg className="catimg" src={men}/>
                                <div className="cat-body">
                                    <h4 className="text-white" style={{borderBottom: "1px solid rgb(255, 153, 0)", paddingBottom: "5px", display: "inline-block"}}>Shirts</h4>
                                    <p className="text-white">Some Demo Text</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col md={6} className="py-2">
                    <div className="catcard">
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to= "/home/sunglass/women">
                            <div>
                                <CardImg className="catimg" src={women}/>
                                <div className="cat-body">
                                    <h4 className="text-white" style={{borderBottom: "1px solid rgb(255, 153, 0)", paddingBottom: "5px", display: "inline-block"}}>Pants</h4>
                                    <p className="text-white">Some Demo Text</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col md={12} className="py-2">
                    <div className="catcard">
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/home/doctors">
                            <div style={{ maxHeight: "80vh", overflow: "hidden", position: "relative" }}>
                                <CardImg className="catimg" src={demo} />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    <h2>Jackets</h2>
                                    <p>At your nearest location</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>        
            </Row>
        </Container>
    )
}

export default Category;