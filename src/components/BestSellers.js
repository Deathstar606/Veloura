import React from "react";
import { Product } from "./Card";
import { Container, Row, Col } from "reactstrap";
import { StaggeredText } from "./Animations";
import "swiper/css";
import "swiper/css/navigation";
import "./card.css";
import { Loading } from "./LoadingComponent";

function BestSell(props) {
    if (props.clothes.isLoading) {
        console.log("Loading...🤣");
        return (
            <Loading/>
        )
    }
    
    const products = props.clothes.clothes.flatMap((category) =>
        category.items
            .filter((item) => item.new)
            .map((cloth, index) => (
                <Col md={3} xs={6} className="mt-2">
                    <Product key={index} category={category.category} child={cloth} />
                </Col>
            ))
    );

    return (
        <Container className="best-seller">
            <div className="d-flex justify-content-center pt-1 pb-3">
                <h2 className="headerdec newarrh" id="casestu">
                    <StaggeredText text={"Best Sellers"} />
                </h2>
            </div>
                <Row className="pb-5 d-flex justify-content-center">
                    {products}
                </Row>
        </Container>
    );
}

export default BestSell;
