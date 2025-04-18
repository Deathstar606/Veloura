import React from "react";
import { Container, Row } from "reactstrap";
import { StaggeredText } from "./Animations";
import { Product } from "./Card";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import MediaQuery from "react-responsive";
import { Loading } from "./LoadingComponent";
import "./card.css";

function NewArr(props) {
    if (props.clothes.isLoading) {
        return (
            <Loading/>
        )
    }

    const products = props.clothes.clothes.flatMap((category) =>
        category.items
            .filter((item) => item.new)
            .map((cloth, index) => (
                <SwiperSlide key={`${category.category}-${index}`}>
                    <Product category={category.category} child={cloth} />
                </SwiperSlide>
            ))
    );

    return (
        <Container style={{ maxWidth: "88%" }}>
            <div className="d-flex justify-content-center pt-3 pb-5">
                <h2 className="headerdec newarrh" id="casestu">
                    <StaggeredText text={"New Addition"} />
                </h2>
            </div>
                <Row className="mt-1">
                    <MediaQuery minWidth={640}>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={20}
                            navigation={true}
                        >
                            {products}
                        </Swiper>
                    </MediaQuery>
                    <MediaQuery maxWidth={639}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={50}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            navigation={true}
                            modules={[Autoplay]}
                        >
                            {products}
                        </Swiper>
                    </MediaQuery>
                </Row>
        </Container>
    );
}

export default NewArr;
