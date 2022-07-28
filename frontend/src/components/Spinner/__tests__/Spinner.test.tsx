import React from "react";
import { Spin } from "antd";

import { mountWithStore } from "../../../utils/test/testHelper";
import Spinner from "../Spinner";

describe("Spinner", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<Spinner />);
        expect(wrapper.find(Spin).prop("size")).toBe("large");
        expect(wrapper.find(Spin).prop("className")).toBe("spinner");
    });
});
