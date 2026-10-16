import React, {useEffect} from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumb } from "../BreadCrumb";
import { StaggeredText } from "../Animations";

function TermsConditions() {
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
                    <h1 className="text-bold text-center"><StaggeredText text={"Terms & Conditions"} /></h1>
                </div>

                <p className="pb-2">
                    Welcome to VELOURA! You are reading these Terms and Conditions as you are using the website www.velourabd.com. Here, “We”, “Us”, “Our”, “Website”, “Site”, “System”, “Platforms” includes (All Social Media, Wearable Technology) will refer to VELOURA and “You”, “Your”, “User” will refer to Customers and Visitors.
                </p>
                <p className="pb-2">
                    The Terms and Conditions elaborated on this page directly impact the manner users use VELOURA’s website and any content available on the Platform. All orders placed on the site or the other platforms presuppose the acknowledgment of the Terms and Conditions by the ordering customer and will be bound by these Terms and Conditions.
                </p>
                <p className="pb-2">
                    By accessing, visiting, and using the site’s services, content, and other resources, you consciously agree to the Terms and Conditions stated on this page. If you deny conforming to any or all of the conditions or clauses mentioned in these Terms and Conditions, you are advised to stop using our site and platforms right away.
                </p>

                <h3>Intellectual Property Rights</h3>
                <p className="pb-2">
                    www.velourabd.com owns all content, resources, and materials available on site and platforms solely unless we state otherwise. Any modification, reproduction or redistribution of our content is strictly prohibited.
                </p>

                <h3>User Content</h3>
                <p className="pb-2">
                    Any content (text, images, audio, etc.) published by users grants VELOURA a global, non-exclusive license to use that content. Content must not infringe on third-party rights. VELOURA may alter or remove user content at any time.
                </p>

                <h3>Termination of Usage</h3>
                <p className="pb-2">
                    VELOURA reserves the right to modify these terms or terminate user access at any time without prior notice. The most recent version of the terms will always apply.
                </p>

                <h3>Important Disclaimers</h3>
                <ul>
                    <li>We are not liable for damages or injuries resulting from use or inability to use the site.</li>
                    <li>User interactions are at your own risk. Exercise caution when engaging with others.</li>
                    <li>We do not guarantee uninterrupted or error-free operation of the site.</li>
                </ul>

                <h3>Regarding Products</h3>
                <ul>
                    <li>Color/display differences may occur. Return the product immediately if it does not match the description.</li>
                    <li>Illustrations and specifications are informative unless otherwise stated.</li>
                    <li>Products/services are for personal use, not resale.</li>
                </ul>

                <h3>Regarding Inaccuracy</h3>
                <p className="pb-2">
                    We may correct pricing or descriptive errors without notice. We strive for accuracy but cannot guarantee it at all times.
                </p>

                <h3>Force Majeure</h3>
                <p className="pb-2">
                    We are not liable for delays or non-performance due to events beyond our control, including natural disasters, technical issues, or third-party failures.
                </p>

                <h3>Cancellation Policy</h3>
                <p className="pb-2">
                    You may cancel an order during confirmation call. Once confirmed, cancellation is not allowed until the delivery attempt is made.
                </p>

                <h3>Pricing and Price Corrections</h3>
                <p className="pb-2">
                    Prices are fixed once an order is placed. We reserve the right to change prices without prior notice. No adjustments will be made post-purchase.
                </p>

                <h3>Value Added Tax (VAT)</h3>
                <p className="pb-2">
                    All products are subject to a 7.5% VAT at the point of sale, included in the final purchase price.
                </p>

                <h3>Delivery</h3>
                <ul>
                    <li>Inside Khulna: 24–48 hours (Charge: 70 tk)</li>
                    <li>Outside Khulna: 24–96 hours (Charge: 120 tk)</li>
                    <li>Urgent delivery is not available on Fridays or government holidays.</li>
                    <li>If delivery fails, a refund will be processed within 14 business days upon bank confirmation.</li>
                    <li>Incorrect shipping info is the customer’s responsibility.</li>
                    <li>Unreachable customers may lead to cancellation and re-ordering.</li>
                </ul>

                <h3>Order Acceptance/Confirmation</h3>
                <p className="pb-2">
                    Order confirmation may involve identity/payment verification. Failure to comply can result in cancellation. We may refuse or cancel any order due to technical errors or fraud suspicion.
                </p>

                <h3>Receiving Incorrect Quantity or Product</h3>
                <p className="pb-2">
                    Submit an unboxing video to claim replacement or adjustment in case of incorrect product or quantity delivery.
                </p>

                <h3>Product Availability and Limitations</h3>
                <p className="pb-2">
                    We may limit product quantities or cancel orders due to stock issues. Refunds will be issued for paid, canceled orders.
                </p>

                <h3>Limitations of Liability</h3>
                <p className="pb-2">
                    Our maximum liability is limited to the amount paid for the product. We are not liable for indirect or consequential losses.
                </p>

                <h3>Applicable Law</h3>
                <p className="pb-2">
                    These Terms and Conditions are governed by the laws of Bangladesh.
                </p>
            </Container>
        </Container>
    );
}

export default TermsConditions;
