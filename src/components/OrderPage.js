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

function Order (props) {
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('onlinePayment');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
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
          email: parsedData.email || ''
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
    
      try {
        console.log("Form Data:", formData);
    
        const response = await axios.post("http://localhost:9000/" + 'orders', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        console.log("Order submitted successfully:", response.data);
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
            <h1 className='p-4 text-center row-header' style={{fontSize: "clamp(54px, 4vw, 100px)"}}>Confirm Your Order</h1>
            <p className='text-center pb-3'>Some Description About Our Establishment</p>
            <Container className="pb-5">
              <Row>
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
                    </Form>
                  </Col>
                <Col md={5} className="p-3 m-3" style={{ border: "black solid 0.5px" }}>
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
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className='butt' outline onClick={() => props.removeExistingOrder(order._id)}>Remove</button>
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
                          value="cashOnDelivery"
                          checked={paymentMethod === 'cashOnDelivery'}
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
                          value="onlinePayment"
                          checked={paymentMethod === 'onlinePayment'}
                          onChange={handlePaymentChange}
                        />
                        Online Payment
                      </Label>
                    </FormGroup>
                  </div>
                  <div className='pb-3 pt-3 home-butt'>
                    <button
                      className='butt'
                      onClick={handleSubmit}
                    >
                      Confirm Order
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
        </div>
      </motion.div>
    )
}

export default Order