import React from "react";
import {Button} from "antd";

import { mountWithStore } from "../../../../utils/test/testHelper";
import RemoveButton from "../RemoveButton";

describe("RemoveButton", () => {
    it("should render correctly and click deleteFromCart", () => {
        const mockDeleteFromCart = jest.fn();
        const wrapper = mountWithStore(<RemoveButton perfumeId={1} deleteFromCart={mockDeleteFromCart} />);
        expect(wrapper.find(Button).text().includes("Remove")).toBe(true);
        wrapper.find(Button).simulate("click");
        expect(mockDeleteFromCart).toHaveBeenCalled();
        expect(mockDeleteFromCart).toHaveBeenCalledWith(1);
    });
});
