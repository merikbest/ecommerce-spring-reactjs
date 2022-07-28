import React from "react";
import { Typography } from "antd";

import { mountWithStore } from "../../../utils/test/testHelper";
import ContentWrapper from "../ContentWrapper";

describe("ContentWrapper", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ContentWrapper children={<Typography.Text strong>Test</Typography.Text>} />);
        expect(wrapper.text().includes("Test")).toBe(true);
    });
});
