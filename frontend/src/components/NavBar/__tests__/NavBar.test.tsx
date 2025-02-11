import React from "react";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import { mockUserAdmin } from "../../../utils/test/__mocks__/users-mock";
import NavBar from "../NavBar";

describe("NavBar", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<NavBar />);
        expect(wrapper.text().includes("Начало")).toBe(true);
        expect(wrapper.text().includes("Кристали, Минерали и Сувенири")).toBe(true);
        expect(wrapper.text().includes("Контакти")).toBe(true);
        expect(wrapper.text().includes("Вход")).toBe(true);
        expect(wrapper.text().includes("Регистрация")).toBe(true);
    });

    it("should render logged user", () => {
        const mockStore = { ...mockRootStore, user: { ...mockRootStore.user, user: mockUserAdmin } };
        const wrapper = mountWithStore(<NavBar />, mockStore);
        expect(wrapper.text().includes("Акаунт")).toBe(true);
        expect(wrapper.text().includes("EXIT")).toBe(true);
    });

    it("should click handleLogout", () => {
        const mockStore = { ...mockRootStore, user: { ...mockRootStore.user, user: mockUserAdmin } };
        const wrapper = mountWithStore(<NavBar />, mockStore);
        wrapper.find("#handleLogout").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: "user/logoutSuccess" });
    });
});
