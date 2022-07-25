import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import SliderBrands from "../SliderBrands";
import SliderBrandsItem from "../SliderBrandsItem/SliderBrandsItem";

describe("SliderBrands", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<SliderBrands />);
        expect(wrapper.text().includes("BRANDS")).toBe(true);
        expect(wrapper.find(SliderBrandsItem).length).toEqual(7);
    });
});
