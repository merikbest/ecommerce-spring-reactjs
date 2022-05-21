import React, { FC, ReactElement } from "react";
import Carousel from "react-bootstrap/Carousel";

import { brandsItem1, brandsItem2, brandsItem3 } from "./SliderBrandsData";
import SliderBrandItem from "./SliderBrandItem/SliderBrandItem";
import "./SliderBrands.css";

const SliderBrands: FC = (): ReactElement => {
    return (
        <div className="container text-center my-3 mt-5">
            <h3>BRANDS</h3>
            <Carousel controls={false} indicators={true}>
                <Carousel.Item className="row">
                    <SliderBrandItem brands={brandsItem1} />
                </Carousel.Item>
                <Carousel.Item className="row">
                    <SliderBrandItem brands={brandsItem2} />
                </Carousel.Item>
                <Carousel.Item className="row">
                    <SliderBrandItem brands={brandsItem3} />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default SliderBrands;
