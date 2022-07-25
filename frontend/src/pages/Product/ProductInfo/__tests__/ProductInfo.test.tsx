import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import { perfumeData } from "../../../../utils/test/__mocks__/perfumes-mock";
import Description from "../Description/Description";
import ProductInfo from "../ProductInfo";

describe("ProductInfo", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ProductInfo perfume={perfumeData} reviewsLength={11} addToCart={jest.fn()} />);
        expect(wrapper.text().includes(perfumeData.perfumeTitle)).toBe(true);
        expect(wrapper.text().includes(perfumeData.perfumer)).toBe(true);
        expect(wrapper.text().includes(perfumeData.type)).toBe(true);
        expect(wrapper.text().includes("11 reviews")).toBe(true);
        expect(wrapper.text().includes("In Stock")).toBe(true);
        expect(wrapper.text().includes(`$${perfumeData.price}.00`)).toBe(true);
        expect(wrapper.text().includes("Add to cart")).toBe(true);
        expect(wrapper.find(Description).at(7).text().includes(perfumeData.perfumeGender)).toBe(true);
        expect(wrapper.find(Description).at(8).text().includes(perfumeData.volume)).toBe(true);
        expect(wrapper.find(Description).at(9).text().includes(perfumeData.year.toString())).toBe(true);
        expect(wrapper.find(Description).at(10).text().includes(perfumeData.country)).toBe(true);
        expect(wrapper.find(Description).at(11).text().includes(perfumeData.fragranceTopNotes)).toBe(true);
        expect(wrapper.find(Description).at(12).text().includes(perfumeData.fragranceMiddleNotes)).toBe(true);
        expect(wrapper.find(Description).at(13).text().includes(perfumeData.fragranceBaseNotes)).toBe(true);
    });
});
