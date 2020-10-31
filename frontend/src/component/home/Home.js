import React from 'react';
import Theme from "./theme/Theme";
import SliderImage from "./sliders/slider-image/SliderImage";
import SliderBrands from "./sliders/slider-brands/SliderBrands";
import SliderCards from "./sliders/slider-cards/SliderCards";

function Home(props) {
    return (
        <div>
            <SliderImage/>
            <SliderBrands/>
            <Theme/>
            <SliderCards/>
        </div>
    );
}

export default Home;
