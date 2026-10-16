import React, {useEffect} from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumb } from "../BreadCrumb";
import { StaggeredText } from "../Animations";

function RefundPoly () {
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
                    <h1 className="text-bold text-center"><StaggeredText text={"Refund Policy"} /></h1>
                </div>
                <p className="pb-2">Thank you for shopping at VELOURA. We appreciate your business and want to ensure your satisfaction with our products. Please read the following refund policy carefully.</p>
                <h3>Eligibility for Refund:</h3>
                <p className="pb-2">
                    To be eligible for a refund, the item must be unused and in the same condition that you received it. It must also be in the original packaging.<br />
                    Items that are damaged, used, or not in their original condition may not be eligible for a refund.<br />
                    Refund requests must be made within 3 days of receiving the product.
                </p>
                <h3>Refund Process:</h3>
                <p className="pb-2">
                    To initiate a refund, please contact our customer service team at velourabd.online@gmail.com or 01629743377 with your order number and details of the issue.
                    Our team will review your request and notify you of the approval or rejection of your refund.
                    If your refund is approved, it will be processed, and a credit will automatically be applied to your original method of payment within 15 days.
                </p>
                <h3>Late or Missing Refunds:</h3>
                <p className="pb-2">
                    If you haven’t received a refund within the specified time frame (5 to 7 working days after initiating refund), please check your bank account again and contact your card issuer bank or MFS. It may take some time before your refund is officially posted.
                    If you’ve done all of this and still have not received your refund, please contact us at velourabd.online@gmail.com
                </p>
                <h3>Changes to this Refund Policy:</h3>
                <p className="pb-2">
                    We reserve the right to modify this refund policy at any time. Changes and clarifications will take effect immediately upon posting on our website.
                    By making a purchase on our website, you agree to and accept the terms of this refund policy. If you have any questions or concerns, please contact our customer service team.
                </p>
                <div className="text-center pt-3">Thank you for shopping with VELOURA.</div>
            </Container>                  
        </Container>
    )
}

export default RefundPoly;