import React from "react";
import { InputNumber } from "antd";

import { mountWithStore } from "../../../../utils/test/testHelper";
import { mockCartPerfumesResponse } from "../../../../utils/test/__mocks__/perfumes-mock";
import CartItem from "../CartItem";

describe("CartItem", () => {
    const mockPerfume = mockCartPerfumesResponse[0];
    const mockPerfumeCount = 11;

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <CartItem
                perfume={mockPerfume}
                perfumeInCart={mockPerfumeCount}
                onChangePerfumeItemCount={jest.fn()}
                deleteFromCart={jest.fn()}
            />
        );
        expect(wrapper.find(InputNumber).at(0).prop("value")).toBe(mockPerfumeCount);
        expect(wrapper.text().includes(`$${mockPerfume.price * mockPerfumeCount}`)).toBe(true);
    });

    it("should handle Perfumes Count", () => {
        const mockOnChangePerfumeItemCount = jest.fn()
        const wrapper = mountWithStore(
            <CartItem
                perfume={mockPerfume}
                perfumeInCart={mockPerfumeCount}
                onChangePerfumeItemCount={mockOnChangePerfumeItemCount}
                deleteFromCart={jest.fn()}
            />
        );
        expect(wrapper.find(InputNumber).at(0).prop("value")).toBe(11);
        wrapper.find(InputNumber).find("input").at(0).simulate("change", { target: { value: 12 } });
        expect(wrapper.find(InputNumber).at(0).prop("value")).toBe(12);
        expect(mockOnChangePerfumeItemCount).toHaveBeenCalled();
        expect(mockOnChangePerfumeItemCount).toHaveBeenCalledWith(17, 12);
    });
});
