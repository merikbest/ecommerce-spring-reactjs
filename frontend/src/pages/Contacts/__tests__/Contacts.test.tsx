import React from "react";

import { mountWithStore } from "../../../utils/test/testHelper";
import Contacts from "../Contacts";

window.scrollTo = jest.fn();

describe("Contacts", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<Contacts />);
        expect(wrapper.text().includes("Working time")).toBe(true);
        expect(wrapper.text().includes("The online store is open from 08:00 to 20:00 without breaks and weekends.")).toBe(true);
        expect(wrapper.text().includes("Online orders are accepted around the clock.")).toBe(true);
        expect(wrapper.text().includes("Delivery")).toBe(true);
        expect(wrapper.text().includes("Delivery of orders come through courier service.")).toBe(true);
    });
});
