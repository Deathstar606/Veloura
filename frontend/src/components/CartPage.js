import React, {useState, useEffect} from "react";
import {Row, Col, CardImg} from "reactstrap"
import { motion } from "framer-motion";
import { Link as RouterLink } from 'react-router-dom';

export const OrderBar = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const total = props.orders.orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
  const sidebarWidth = windowWidth < 640 ? '70vw' : '500px';

  if (props.orders.orders) {
    return (
      <motion.div
        onClick={props.handleOrdPage}
        className='modal-back'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()} // Prevent click event propagation
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            backgroundColor: "white",
            width: sidebarWidth, // Use the calculated width
            height: '100vh', // Full height of the viewport
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Box shadow for some depth
            position: 'fixed', // Fix to the right side
            top: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{
            flex: 1, // Allow this container to grow and take up available space
            maxHeight: 'calc(100vh - 10px)', // Adjust max height to account for footer space
            overflowY: props.orders.orders.length > 0 ? 'auto' : 'hidden',
            padding: '0 1rem', // Add padding for aesthetics
          }}>
              {props.orders.orders.length > 0 && (
              <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                zIndex: 10,
                borderBottom: '1px solid #ccc',
                padding: '10px',
                textAlign: 'center',
              }}>
                <div className="d-flex justify-content-center">
                  <RouterLink to="/home/orders">
                    <button style={{paddingRight: "40px", paddingLeft: "40px"}} onClick={props.handleOrdPage} className='butt mt-2 mb-2'><strong style={{color: "rgb(255, 153, 0)"}}>Checkout</strong></button>
                  </RouterLink>
                </div>
                <div>Total: {total} TK</div>
              </div>
            )}
            <ul className='p-3' style={{ padding: 0, listStyleType: 'none' }}>
              {props.orders.orders.length > 0 ? (
                props.orders.orders.map((order, index) => (
                  <React.Fragment key={index}>
                    <Row style={{ marginBottom: '5px' }}>
                      <Col md={4} className="mx-0">
                        <RouterLink to={`/home/${order.category}/${order._id}`}>                      
                          <CardImg onClick={props.handleOrdPage} className='mb-4' style={{cursor: "pointer"}} src={order.image} alt={order.name} />
                        </RouterLink>
                      </Col>
                      <Col md={8}>
                        <strong>{order.name}<br /></strong>
                        <pr>Size <strong>{order.size}<br /></strong></pr>
                        <pr>Quantity: <strong>{order.quantity}<br /></strong></pr>
                        <div className='d-flex'>
                          <p className='mr-2'>Color </p>
                          <div className='color-options d-flex justify-content-center'>
                            <div
                              className="color-box"
                              style={{
                                  backgroundColor: order.color,
                                  width: '25px',
                                  height: '25px',
                                  marginRight: '10px',
                                  borderRadius: '50%',
                              }}
                            />
                          </div>
                        </div>
                        <pr>Price: <strong>{order.price * order.quantity} TK<br /></strong></pr>
                      </Col>
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginTop: "10px" }}>
                      <button className='butt' outline onClick={() => props.removeOrder(order.cart_id)}>Remove</button>
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <>
                  <h3 className='text-center pt-4'>No items in cart</h3>
                  <p className='text-center text-grey'>Start adding products</p>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    );
  }
}