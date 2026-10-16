import React, {useEffect} from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumb } from "../BreadCrumb";
import { StaggeredText } from "../Animations";

function PaymentPoly () {
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
                    <h1 className="text-bold text-center"><StaggeredText text={"Payment Policy"} /></h1>
                </div>
                <p className="pb-2">To begin purchasing from the site (www.velourabd.com) or platform, you may be required to register using a valid phone number and password. It is your sole responsibility to keep such information/log-in details secure. We shall not be held responsible if such information/log-in details are provided to a third party by the customer or if any third party receives the same due to the negligence of the customer and for any loss incurred as a result of the above-mentioned incidents (unauthorized access to data).</p>
                <h3 className="pb-1">There are two types of payment options:</h3>
                <p className="pb-2">
                    <strong>Cash on delivery:</strong> If the delivery location is inside Khulna, our delivery agent will collect the cash after delivering the ordered product(s). For deliveries outside Khulna, the customer has to pay the due amount to the courier service before collecting the product(s).
                </p>
                <p className="pb-2">
                    <strong>Online payment options:</strong> You can make payments using Visa Card, MasterCard, American Express (AMEX), CityTouch, DBBL Nexus, BRAC Bank, bKash, Nagad, Rocket, Sure Cash, Fast Cash, Tap’n Pay, T-Cash, Upay, MyCash, IBBL MCash, Q-Cash, Bank Asia, IBBL, AB Bank, MTB, OK Wallet, Dmoney and UnionPay.
                </p>
                <h3>Are there any International Payment methods?</h3>
                <p className="pb-2">
                    Yes, you can pay using MasterCard, VISA and American Express (AMEX). Please note, you will be asked for proof of identity.
                </p>
                <h3>Are there any hidden charges?</h3>
                <p className="pb-2">
                    No, there are no hidden charges. All payment information will be shown on the checkout page. Payment will include delivery charges and VAT accordingly. You will only pay the amount shown on the checkout page.
                </p>
                <h3>Will my information related to payment be secured?</h3>
                <p className="pb-2">
                    Rest assured, we ensure the safety of your sensitive information. However, we do not retain card information to comply with regulatory guidelines. All information related to your card/bank account will be exclusively dealt with by the payment gateway. We will ensure that the 2FA (Two Factor Authentication) is verified for payment.
                </p>
                <h3>What if my card has been declined?</h3>
                <p className="pb-2">
                    For any card decline or unsuccessful payment requests, you must contact the bank or the concerned financial institution that issued your card/ financial services. For any queries related to payment, please contact your bank/financial service provider.
                </p> 
                <h2 className="pb-3">Payment Terms and Conditions for SPACES (Furniture) Products</h2>
                <h4>Order Placement and payment:</h4>
                <p className="pb-2">
                    A 10% advance payment is required to confirm and place an order. Otherwise, the order will not be confirmed.

                    The remaining payment can be made using either Cash on Delivery (COD) or Online Payment.

                    Full payment is required before delivery for orders outside Dhaka.
                </p>
                <h4>Payment Options:</h4>
                <p className="pb-2">
                    We offer two convenient payment methods:

                    <strong>Cash on Delivery:</strong> For locations within KHULNA, our delivery agent will collect payment upon delivering the ordered product(s). For deliveries outside KHULNA, customers must pay the full amount before delivery is initiated.
                </p>
                <h4>Order Cancellation</h4>
                <p className="pb-2">
                    Orders must be canceled within 24 hours after placing the order. The customer has to request a cancellation by contacting our Customer Service department.

                    Customers are eligible for a refund if the order is canceled within the first 24 hours, and the refund will be processed using the same payment method used for the advance payment.

                    The advance payment becomes non-refundable if the cancellation is made after the initial 24-hour window.
                </p>                    
            </Container>                  
        </Container>
    )
}

export default PaymentPoly;