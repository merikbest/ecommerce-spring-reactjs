import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import { perfumeData } from "../../../../utils/test/__mocks__/perfumes-mock";
import OrderItem from "../OrderItem";

describe("OrderItem", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<OrderItem perfume={perfumeData} quantity={11} />);
        expect(wrapper.text().includes(perfumeData.perfumer)).toBe(true);
        expect(wrapper.text().includes(perfumeData.perfumeTitle)).toBe(true);
        expect(wrapper.text().includes(`Price: $ ${perfumeData.price}`)).toBe(true);
        expect(wrapper.text().includes("Quantity: 11")).toBe(true);
    });
});
