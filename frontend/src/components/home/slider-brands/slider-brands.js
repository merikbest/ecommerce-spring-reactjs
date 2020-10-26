import React, {Component} from 'react';
import Carousel from "react-bootstrap/Carousel";
import './slider-brands.css';
import {brandsItem1, brandsItem2, brandsItem3} from "./slider-brands-items";

class SliderBrands extends Component {

    render() {

        const settings = {
            controls: false,
            indicators: true
        }

        //TODO rewrite this crap
        return (
            <div className="container text-center my-3 mt-5">
                <h3>Бренды</h3>
                <Carousel {...settings}>
                    <Carousel.Item className="row">
                        {brandsItem1.map((brand) => {
                            return (
                                <div className="col-2 float-left">
                                    <a href={`/menu/${brand.name}`}>
                                        <img className="img-fluid" src={brand.url} alt={brand.name}/>
                                    </a>
                                </div>
                            )
                        })}
                    </Carousel.Item>
                    <Carousel.Item className="row">
                        {brandsItem2.map((brand) => {
                            return (
                                <div className="col-2 float-left">
                                    <a href={`/menu/${brand.name}`}>
                                        <img className="img-fluid" src={brand.url} alt={brand.name}/>
                                    </a>
                                </div>
                            )
                        })}
                    </Carousel.Item>
                    <Carousel.Item className="row">
                        {brandsItem3.map((brand) => {
                            return (
                                <div className="col-2 float-left">
                                    <a href={`/menu/${brand.name}`}>
                                        <img className="img-fluid" src={brand.url} alt={brand.name}/>
                                    </a>
                                </div>
                            )
                        })}
                    </Carousel.Item>

                </Carousel>
            </div>
        );
    }
}

export default SliderBrands;