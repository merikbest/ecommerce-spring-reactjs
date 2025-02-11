import React, { FC, ReactElement } from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

import { PRODUCT } from "../../../constants/routeConstants";
import "./CarouselImageSlider.css";
import cristal7 from "../../../img/Crystals7.jpg";
import cristal8 from "../../../img/Crystals8.jpg";

export const sliderItems = [

    {
        id: "46",
        name: "Photo 2",
        url: cristal7
    },
        {
        id: "85",
        name: "Photo 1",
        url: cristal8
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
