import React, { FC, ReactElement } from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

import { PRODUCT } from "../../../constants/routeConstants";
import "./CarouselImageSlider.css";

export const sliderItems = [
    {
        id: "85",
        name: "Photo 1",
        url: "https://i.ibb.co/dkpHPXQ/1million-ENG.jpg"
    },
    {
        id: "46",
        name: "Photo 2",
        url: "https://i.ibb.co/C0vbNcy/dior-ENG.jpg"
    }
];

const CarouselImageSlider: FC = (): ReactElement => {
    return (
        <Carousel>
            {sliderItems.map((item) => (
                <div key={item.id} className={"carousel-item-wrapper"}>
                    <Link to={`${PRODUCT}/${item.id}`} className={"carousel-link"} />
                    <img src={item.url} alt={item.name} />
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselImageSlider;
