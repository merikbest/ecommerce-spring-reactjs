import React from "react";

import { mountWithStore } from "../../../utils/test/testHelper";
import InputSearch from "../InputSearch";

describe("InputSearch", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<InputSearch onSearch={jest.fn()} />);
        expect(wrapper.text().includes("Search")).toBe(true);
    });
});
