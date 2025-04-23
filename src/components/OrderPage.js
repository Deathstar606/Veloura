import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardImg,
  Container,
} from 'reactstrap';
import { Breadcrumb } from './BreadCrumb';
import axios from 'axios';
import { baseUrl } from '../Redux/shared/baseurl';
import { motion, useInView as Fview } from "framer-motion";
import MediaQuery from 'react-responsive';
import pp from "../images/sslcom.png"

function Order (props) {
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [deliveryZone, setDeliveryZone] = useState(null);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlezone = (zone) => {
    setDeliveryZone(zone);
  };

    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      email: '',
      total: 0,
      items: []
    });
  
    useEffect(() => {
      const total = props.orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
      setTotal(total)
    }, [props.orders]);

    useEffect(() => {
      const savedFormData = localStorage.getItem('VelouraFormData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData((prevData) => ({
          ...prevData,
          firstName: parsedData.firstName || '',
          lastName: parsedData.lastName || '',
          phoneNumber: parsedData.phoneNumber || '',
          address: parsedData.address || '',
          email: parsedData.email || '',
        }));
      }
    }, []);
  
    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        total: total,
        items: props.orders,
      }));
    }, [total, props.orders]);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault(); // prevent default form behavior
      localStorage.setItem('VelouraFormData', JSON.stringify(formData));
      
      const orderToSubmit = {
        ...formData,
        order_stat: paymentMethod // Add it here
      };

      if (formData.firstName == "") return alert("Please type your first name");
      if (formData.lastName == "") return alert("Please type your last name");
      if (formData.phoneNumber == "") return alert("Please type your phone number");
      if (formData.address == "") return alert("Please type your address");
      if (formData.email == "") return alert("Please enter a valid email address");
      if (formData.total == 0) return alert("Please add items to your cart first");

      try {
        console.log("Form Data:", formData);
        
        const response = await axios.post("http://localhost:9000/" + 'orders', orderToSubmit, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        window.open(response.data.url);
        
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          // No response from server
          console.error("No response received:", error.request);
        } else {
          // Other error
          console.error("Error submitting order:", error.message);
        }
      }
    };

    return (
      <motion.div
      transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
      initial = {{x: 1000, opacity: 0}}
      animate= {{x: 0, opacity: 1}}
      exit= {{x: -1000, opacity: 0}}>
          <div>
            <MediaQuery maxWidth={639}>
              <Breadcrumb items={[
                { link: '/home', active: false },
                { name: "", link: '', active: true }
              ]} />
            </MediaQuery>
            <h1 className='pt-4 mr-1 ml-1 pb-2 text-center row-header' style={{fontSize: "clamp(54px, 4vw, 100px)"}}>Confirm Your Order</h1>
            <p className='text-center pb-3'>Fill out necessary information</p>
            <Container className="pb-5">
              <Row className="no-gutters align-items-start">
                <Col md={6}>
                  <h2 className="text-center mb-4">Customer Details</h2>
                    <Form /* onSubmit={handleSubmit} */>
                      <FormGroup>
                        <Label>First Name</Label>
                          <Input
                            style={{
                              border: "1px solid black",
                              backgroundColor: "transparent",
                            }}
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                      <FormGroup>
                        <Label>Last Name</Label>
                          <Input
                            style={{
                                border: "1px solid black",
                                backgroundColor: "transparent",
                              }}
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                      </FormGroup>
                      <FormGroup>
                        <Label>Phone Number</Label>
                          <Input
                            style={{
                                border: "1px solid black",
                                backgroundColor: "transparent",
                              }}
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                      <FormGroup>
                        <Label>Email</Label>
                          <Input
                            style={{
                                border: "1px solid black",
                                backgroundColor: "transparent",
                              }}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                      <FormGroup>
                        <Label>Address</Label>
                          <Input
                            style={{
                                border: "1px solid black",
                                backgroundColor: "transparent",
                              }}
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                    </Form>
                    <h2 className='text-center mt-4'>Select Shipping mbethod</h2>
                    <div>
                      <div
                        className='text-center mt-4'
                        onClick={() => handlezone('inside')}
                        style={{
                          border: "1px solid black",
                          padding: "40px",
                          position: "relative",
                          cursor: "pointer"
                        }}
                      >
                        Collect from inside khulna with a delivery charge of 80TK
                        {deliveryZone === 'inside' && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                              color: "grey",
                              padding: "5px 10px",
                              fontSize: "12px"
                            }}
                          >
                            Selected
                          </div>
                        )}
                      </div>

                      <div
                        className='text-center mt-2'
                        onClick={() => handlezone('outside')}
                        style={{
                          border: "1px solid black",
                          padding: "40px",
                          position: "relative",
                          cursor: "pointer"
                        }}
                      >
                        Collect from outside khulna with a delivery charge of 125TK
                        {deliveryZone === 'outside' && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                              color: "grey",
                              padding: "5px 10px",
                              fontSize: "12px"
                            }}
                          >
                            Selected
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col md={1}></Col>
                <Col md={5} className="p-2 pt-5">
                  <ul className='p-3' style={{ padding: 0, listStyleType: 'none' }}>
                    {props.orders.length > 0 ? (
                      props.orders.map((order, index) => (
                        <React.Fragment key={index}>
                          <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} className="mx-0">
                              <CardImg className='mb-4' src={order.image} alt={order.name} />
                            </Col>
                            <Col md={8}>
                              <strong>{order.name}<br /></strong>
                              <strong>Size</strong> {order.size}<br />
                              <strong>Quantity</strong> {order.quantity}<br />
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
                              <strong>Price:</strong> {order.price} Tk<br />
                            </Col>
                          </Row>
                          <div className='pb-2' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className='butt' outline onClick={() => props.removeExistingOrder(order.cart_id)}>Remove</button>
                          </div>
                        </React.Fragment>
                      ))
                    ) : (
                      <h3 className='text-center'>No items in cart</h3>
                    )}
                  </ul>
                  <h4><strong>Total:</strong> {total} Tk</h4>
                  <div className='d-flex'>
                    <FormGroup check className="mr-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={handlePaymentChange}
                        />
                          Cash on Delivery
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={paymentMethod === 'online'}
                          onChange={handlePaymentChange}
                        />
                        Online Payment
                      </Label>
                    </FormGroup>
                  </div>
                  <div className='pt-3 home-butt'>
                    <button
                      className='butt'
                      onClick={handleSubmit}
                    >
                      Confirm Order
                    </button>
                  </div>
                  <h5 className='pt-4 pb-1'>Pay with</h5>
                  <img style={{maxWidth: "150px"}} src={pp}/>
                  <p className='pt-2'>Includes all payment methods bikash, nagad, visa, mastercard etc....</p>
                </Col>
              </Row>
            </Container>
        </div>
      </motion.div>
    )
}

export default Order