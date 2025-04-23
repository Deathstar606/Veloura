import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label } from 'reactstrap';
import { Product } from './Card';
import { Breadcrumb } from './BreadCrumb';
import { BsX  } from "react-icons/bs";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./filterPanel.css"
import MediaQuery from 'react-responsive';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Range } from 'react-range';

const ProductList = (props) => {

    const [criteria, setCriteria] = useState("");
    const ChangeCriteria = (e) => {
        setCriteria(e);
    }

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    }

    const ref = useRef(null)
    const isInview = useInView(ref)

    const [selectedPriceRance, setPriceRance] = useState({
        priceRange: [0, 100],  // Default range
    });

    const handlePriceChange = (values) => {
        setPriceRance(prevState => ({
            ...prevState,
            priceRange: values
        }));
    };

    if (props.products) {
        
        const filteredClothes = props.products
        .filter(cloth => {
          return (
            cloth.price >= selectedPriceRance.priceRange[0] &&
            cloth.price <= selectedPriceRance.priceRange[1]
          );
        })
        .sort((a, b) => {
          if (criteria === "Low to High") {
            return a.price - b.price;
          } else if (criteria === "High to Low") {
            return b.price - a.price;
          } else if (criteria === "Awareness") {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (criteria === "Popularity") {
            return b.ordered - a.ordered; // More ordered items first
          }
          return 0;
        });
      
        const catdes = filteredClothes.map((cloth) => (
            <Col md={4} xs={6} className='mb-5' key={cloth._id}>
                <Product category={props.category} child={cloth} />
            </Col>
        ));

        return (
            <motion.div
                transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -1000, opacity: 0 }}>
                <Container style={{ maxWidth: "97%" }}>
                    <div className="row" ref={ref}>
                        <Breadcrumb items={[
                            { link: '/home', active: false },
                            { name: "", link: '', active: true }
                        ]} />
                        <MediaQuery maxWidth={639}>
                            <motion.button
                                className='butt mt-1'
                                style={isInview ? 
                                    { marginBottom: "10px", right: 10, zIndex: 100, position: "absolute" } : 
                                    { position: "fixed", top: 10, right: 10, zIndex: 100, border: "1px solid black", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }}
                                onClick={toggleFilter}
                            >
                                Filters
                            </motion.button>
                        </MediaQuery>
                    </div>
                    <Row>
                    <MediaQuery minWidth={639}>
                        <Col md={2} className="sidebar">
                            <div className="sidebar-content">
                                <h5 className='text-center'>Filter</h5>
                                <Form>
                                    <FormGroup>
                                        <Label className='pb-2' for="priceRange">Range</Label>
                                        <div className="price-range pr-3">
                                            <Range
                                                values={selectedPriceRance.priceRange}
                                                step={1}
                                                min={0}
                                                max={100}
                                                onChange={handlePriceChange}
                                                renderTrack={({ props, children }) => (
                                                    <div
                                                        {...props}
                                                        className="track"
                                                    >
                                                        {children}
                                                    </div>
                                                )}
                                                renderThumb={({ props }) => (
                                                    <div
                                                        {...props}
                                                        style={{backgroundColor: "transparent", border: "2px solid rgb(255, 153, 0)", borderRadius: "50%", width: "20px", height: "20px"}}
                                                        className="thumb"
                                                    />
                                                )}
                                            />
                                            <div className="price-values">
                                                <span>Min: {selectedPriceRance.priceRange[0]}</span>
                                                <span>Max: {selectedPriceRance.priceRange[1]}</span>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <Row className='pt-3'>
                                        {["Awareness", "Popularity", "High to Low", "Low to High"].map((item, index) => (
                                            <Col md={6} key={index}>
                                                <h6
                                                    className={`criteria-option mt-2 pb-1 ${
                                                        criteria === item ? "selected" : "hover-effect"
                                                    }`}
                                                    onClick={() => ChangeCriteria(item)}
                                                >
                                                    {item}
                                                </h6>
                                            </Col>
                                        ))}
                                    </Row>           
                                </Form>
                            </div>
                        </Col>
                    </MediaQuery>
                    {isFilterOpen && (
                        <AnimatePresence mode='wait'>
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ duration: 0.5, type: 'tween', ease: 'easeInOut' }}
                                style={{
                                    position: 'fixed',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '50%',
                                    backgroundColor: 'rgba(255, 255, 255)',
                                    zIndex: 1000,
                                    boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.3)',
                                    padding: '20px',
                                    overflowY: "auto"
                                }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <BsX size={30} onClick={toggleFilter} style={{ cursor: 'pointer' }} />
                                </div>
                                <div>
                                    <h4 className='text-center'>Filter</h4>
                                    <Form>
                                        <FormGroup>
                                            <Label className='pb-2' for="priceRange">Price Range</Label>
                                            <div className="price-range pr-3">
                                                <Range
                                                    values={selectedPriceRance.priceRange}
                                                    step={1}
                                                    min={0}
                                                    max={100}
                                                    onChange={handlePriceChange}
                                                    renderTrack={({ props, children }) => (
                                                        <div
                                                            {...props}
                                                            className="track"
                                                        >
                                                            {children}
                                                        </div>
                                                    )}
                                                    renderThumb={({ props }) => (
                                                        <div
                                                            {...props}
                                                            style={{backgroundColor: "transparent", border: "2px solid rgb(255, 153, 0)", borderRadius: "50%", width: "20px", height: "20px"}}
                                                            className="thumb"
                                                        />
                                                    )}
                                                />
                                                <div className="price-values">
                                                    <span>Min: {selectedPriceRance.priceRange[0]}</span>
                                                    <span>Max: {selectedPriceRance.priceRange[1]}</span>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Form>
                                    <Row>
                                        <Col xs={6}>
                                            <h6
                                                className="mt-2 pb-1 text-center"
                                                style={{
                                                whiteSpace: "nowrap",
                                                cursor: "pointer",
                                                color: criteria === "Awareness" ? "rgb(255, 153, 0)" : "black"
                                                }}
                                                onClick={() => ChangeCriteria("Awareness")}
                                            >
                                                Awareness
                                            </h6>                                        
                                        </Col>
                                        <Col xs={6}>
                                            <h6
                                                className="mt-2 pb-1 text-center"
                                                style={{
                                                whiteSpace: "nowrap",
                                                cursor: "pointer",
                                                color: criteria === "Popularity" ? "rgb(255, 153, 0)" : "black"
                                                }}
                                                onClick={() => ChangeCriteria("Popularity")}
                                            >
                                                Popularity
                                            </h6>                                        
                                        </Col>
                                        <Col xs={6}>
                                            <h6
                                                className="mt-2 pb-1 text-center"
                                                style={{
                                                whiteSpace: "nowrap",
                                                cursor: "pointer",
                                                color: criteria === "High to Low" ? "rgb(255, 153, 0)" : "black"
                                                }}
                                                onClick={() => ChangeCriteria("High to Low")}
                                            >
                                                High to Low
                                            </h6>
                                        </Col>

                                        <Col xs={6}>
                                            <h6
                                                className="mt-2 pb-1 text-center"
                                                style={{
                                                whiteSpace: "nowrap",
                                                cursor: "pointer",
                                                color: criteria === "Low to High" ? "rgb(255, 153, 0)" : "black"
                                                }}
                                                onClick={() => ChangeCriteria("Low to High")}
                                            >
                                                Low to High
                                            </h6>
                                        </Col>
                                    </Row>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}   
                        <Col md={10} style={{minHeight: "50vh"}}>
                            <Row className='mt-3'>
                                {catdes}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        );
    }
};

export default ProductList;