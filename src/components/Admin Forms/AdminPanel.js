import React, { useState } from "react";
import { Container, Row, Col, CardImg, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { motion, AnimatePresence } from "framer-motion";

const Orders = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleDetails = () => {
      setIsExpanded(!isExpanded);
    };
  
    const dateFormat = (createdAt) => {
      const dateObj = new Date(createdAt);
  
      const date = dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });
  
      const time = dateObj.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
  
      return `Date: ${date} Time: ${time}`;
    };
  
    return (
      <Col md={12}>
        <div
          onClick={toggleDetails}
          style={{
            marginBottom: "10px",
            cursor: "pointer",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <p className="text-muted">{dateFormat(order.createdAt)}</p>
          <p><strong>Customer:</strong> {order.firstName} {order.lastName}</p>
          <p><strong>Phone:</strong> {order.phoneNumber}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p>Order Type: {order.order_type}</p>
          <div>
            {order.items.map((item, index) => (
              <span key={index}>
                {item.name} x {item.quantity}
                {index < order.items.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
          <h5>Total: {order.total} Tk</h5>
          <div className="d-flex justify-content-end">
            <div className='butt' style={{display: "inline-block"}}>
                Delivered
            </div>
            <div className='butt' style={{display: "inline-block"}}>
                Donwload Invoice
            </div>
            <div className='butt' style={{display: "inline-block"}}>
                Cancel
            </div>
          </div>
        </div>
  
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {order.items.map((item, index) => (
                <Row key={index} style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <Col md={3} className="mx-0">
                    <CardImg
                      src={item.image} // full image path assumed to be in `item.image`
                      alt={item.name}
                    />
                  </Col>
                  <Col md={9} className="d-flex align-items-center">
                    <div>
                      <h5>{item.name} x {item.quantity}</h5>
                      <h5>Price: {item.price * parseInt(item.quantity, 10)} Tk</h5>
                    </div>
                  </Col>
                </Row>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Col>
    );
};

function AdminPanel(props) {
    const [isComplete, setIsComplete] = useState("paid");
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleChangeAdmin = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmitAdmin = (e) => {
        e.preventDefault();
        props.loginUser(credentials);
    };

    const handleClick = (select) => {
        setIsComplete(select)
    }

    const inComp = props.prodreq.map((order) => {
        if (!order.payment_stat) {
          return (
            <Orders order={order}/>
          )
        }
    })

    const Comp = props.prodreq.map((order) => {
        if (order.payment_stat) {
          return (
            <Orders order={order}/>
          )
        }
    })

    const Delivered = props.prodreq.map((order) => {
        if (order.order_stat) {
          return (
            <Orders order={order}/>
          )
        }
    })

    return (
        <>
            {props.auth.isAuthenticated ? (
                <>
                    <Container style={{position: "relative"}} className="p-2">
                        <div 
                            style={{
                                position: "absolute",
                                right: "20px", 
                                display: "flex", 
                                alignItems: "center",
                                gap: "10px" 
                            }}
                        >
                            <div className="mt-1 mr-2">{props.auth.user.username}</div>
                            <div 
                                style={{ cursor: "pointer" }} 
                                className="butt" 
                                onClick={props.logoutUser}
                            >
                                Logout
                            </div>
                        </div>
                    </Container>
                    <Container className="mt-4 pt-4">
                        <div className="d-flex pt-3 pb-3">
                            <div
                                className="mr-3 butt"
                                style={{ backgroundColor: isComplete === "unpaid" ? "orange" : "" }}
                                onClick={() => handleClick("unpaid")}
                                >
                                Unpaid
                            </div>
                            <button
                                className="mr-3 butt"
                                style={{ backgroundColor: isComplete === "paid" ? "orange" : "" }}
                                onClick={() => handleClick("paid")}
                                >
                                Paid
                            </button>
                            <button
                                className="mr-3"
                                style={{ backgroundColor: isComplete === "delivered" ? "orange" : "" }}
                                onClick={() => handleClick("delivered")}
                                >
                                Delivered
                            </button>
                        </div>
                        <Row>
                            {isComplete === "paid"
                                ? Comp
                                : isComplete === "unpaid"
                                ? inComp
                                : isComplete === "delivered"
                                ? Delivered
                                : null}
                        </Row> 
                    </Container>              
                </>
            ) : (
                <Container className="p-4">
                    <Form onSubmit={handleSubmitAdmin} className="p-4 border rounded shadow">
                        <h2 className="mb-4 text-center">Admin Login</h2>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                value={credentials.username}
                                onChange={handleChangeAdmin}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={credentials.password}
                                onChange={handleChangeAdmin}
                                required
                            />
                        </FormGroup>
                        <Button className="butt" type="submit">
                            Login
                        </Button>
                    </Form>
                </Container>
            )}
        </>
    );
}

export default AdminPanel;
