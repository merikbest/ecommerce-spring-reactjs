import React from 'react';

import HomePageTheme from "../../component/HomePageTheme/HomePageTheme";
import CarouselImageSlider from "../../component/CarouselImageSlider/CarouselImageSlider";
import SliderBrands from "../../component/SliderBrands/SliderBrands";
import SliderCards from "../../component/PerfumeCardsSlider/PerfumeCardsSlider";

const Home = () => {
    return (
        <div>
            <CarouselImageSlider/>
            <SliderBrands/>
            <HomePageTheme/>
            <SliderCards/>
        </div>
    );
}

export default Home;
