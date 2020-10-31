import React from 'react';
import Carousel from "react-bootstrap/Carousel";

const photos = [
    {name: "Photo 1", url: "https://i.ibb.co/yQQkwn6/1million-2.jpg"},
    {name: "Photo 2", url: "https://i.ibb.co/QQDCppK/dior4.jpg"},
]

function SliderImage(props) {

    const settings = {
        indicators: false,
        fade: true,
        infinite: true,
        interval: 3000
    }

    return (
        <div>
            <Carousel {...settings}>
                {photos.map((photo, index) => {
                    return (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={photo.url}
                                alt={photo.name}
                            />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    );
}

export default SliderImage;