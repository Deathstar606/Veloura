import React, {useEffect} from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumb } from "../BreadCrumb";
import { StaggeredText } from "../Animations";

function ShippingPoly () {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []); 

    return (
        <Container style={{ maxWidth: "90%" }}>
            <Row>
                <Breadcrumb items={[
                    { link: '/home', active: false },
                    { name: "", link: '', active: true }
                ]} />   
            </Row>
            <Container className="pb-5">
                <div className="d-flex justify-content-center pb-4 mt-4">
                    <h1 className="text-bold text-center"><StaggeredText text={"Shipping Policy"} /></h1>
                </div>
                <p className="pb-2">Thank you for choosing VELOURA as your trusted online product or service provider. This Delivery Policy outlines the terms and conditions regarding the delivery of products and services purchased through our platform. By placing an order with us, you agree to comply with and be bound by the following policies:</p>
                <h3>Order Processing Time:</h3>
                <p className="pb-2">
                    Orders are typically processed within 1-3 business days from the date of purchase.
                    Processing times may vary depending on the nature of the product or service.
                </p>
                <h3>Delivery Methods:</h3>
                <p className="pb-2">
                    We offer various delivery methods, including standard shipping, express shipping depending on the nature of the product or service.
                </p>
                <h3>Shipping Addresses:</h3>
                <p className="pb-2">
                    It is the responsibility of the customer to provide accurate and complete shipping information.
                    We are not responsible for items delivered to incorrect addresses provided by the customer.
                </p>
                <h3>Shipping Restrictions:</h3>
                <p className="pb-2">
                    Some products or services may have shipping restrictions based on geographic location or local regulations. Customers are responsible for checking and complying with these restrictions before placing an order.
                </p>
                <h3>Delivery Confirmation:</h3>
                <p className="pb-2">
                    Upon successful delivery, customers will receive a confirmation email with relevant details, including tracking information (if applicable).
                    Digital products or services will be delivered via email or through the customer's account on our platform. 
                </p> 
                <h3>Shipping Delays:</h3>
                <p className="pb-2">
                    While we strive to meet all delivery timelines, unforeseen circumstances such as weather conditions, customs delays, or other external factors may cause delays. We appreciate your understanding in such situations.
                </p>
                <h3>Returns Due to Non-Delivery:</h3>
                <p className="pb-2"> 
                    If a product is returned to us due to non-delivery (e.g., incorrect address provided), the customer will be responsible for any additional shipping charges.
                </p>
                <h3>Contact Information:</h3>
                <p>
                    If you have any questions or concerns regarding your order or our delivery policy, please contact our customer service team at velourabd.online@gmail.com or 01629743377.
                </p>   
            </Container>                  
        </Container>
    )
}

export default ShippingPoly;