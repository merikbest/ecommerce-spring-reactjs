import React, {Component} from 'react';
import SliderImage from "./slider-image/slider-image";
import SliderBrands from "./slider-brands/slider-brands";
import Cards from "./cards/cards";
import SliderCards from "./slider-cards/slider-cards";

class Home extends Component {
    render() {
        return (
            <div>
                <SliderImage/>
                <SliderBrands/>
                <Cards/>
                <SliderCards/>
            </div>
        );
    }
}

export default Home;