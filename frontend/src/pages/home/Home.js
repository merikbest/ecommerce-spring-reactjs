import React from 'react';
import Theme from "../../component/theme/Theme";
import SliderImage from "../../component/slider-image/SliderImage";
import SliderBrands from "../../component/slider-brands/SliderBrands";
import SliderCards from "../../component/slider-cards/SliderCards";

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
