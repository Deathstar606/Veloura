import React from "react";
import { Product } from "./Card";
import { Container, Row, Col } from "reactstrap";
import { StaggeredText } from "./Animations";
import "./card.css";
import { Loading } from "./LoadingComponent";

function NewArr(props) {
    if (props.clothes.isLoading) {
        console.log("Loading...🤣");
        return <Loading />;
    }

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const newItems = props.clothes.clothes.flatMap((category) =>
        category.items
            .filter((item) => {
                return item.createdAt && new Date(item.createdAt) >= oneMonthAgo;
            })
            .map((cloth) => ({
                category: category.category,
                cloth,
            }))
    ).slice(0, 6);
    

    return (
        <Container className="best-seller">
            <div className="d-flex justify-content-center pt-1 pb-3">
                <h2 className="headerdec newarrh" id="casestu">
                    <StaggeredText text={"New Arrivals"} />
                </h2>
            </div>
            <Row className="pb-5 d-flex justify-content-center">
                {newItems.length > 0 ? (
                    newItems.map((item, index) => (
                        <Col key={index} md={3} xs={6} className="mt-4">
                            <Product category={item.category} child={item.cloth} />
                        </Col>
                    ))
                ) : (
                    <h4 className="text-center w-100 py-4">No new arrivals</h4>
                )}
            </Row>
        </Container>
    );
}

export default NewArr;
