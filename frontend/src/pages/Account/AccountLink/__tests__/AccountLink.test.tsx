import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import { ACCOUNT_USER_INFO } from "../../../../constants/routeConstants";
import AccountLink from "../AccountLink";

describe("AccountLink", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<AccountLink link={ACCOUNT_USER_INFO} title={"Personal data"} />);
        expect(wrapper.text().includes("Personal data")).toBe(true);
    });
});
