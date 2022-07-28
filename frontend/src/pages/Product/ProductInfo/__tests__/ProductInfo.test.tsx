import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import { mockFullPerfumeResponse } from "../../../../utils/test/__mocks__/perfumes-mock";
import Description from "../Description/Description";
import ProductInfo from "../ProductInfo";

describe("ProductInfo", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ProductInfo perfume={mockFullPerfumeResponse} reviewsLength={11} addToCart={jest.fn()} />);
        expect(wrapper.text().includes(mockFullPerfumeResponse.perfumeTitle)).toBe(true);
        expect(wrapper.text().includes(mockFullPerfumeResponse.perfumer)).toBe(true);
        expect(wrapper.text().includes(mockFullPerfumeResponse.type)).toBe(true);
        expect(wrapper.text().includes("11 reviews")).toBe(true);
        expect(wrapper.text().includes("In Stock")).toBe(true);
        expect(wrapper.text().includes(`$${mockFullPerfumeResponse.price}.00`)).toBe(true);
        expect(wrapper.text().includes("Add to cart")).toBe(true);
        expect(wrapper.find(Description).at(7).text().includes(mockFullPerfumeResponse.perfumeGender)).toBe(true);
        expect(wrapper.find(Description).at(8).text().includes(mockFullPerfumeResponse.volume)).toBe(true);
        expect(wrapper.find(Description).at(9).text().includes(mockFullPerfumeResponse.year.toString())).toBe(true);
        expect(wrapper.find(Description).at(10).text().includes(mockFullPerfumeResponse.country)).toBe(true);
        expect(wrapper.find(Description).at(11).text().includes(mockFullPerfumeResponse.fragranceTopNotes)).toBe(true);
        expect(wrapper.find(Description).at(12).text().includes(mockFullPerfumeResponse.fragranceMiddleNotes)).toBe(true);
        expect(wrapper.find(Description).at(13).text().includes(mockFullPerfumeResponse.fragranceBaseNotes)).toBe(true);
    });
});
