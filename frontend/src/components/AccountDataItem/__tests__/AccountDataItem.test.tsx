import React from "react";

import { mountWithStore } from "../../../utils/test/testHelper";
import AccountDataItem from "../AccountDataItem";

describe("AccountDataItem", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<AccountDataItem title={"First name"} text={"test"} />);
        expect(wrapper.text().includes("First name")).toBe(true);
        expect(wrapper.text().includes("test")).toBe(true);
    });
});
