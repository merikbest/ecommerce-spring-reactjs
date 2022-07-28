import React from "react";
import { Button } from "antd";

import { mountWithStore } from "../../../utils/test/testHelper";
import { mockPerfumesResponse } from "../../../utils/test/__mocks__/perfumes-mock";
import PerfumeCard from "../PerfumeCard";

describe("PerfumeCard", () => {
    const mockPerfume = mockPerfumesResponse[0];

    it("should render edit and delete buttons", () => {
        const wrapper = mountWithStore(
            <PerfumeCard perfume={mockPerfume} colSpan={8} edit={true} onOpenDelete={jest.fn()} />
        );
        expect(wrapper.find(Button).at(0).text().includes("Edit")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Delete")).toBe(true);
        expect(wrapper.text().includes(`${mockPerfume.reviewsCount} reviews`)).toBe(true);
        expect(wrapper.text().includes(`$${mockPerfume.price}.00`)).toBe(true);
    });

    it("should render add to cart button", () => {
        const wrapper = mountWithStore(
            <PerfumeCard perfume={mockPerfume} colSpan={8} edit={false} onOpenDelete={jest.fn()} />
        );
        expect(wrapper.find(Button).at(0).text().includes("Add to cart")).toBe(true);
        expect(wrapper.text().includes(`${mockPerfume.reviewsCount} reviews`)).toBe(true);
        expect(wrapper.text().includes(`$${mockPerfume.price}.00`)).toBe(true);
    });

    it("should click onClickAddToCart", () => {
        const mockOnOpenDelete = jest.fn()
        const wrapper = mountWithStore(
            <PerfumeCard perfume={mockPerfume} colSpan={8} edit={false} onOpenDelete={mockOnOpenDelete} />
        );
        wrapper.find(Button).at(0).simulate("click");
    });

    it("should click onOpenDelete", () => {
        const mockOnOpenDelete = jest.fn()
        const wrapper = mountWithStore(
            <PerfumeCard perfume={mockPerfume} colSpan={8} edit={true} onOpenDelete={mockOnOpenDelete} />
        );
        wrapper.find(Button).at(1).simulate("click");
        expect(mockOnOpenDelete).toHaveBeenCalled();
    });
});
