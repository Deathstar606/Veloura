import {useRef} from "react";
import { Container, Row, Col, CardImg } from "react-bootstrap";
import { useInView } from "framer-motion";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";
import "./card.css"

function Product({ child }) {
    return (
      <Col md={3}>
        <Section>
          <div className="curd card-container">
            <Link to={`/${child._id}`}>
              <div className="pro-img-container">
                <CardImg
                  className="pro-img"
                  src={child.images[child.colors[0]][0]}
                />
                <div className="pro-img-overlay">
                  <div className="pro-img-text">
                    <h4>Product Name</h4>
                    <p>Description</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </Section>
      </Col>
    );
  }

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <div
            style={{
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
              }}>
        {children}
      </div>
    </section>
  );
}

const RenderItem = (props) => {

    if (props.feats.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    
    else if (props.feats.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.feats.errMess}</h4>
                </div>
            </div>
        )
    }

    else if (props.feats.feats) {
        
        const feats = props.feats.feats[0].clothid.map((feat) => {

            let cloth = props.clothes.clothes.filter((cloth) => cloth._id === feat)[0];
            
            return (
                <Product child={cloth}/>
            );
        });

    return(
            <>
            <Container className="lg-container mt-4">
                <div>
                    <h3 className="text-white bg-custom">Hot now 🔥</h3>
                </div>
                <Row className="mt-4 d-flex justify-content-center">
                    {feats}             
                </Row>
            </Container>
            </>                   
    );
}}

export default RenderItem;