import React from "react";
import { Button } from "antd";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import Spinner from "../../../components/Spinner/Spinner";
import { mockFullPerfumeResponse, mockReviews } from "../../../utils/test/__mocks__/perfumes-mock";
import ProductInfo from "../ProductInfo/ProductInfo";
import ProductReviews from "../ProductReviews/ProductReviews";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Product from "../Product";

window.scrollTo = jest.fn();

describe("Product", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    const mockStore = {
        ...mockRootStore,
        perfume: { ...mockRootStore.perfume, perfume: mockFullPerfumeResponse, reviews: mockReviews }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<Product />);
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
        expect(mockDispatchFn).nthCalledWith(2, { type: "user/resetInputForm" });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Product />, mockStore);
        expect(mockDispatchFn).nthCalledWith(3, expect.any(Function));
        expect(wrapper.find(ProductInfo).prop("perfume")).toBe(mockFullPerfumeResponse);
        expect(wrapper.find(ProductReviews).prop("reviews")).toBe(mockReviews);
    });

    it("should render error message", () => {
        const mockStore = {
            ...mockRootStore,
            perfume: { ...mockRootStore.perfume, loadingState: LoadingStatus.ERROR, errorMessage: "Perfume not found." }
        };
        const wrapper = mountWithStore(<Product />, mockStore);
        expect(wrapper.find(ErrorMessage).prop("errorMessage")).toBe("Perfume not found.");
    });

    it("should click add review", () => {
        const mockStore = {
            ...mockRootStore,
            perfume: { ...mockRootStore.perfume, isReviewAdded: true }
        };
        const wrapper = mountWithStore(<Product />, mockStore);
        wrapper.find(ProductReviews).find(Button).simulate("submit");
    });

    it("should unmount Product", () => {
        const wrapper = mountWithStore(<Product />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(3, { type: "perfume/resetPerfumeState" });
    });
});
