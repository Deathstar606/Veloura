import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardImg, ButtonGroup, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Breadcrumb } from './BreadCrumb';
import { motion } from 'framer-motion';
import MediaQuery from 'react-responsive';
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './details.css'
import { FaPhone, FaWhatsapp } from 'react-icons/fa6';

/* function RenderRev ({reviews}) {
    return (
        <ul className="list-unstyled">
            {reviews.map((rev) => {
                return (
                        <li>
                        <p>{rev.review}</p>
                        <p>{rev.rating} ⭐</p>
                        <p>-- {rev.author.firstname} {rev.author.lastname} </p>
                        </li>
                );
            })}
        </ul>
    )
} */

const Deats = (props) => {
    const [mainImage, setMainImage] = useState('');
    const [fullscreenImage, setFullscreenImage] = useState("");
    const [selectedSize, setSelectedSize] = useState('');
    const [colors, setColor] = useState('');
    const [quantity, setQuantity] = useState(1);

    const { category } = useParams();
/*     const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [lensMat, setLensMat] = useState("");
    const [leftEye, setLeftEye] = useState("");
    const [rightEye, setRightEye] = useState(""); */

    const updateQuantity = (val) => {
            if (selectedSize === '') {
                alert("Please select a size first");
                return    
            }

            if (!isNaN(val) && val >= 0 && val <= maxQuantity) {
                setQuantity(val);
            }
        }

    const handleOpenFullscreen = (imageUrl) => {
        setFullscreenImage(imageUrl);
      };

    const handleCloseFullscreen = () => {
        setFullscreenImage(null);
      };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        if (props.deats.size[size] > 0) {
            setQuantity(1);
        }
        else {
            setQuantity(0);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    useEffect(() => {
        if (props.deats) {
            if (colors === '' || !props.deats.color.includes(colors)) {
                setColor(props.deats.color[0]); 
            }

            if (props.deats.color.includes(colors)) {
                const imageUrl = props.deats.images[colors]?.[0];
                if (imageUrl) {
                    setMainImage(imageUrl);
                }
            }
        } else {
            setColor('');
        }
    }, [props.deats, colors]);

    const discountedPrice = props.deats?.discount
    ? Math.round(props.deats.price - (props.deats.price * (props.deats.discount / 100)))
    : null;

    const handleChange = (c) => {
        setColor(c)
    }

    const maxQuantity = props.deats.size?.[selectedSize] || 1;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedSize == "") return alert("Please select a size")
        if (quantity == 0) return alert("This Size is out of stock")
        props.addNewOrder(
            {
                cart_id: Math.floor(100000 + Math.random() * 900000),
                _id: props.deats._id,
                category: category,
                name: props.deats.name,
                price: discountedPrice? discountedPrice : props.deats.price,
                color: colors,
                image: props.deats.images[colors][0],
                size: selectedSize,
                quantity: quantity,
            }
        );
        props.toggleCart();
    }

    const sizes = Object.entries(props.deats?.size || {}).map(([size, stock]) => (
            <Button
                key={size}
                outline
                color="dark"
                onClick={() => handleSizeChange(size)}
                active={selectedSize === size}
            >
                {size}
            </Button>
    ));

