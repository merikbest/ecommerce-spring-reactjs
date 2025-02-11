import { mountWithStore } from "../../../utils/test/testHelper";
import React from "react";
import ContentTitle from "../ContentTitle";
import { UserOutlined } from "@ant-design/icons";

describe("ContentTitle", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ContentTitle icon={<UserOutlined />} title={"Акаунт"} titleLevel={1} />);
        expect(wrapper.text().includes("Акаунт")).toBe(true);
        expect(wrapper.find(UserOutlined).exists()).toBeTruthy();
    });
});
