import React from "react";

import { mountWithStore } from "../../../utils/test/testHelper";
import CarouselImageSlider from "../CarouselImageSlider/CarouselImageSlider";
import SliderBrands from "../SliderBrands/SliderBrands";
import HomePageTheme from "../HomePageTheme/HomePageTheme";
import PerfumeCardsSlider from "../PerfumeCardsSlider/PerfumeCardsSlider";
import Home from "../Home";

window.scrollTo = jest.fn();

describe("Home", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<Home />);
        expect(wrapper.find(CarouselImageSlider).exists()).toBeTruthy();
        expect(wrapper.find(SliderBrands).exists()).toBeTruthy();
        expect(wrapper.find(HomePageTheme).exists()).toBeTruthy();
        expect(wrapper.find(PerfumeCardsSlider).exists()).toBeTruthy();
    });
});
