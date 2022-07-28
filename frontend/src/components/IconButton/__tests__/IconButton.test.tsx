import React from "react";
import { SearchOutlined } from "@ant-design/icons";

import { mountWithStore } from "../../../utils/test/testHelper";
import IconButton from "../IconButton";

describe("IconButton", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<IconButton title={"Search"} icon={<SearchOutlined />} />);
        expect(wrapper.text().includes("Search")).toBe(true);
    });
});
