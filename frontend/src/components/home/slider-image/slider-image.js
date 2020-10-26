import React, {Component} from 'react';
import Carousel from "react-bootstrap/Carousel";

class SliderImage extends Component {

    render() {

        const settings = {
            indicators: false,
            fade: true,
            infinite: true,
            interval: 3000
        }

        return (
            <>
                <Carousel {...settings}>
                    {photos.map((photo) => {
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
            </>
        );
    }
}

const photos = [
    {
        name: "Photo 1",
        url: "https://i.ibb.co/yQQkwn6/1million-2.jpg"
    },
    {
        name: "Photo 2",
        url: "https://i.ibb.co/QQDCppK/dior4.jpg"
    },
]

export default SliderImage;