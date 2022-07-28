import { mountWithStore } from "../../../utils/test/testHelper";
import React from "react";
import ContentTitle from "../ContentTitle";
import { UserOutlined } from "@ant-design/icons";

describe("ContentTitle", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ContentTitle icon={<UserOutlined />} title={"My Account"} titleLevel={1} />);
        expect(wrapper.text().includes("My Account")).toBe(true);
        expect(wrapper.find(UserOutlined).exists()).toBeTruthy();
    });
});
