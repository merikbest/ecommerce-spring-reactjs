import React, { FC, ReactElement } from "react";

import HomePageTheme from "../../component/HomePageTheme/HomePageTheme";
import CarouselImageSlider from "../../component/CarouselImageSlider/CarouselImageSlider";
import SliderBrands from "../../component/SliderBrands/SliderBrands";
import SliderCards from "../../component/PerfumeCardsSlider/PerfumeCardsSlider";
import ScrollButton from "../../component/ScrollButton/ScrollButton";

const HomePage: FC = (): ReactElement => {
    return (
        <>
            <ScrollButton />
            <CarouselImageSlider />
            <SliderBrands />
            <HomePageTheme />
            <SliderCards />
        </>
    );
};

export default HomePage;
