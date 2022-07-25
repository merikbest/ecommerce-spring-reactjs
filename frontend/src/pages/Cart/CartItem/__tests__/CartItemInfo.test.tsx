import React from "react";

import { mockCartPerfumesResponse } from "../../../../utils/test/__mocks__/perfumes-mock";
import { mountWithStore } from "../../../../utils/test/testHelper";
import CartItemInfo from "../CartItemInfo";

describe("CartItemInfo", () => {
    it("should render correctly", () => {
        const mockPerfume = mockCartPerfumesResponse[0];
        const wrapper = mountWithStore(<CartItemInfo perfume={mockPerfume} />);
        expect(wrapper.find("img").prop("src")).toBe(mockPerfume.filename);
        expect(wrapper.text().includes(mockPerfume.perfumer)).toBe(true);
        expect(wrapper.text().includes(mockPerfume.perfumeTitle)).toBe(true);
        expect(wrapper.text().includes(`${mockPerfume.volume} ml.`)).toBe(true);
    });
});
