import React, { FC, ReactElement } from "react";
import { Carousel, Typography } from "antd";

import { brandsItem } from "./SliderBrandsData";
import SliderBrandsItem from "./SliderBrandsItem/SliderBrandsItem";
import "./SliderBrands.css";

const SliderBrands: FC = (): ReactElement => {
    return (
        <div className={"brands-wrapper"}>
            <Typography.Title level={3} className={"brands-wrapper-title"}>
                BRANDS
            </Typography.Title>
            <Carousel className={"brands-carousel"} autoplay>
                <SliderBrandsItem brands={brandsItem.slice(0, 6)} />
                <SliderBrandsItem brands={brandsItem.slice(6, 12)} />
                <SliderBrandsItem brands={brandsItem.slice(12, 18)} />
            </Carousel>
        </div>
    );
};

export default SliderBrands;
