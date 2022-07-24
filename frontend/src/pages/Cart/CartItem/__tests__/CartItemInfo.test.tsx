import React from "react";

import { mockCartPerfumes } from "../../../../utils/test-data/perfume-test-data";
import { mountWithStore } from "../../../../utils/testHelper";
import CartItemInfo from "../CartItemInfo";

describe("CartItemInfo", () => {
    it("should render correctly", () => {
        const mockPerfume = mockCartPerfumes[0];
        const wrapper = mountWithStore(<CartItemInfo perfume={mockPerfume} />);
        expect(wrapper.find("img").prop("src")).toBe(mockPerfume.filename);
        expect(wrapper.text().includes(mockPerfume.perfumer)).toBe(true);
        expect(wrapper.text().includes(mockPerfume.perfumeTitle)).toBe(true);
        expect(wrapper.text().includes(`${mockPerfume.volume} ml.`)).toBe(true);
    });
});
