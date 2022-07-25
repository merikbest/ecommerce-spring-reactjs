import React from "react";
import { Form } from "antd";

import { mountWithStore } from "../../../../utils/test/testHelper";
import AddFormInput from "../AddFormInput";

describe("AddFormInput", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <AddFormInput title={"Perfume title"} name={"perfumeTitle"} error={"Fill in the input field"} />
        );
        expect(wrapper.text().includes("Perfume title")).toBe(true);
        expect(wrapper.find(Form.Item).at(0).prop("name")).toBe("perfumeTitle");
    });
});
