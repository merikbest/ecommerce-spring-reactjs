import React from "react";

import { mountWithStore } from "../../../../../utils/test/testHelper";
import Description from "../Description";

describe("Description", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<Description title={"Test Description"} />);
        expect(wrapper.text().includes("Test Description")).toBe(true);
    });
});
