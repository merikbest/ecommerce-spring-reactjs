import React, { FC, ReactElement } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

import { PRODUCT } from "../../constants/routeConstants";

const sliderItems = [
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
        <Carousel indicators={false} fade={true} interval={3000}>
            {sliderItems.map((item) => (
                <Carousel.Item key={item.id}>
                    <Link to={`${PRODUCT}/${item.id}`}>
                        <img className="d-block w-100" src={item.url} alt={item.name}/>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselImageSlider;
