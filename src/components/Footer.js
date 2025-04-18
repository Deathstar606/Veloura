import React from 'react';
import { Form, Button, Container, Row, Col, FormGroup, Input } from 'reactstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <div
      style={{
        background: "linear-gradient(to top, #EDEADF, white)",
        padding: "5% 0",
      }}
    >
      <Container style={{ maxWidth: "85%" }}>
        <Row>
          <Col md={5}>
            <h1
              className="text-dark"
              style={{ paddingBottom: "5%", paddingTop: "10%" }}
            >
              Reinvent Your Wardrobe
            </h1>
          </Col>
        </Row>
        <Row>
          <div className="d-flex" style={{ paddingBottom: "10%" }}>
            <Col
              md={12}
              xs={10}
              style={{ paddingRight: "5px" }}
              className="d-flex"
            >
              {/* Added inline style to reduce right padding */}
              <Form style={{ width: "100%" }}>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Mail Address"
                    required
                    style={{
                      borderWidth: "2px",
                      borderColor: "#909090",
                      backgroundColor: "#F5F5F5",
                      color: "#333333",
                    }}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Button
              variant="dark"
              type="submit"
              style={{
                height: "40px",
                backgroundColor: "#333333",
                color: "white",
              }}
            >
              Send
            </Button>
          </div>
          <Col md={4}></Col>
          <Col md={2} xs={6}>
            <ul style={{ listStyleType: "none", color: "#333333" }}>
              <li className="mb-4">Home</li>
              <li className="mb-4">Category</li>
              <li className="mb-4">Know Us</li>
            </ul>
          </Col>
          <Col md={2} xs={6}>
            <ul style={{ listStyleType: "none", color: "#333333" }}>
              <li className="mb-4">Shirts</li>
              <li className="mb-4">Pants</li>
              <li className="mb-4">Hoodies</li>
            </ul>
          </Col>
          <ul
            className="fa-ul"
            style={{
              listStyleType: "none",
              fontSize: "24px",
              display: "flex",
            }}
          >
            <li className="mb-4" style={{ marginRight: "20px" }}>
              <FaFacebook color="#333333" />
            </li>
            <li className="mb-4" style={{ marginRight: "20px" }}>
              <FaInstagram color="#333333" />
            </li>
            <li className="mb-4">
              <FaTwitter color="#333333" />
            </li>
          </ul>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
