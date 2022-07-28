import React from "react";

import { mountWithStore } from "../../../utils/test/testHelper";
import Footer from "../Footer";

describe("Footer", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<Footer />);
        expect(wrapper.text().includes("Perfume")).toBe(true);
        expect(wrapper.text().includes("Social networks")).toBe(true);
        expect(wrapper.text().includes("from 08:00 to 20:00 without breaks and weekends")).toBe(true);
    });
});
