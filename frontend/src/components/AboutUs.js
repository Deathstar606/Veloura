import React from "react";
import aboutPic from "../images/about_real.jpg"
import { motion } from "framer-motion";
import { Col, Container, Row, CardImg } from "reactstrap";
import { Breadcrumb } from "./BreadCrumb";
import MediaQuery from "react-responsive";

function About() {
    return (
        <motion.div
        style={{ paddingTop: "2rem" }}
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
            <MediaQuery maxWidth={639}>
              <Breadcrumb items={[
                { link: '/home', active: false },
                { name: <span><strong style={{color: "rgb(255, 153, 0)"}}>About Us</strong></span>, link: '', active: true }
              ]} />
            </MediaQuery>
            <Container
                style={{ minHeight: "100vh", maxWidth: "88%" }}
                className="align-items-center justify-content-center"
            >
                <MediaQuery minWidth={640}>
                  <Breadcrumb items={[
                    { link: '/home', active: false },
                    { name: <span><strong style={{color: "rgb(255, 153, 0)"}}>About Us</strong></span>, link: '', active: true }
                  ]} />
                </MediaQuery>
                <Row className="w-100 pb-5 mt-4">
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <motion.div
                        className="mb-4"
                        style={{width: "100%"}}
                        initial = {{x: 50, opacity: 0}}
                        transition={{ duration: 1, delay: 0.75, type: "tween", ease: "easeIn" }}
                        whileInView={{x: 0, opacity: 1}}
                        viewport={{ once: true }}>
                            <CardImg
                                src={aboutPic}
                                style={{ objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }}
                            ></CardImg>
                        </motion.div>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div>
                            <p>
                                VELOURA is an online destination committed to providing high-quality products and an exceptional shopping experience for our customers. Established 2025, we have been dedicated to offering a wide range of Clothing category to meet various needs and preferences.
                            </p>
                            <h3>Our Mission</h3>
                            <p>
                                Veloura is more than just clothing it’s a lifestyle. We are a fashion-forward brand born from the idea that style should be effortless, expressive, and accessible. Our collections are designed for those who aren’t afraid to stand out. From timeless staples to bold statement pieces, every item is crafted with care, comfort, and creativity in mind. At Veloura, we believe fashion is a form of self-expression — and we’re here to help you wear your story with confidence. We strive to Through our commitment to excellence and customer satisfaction.
                            </p>
                            <h3>Why Choose Us</h3>
                            <ul>
                                <li>Quality Assurance: We source our products from reputable suppliers and brands, ensuring high-quality standards.</li>
                                <li>Exceptional Customer Service: Our dedicated customer support team is here to assist you and ensure a smooth shopping experience.</li>
                                <li>Secure Shopping: We prioritize the security of your transactions and personal information through secure payment methods and data encryption.</li>
                            </ul>
                            <h3>Our Commitment</h3>
                            <p>We are committed to fostering lasting relationships with our customers by delivering excellence in product quality, service, and reliability. VELOURA strives to evolve continually, exploring new trends, and expanding our product range to meet your ever-changing needs.
                            Connect With Us</p>
                            <p>Follow us on social media platforms FACEBOOK,INSTAGRAM to stay updated on our latest products, promotions, and exciting offers. Feel free to contact us at </p>
                            <p>velourabd.online@gmail.com or 01629743377 for any inquiries or assistance.
                            Thank you for choosing VELOURA. We appreciate your trust and support in our journey to provide you with exceptional products and service.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
}

export default About;