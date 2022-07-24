import React from "react";
import {Form} from "antd";

import { mountWithStore } from "../../../../utils/testHelper";
import { mockReviews } from "../../../../utils/test-data/perfume-test-data";
import ReviewItem from "../ReviewItem/ReviewItem";
import {reviewErrorsData} from "../../../../utils/test-data/user-test-data";
import ProductReviews from "../ProductReviews";

describe("ProductReviews", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <ProductReviews reviews={mockReviews} reviewErrors={expect.any(Object)} addReview={jest.fn()} />
        );
        expect(wrapper.text().includes("Reviews")).toBe(true);
        expect(wrapper.find(ReviewItem).length).toEqual(3);
    });

    it("should render empty ProductReviews", () => {
        const wrapper = mountWithStore(
            <ProductReviews reviews={[]} reviewErrors={expect.any(Object)} addReview={jest.fn()} />
        );
        expect(wrapper.text().includes("There are no reviews for this perfume.")).toBe(true);
    });

    it("should render review errors", () => {
        const wrapper = mountWithStore(
            <ProductReviews reviews={[]} reviewErrors={reviewErrorsData} addReview={jest.fn()} />
        );
        expect(wrapper.find(Form.Item).at(0).prop("help")).toBe(reviewErrorsData.authorError);
        expect(wrapper.find(Form.Item).at(1).prop("help")).toBe(reviewErrorsData.ratingError);
        expect(wrapper.find(Form.Item).at(2).prop("help")).toBe(reviewErrorsData.messageError);
    });
});
