import React from "react";
import { Radio } from "antd";

import { mountWithStore } from "../../../../utils/test/testHelper";
import MenuSorter from "../MenuSorter";

describe("MenuSorter", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<MenuSorter onChange={jest.fn()} sortByPrice={false} />);
        expect(wrapper.text().includes("Sort by price")).toBe(true);
        expect(wrapper.find(Radio.Button).length).toEqual(3);
    });
});
