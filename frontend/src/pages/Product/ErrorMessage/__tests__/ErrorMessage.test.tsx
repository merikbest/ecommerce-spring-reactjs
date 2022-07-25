import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ErrorMessage errorMessage={"Perfume not found."} />);
        expect(wrapper.text().includes("Perfume not found.")).toBe(true);
    });
});
