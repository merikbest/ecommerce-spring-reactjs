import React from "react";

import { mountWithStore } from "../../../../../utils/testHelper";
import { mockReviews } from "../../../../../utils/test-data/perfume-test-data";
import ReviewItem from "../ReviewItem";

describe("ReviewItem", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ReviewItem review={mockReviews[0]} />);
        expect(wrapper.text().includes(mockReviews[0].author)).toBe(true);
        expect(wrapper.text().includes(mockReviews[0].date)).toBe(true);
        expect(wrapper.text().includes(mockReviews[0].message)).toBe(true);
    });
});
