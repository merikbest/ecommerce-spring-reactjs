import React from "react";
import { Button } from "antd";

import { mountWithStore } from "../../../../utils/test/testHelper";
import SocialButton from "../SocialButton";

describe("SocialButton", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<SocialButton socialNetwork={"google"} image={"test_image"} />);
        expect(wrapper.find(Button).text().includes("Log in with Google")).toBe(true);
        expect(wrapper.find("img").at(0).prop("src")).toBe("test_image");
    });
});
