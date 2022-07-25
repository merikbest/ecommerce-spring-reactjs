import React from "react";

import { createMockRootState, mountWithStore } from "../../../../utils/test/testHelper";
import { LoadingStatus } from "../../../../types/types";
import Spinner from "../../../../components/Spinner/Spinner";
import { mockUserAdmin } from "../../../../utils/test/__mocks__/users-mock";
import AccountItem from "../AccountItem";

describe("AccountItem", () => {
    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<AccountItem />);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AccountItem />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(`Hello ${mockUserAdmin.firstName} ${mockUserAdmin.lastName}!`)).toBe(true);
    });
});
