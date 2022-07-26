import React from "react";
import { Form } from "antd";

import { mountWithStore } from "../../../../utils/test/testHelper";
import EditPerfumeSelect from "../EditPerfumeSelect";

describe("EditPerfumeSelect", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <EditPerfumeSelect
                title={"Perfume type"}
                name={"type"}
                error={"Fill in the input field"}
                placeholder={"Perfume type"}
                disabled={false}
                values={["Eau de Parfum", "Eau de Toilette"]}
            />
        );
        expect(wrapper.text().includes("Perfume type")).toBe(true);
        expect(wrapper.find(Form.Item).prop("name")).toBe("type");
        expect(wrapper.find(Form.Item).prop("help")).toBe("Fill in the input field");
    });
});