/*     const similar = props.similar
        .filter((element) => element.shape === props.deats.shape && element._id !== props.deats._id)
        .slice(0, 6) // Limit to 6 products
        .map((element) => (
            <Col md={3} key={element._id}>
                <Product child={element} />
            </Col>
        ));

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = () => {
        props.postReview(props.deats._id, rating, review);
    };

    const handleOpenPanel = (panelType) => {
        setCurrentPanel(panelType);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setCurrentPanel('');
    };

    const handleMaterialSelect = (material) => {
        setLensMat(material);
        handleOpenPanel('power');
    };

    const handleRightEye = (event) => {
        setRightEye(event.target.value);
    };

    const handleLeftEye = (event) => {
        setLeftEye(event.target.value);
    };

    const handleOrder = () => {
        props.addNewOrder(
            {
                _id: props.deats._id,
                name: props.deats.name,
                price: discountedPrice? discountedPrice : props.deats.price,
                color: colors,
                image: props.deats.images[colors][0],
                lensMat: lensMat,
                leftEye: leftEye,
                rightEye: rightEye
            }
        )
    }; */
    
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.deats?.color?.length > 0 && colors) {
        return (
            <>
            <div className='w-100 text-white text-center py-2 mb-4' style={{backgroundColor: "black"}}>
                5% off on all online payments
            </div>
            <Container style={{ maxWidth: "90%" }} className='pb-5'>
                <MediaQuery maxWidth={639}>
                    <Row style={{ maxWidth: '100%', overflow: 'hidden' }}>
                    <Breadcrumb
                        style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'block',       // make sure it's treated like a block
                        width: '100%'           // make sure it doesn't overflow the parent
                        }}
                        items={[
                        { name: 'Home', link: '/home', active: false },
                        { name: category, link: `/home/${encodeURIComponent(category)}`, active: false },
                        { name: <span style={{color: "rgb(255, 153, 0)"}}><strong>{props.deats.name}</strong></span>, link: '', active: true }
                        ]}
                    />
                    </Row>
                </MediaQuery>
                <Row /* className='d-flex justify-content-center' */>
                    <MediaQuery minWidth={640}>
                        <Col md={2}>
                            <Breadcrumb 
                                items={[
                                { name: 'Home', link: '/home', active: false },
                                { name: category, link: `/home/${category}`, active: false },
                                {
                                name: (
                                    <span style={{ color: "rgb(255, 153, 0)", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: 150 }}>
                                        <strong>{props.deats.name}</strong>
                                    </span>
                                ),
                                link: '',
                                active: true,
                                }
                            ]} />
                        </Col>
                        <Col md={2} className="mx-0" style={{ height: '80vh', display: "flex", justifyContent: "end"}}>
                            <div className="image-previews">
                                {props.deats.images[colors]?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt="Preview"
                                        className="img-thumbnail"
                                        onClick={() => setMainImage(img)}
                                    />
                                ))}
                            </div>
                        </Col>
                        <Col md={5} className='mx-0 d-flex justify-content-center'>
                            <img onClick={() => handleOpenFullscreen(mainImage)} src={mainImage} alt="Main" style={{ width: '90%', objectFit: 'fill', height: "80vh" }} />
                        </Col>
                    </MediaQuery>
                    <MediaQuery maxWidth={639}>
                        <Swiper
                            style={{zIndex: "0"}}
                            className='mb-2'
                            slidesPerView={'1'}
                            spaceBetween={15}
                            pagination={{
                            clickable: true,
                            }}
                            modules={[ Pagination, EffectCoverflow]}
                        >
                            {props.deats.images[colors]?.map((img, index) => (
                                <SwiperSlide>
                                    <div style={{height: "50vh"}}>
                                        <CardImg onClick={() => handleOpenFullscreen(img)} className="acrd" style={{position: "relative"}} src={img}/>
                                    </div>
                                </SwiperSlide>
                            ))}                            
                        </Swiper>
                    </MediaQuery>
                    <Col md={2} className='d-flex align-items-center'>
                        <div className="w-100">
                            <h4>{props.deats.name}</h4>
                            <div className="color-options d-flex pt-1 pb-2">
                                {props.deats.color.map((col, index) => (
                                    <div
                                        key={index}
                                        className="color-box"
                                        style={{ backgroundColor: col, width: '25px', height: '25px', marginRight: '10px',  marginBottom: "10px", borderRadius: '50%' }}
                                        onClick={() => handleChange(col)} // Add logic for color selection if needed
                                    />
                                ))}
                            </div>
                            <div className='d-flex'>
                                <h5>
                                    {discountedPrice ? (
                                        <>
                                            <span className='text-muted mr-2' style={{ textDecoration: 'line-through' }}>
                                                {props.deats.price}TK
                                            </span>
                                            <span className="text-danger ms-2">
                                                {discountedPrice}TK
                                            </span>
                                        </>
                                    ) : (
                                        `${props.deats.price} TK`
                                    )}
                                </h5>
                                <div className='mb-2 ml-2'>
                                    {props.deats.discount && (
                                        <span className="badge bg-danger">{props.deats.discount}% OFF</span>
                                    )}
                                </div>                                
                            </div>
                            <ButtonGroup className="mt-2">
                                {sizes}
                            </ButtonGroup>
                            {selectedSize && props.deats.size[selectedSize] < 5 && (
                                <div style={{ fontSize: '0.9rem', marginTop: '4px', color: 'black' }}>
                                    Stock remaining: {props.deats.size[selectedSize]}
                                </div>
                            )}
                            {selectedSize && props.deats.size[selectedSize] > 0 && (
                                <>
                                    <h5 className='mt-3'>Quantity</h5>
                                    <div className="d-flex align-items-center mt-1 mb-3">
                                        <Button outline onClick={() => updateQuantity(quantity - 1)}>−</Button>
                                        <input
                                            type="text"
                                            className="form-control text-center mx-2"
                                            value={quantity}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value, 10);
                                                updateQuantity(val);
                                            }}
                                            style={{ width: '40px', border: "2px solid rgb(255, 153, 0)" }}
                                        />
                                        <Button outline onClick={() => updateQuantity(quantity + 1)}>+</Button>
                                    </div>
                                </>
                            )}
                            <div className="mt-3 w-100">
                                <button onClick={handleSubmit} className='butt'><strong>Buy Now<span className='ml-1' style={{color: "rgb(255, 153, 0)"}}>!!</span></strong></button>
                            </div>
                            <div className='d-flex mt-3'>
                                <a href='https://wa.me/+8801924223600' target='_blank' rel='noopener noreferrer'>
                                    <FaWhatsapp className='mr-2' color='green' size={30} />
                                </a>
                                <a href='tel:01629743377'>
                                    <FaPhone color='black' size={25} />
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
                        {fullscreenImage && (
                            <motion.div
                                className="fullscreen-preview"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{duration: 0.25}}
                                layoutId="fullscreen-preview"
                            >
                                <div onClick={handleCloseFullscreen} style={{position: "absolute", top:10, right: 10}}>✖</div>
                                <CardImg src={fullscreenImage} alt="Full Screen Preview" />
                            </motion.div>
                        )}
                    <Row className='mt-4 d-flex justify-content-center'>
                        <Col md={6}>
                            <h4 className='pt-4'>Description</h4>
                            <p className='pb-4'>{props.deats.description}</p>
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}>
                                <div className="text-center mt-4 mb-1">
                                    <h5 className="fw-bold">Size Chart</h5>
                                </div>
                                <div style={{ overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none" }}>
                                    <table className="table table-bordered text-center">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Measurement Points Inch</th>
                                                <th>M</th>
                                                <th>L</th>
                                                <th>XL</th>
                                                <th>XXL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Length Standard (Inch)</td>
                                                <td>38</td>
                                                <td>40</td>
                                                <td>42</td>
                                                <td>44</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </Col>
{/*                         <Col md={6}>
                            
                        </Col> */}
                    </Row>
{/*                 <Row className="mt-4">
                    <Col>
                        <h5>Add a Review</h5>
                        <Row className='mt-4'>
                            <Col md={9}>
                                <ReactStars
                                    className='mb-2'
                                    count={5} // Number of stars
                                    value={rating} // Current rating
                                    onChange={handleRatingChange} // Handle rating change
                                    size={24} // Size of the stars
                                    activeColor="#ffd700" // Color of the active star
                                />
                                <Form>
                                    <FormGroup>
                                        <Input
                                            type="textarea"
                                            placeholder="Write your review here"
                                            style={{
                                                borderColor: '#CDCDCD',
                                                borderRadius: '7px',
                                                padding: '10px',
                                                minHeight: '100px',
                                                overflow: 'hidden',
                                                resize: 'none'
                                            }}
                                            onChange={handleReviewChange}
                                        />
                                    </FormGroup>
                                </Form>
                            </Col>
                            <MediaQuery minWidth={639}>
                                <Col md={2} className='mt-5'>
                                    <button className='butt' onClick={handleSubmit}>
                                        Submit Review
                                    </button>
                                </Col>
                            </MediaQuery>
                            <MediaQuery maxWidth={638}>
                                <Col md={3} className='mt-1 mb-4'>
                                    <button className='butt' onClick={handleSubmit}>
                                        Submit Review
                                    </button>
                                </Col>
                            </MediaQuery>
                        </Row>
                    </Col>
                </Row> */}
                {/* <h2 className='mt-5'>You Might Also Like</h2> */}
{/*                 <Row className='mt-5 mb-5'>
                    {similar}
                </Row>  */}
            </Container>
            </>
        );
    }
};

export default Deats;