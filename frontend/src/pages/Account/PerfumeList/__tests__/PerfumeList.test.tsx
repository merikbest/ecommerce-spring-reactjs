import React from "react";
import { Button, Input, Pagination } from "antd";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../utils/test/testHelper";
import Spinner from "../../../../components/Spinner/Spinner";
import { LoadingStatus } from "../../../../types/types";
import { mockPerfumesResponse } from "../../../../utils/test/__mocks__/perfumes-mock";
import PerfumeCard from "../../../../components/PerfumeCard/PerfumeCard";
import InputSearch from "../../../../components/InputSearch/InputSearch";
import DeleteModal from "../DeleteModal/DeleteModal";
import PerfumeList from "../PerfumeList";

describe("PerfumeList", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<PerfumeList />);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly", () => {
        const mockStore = { ...mockRootStore, perfumes: { ...mockRootStore.perfumes, perfumes: mockPerfumesResponse } };
        const wrapper = mountWithStore(<PerfumeList />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
        expect(wrapper.find(PerfumeCard).length).toEqual(3);
    });

    it("should change pagination", () => {
        const mockState = { ...mockRootStore, perfumes: { ...mockRootStore.perfumes, totalElements: 100 } };
        const wrapper = mountWithStore(<PerfumeList />, mockState);
        wrapper.find(Pagination).at(0).find("li").at(2).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should change pagination with search value", () => {
        const mockState = { ...mockRootStore, perfumes: { ...mockRootStore.perfumes, totalElements: 100 } };
        const wrapper = mountWithStore(<PerfumeList />, mockState);
        wrapper.find(InputSearch).find(Input).find("input").at(0).simulate("change", { target: { value: "test" } });
        wrapper.find(Pagination).at(0).find("li").at(2).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should click open and close delete modal", () => {
        const mockStore = { ...mockRootStore, perfumes: { ...mockRootStore.perfumes, perfumes: mockPerfumesResponse } };
        const wrapper = mountWithStore(<PerfumeList />, mockStore);
        expect(wrapper.find(DeleteModal).prop("visible")).toBe(false);
        wrapper.find(PerfumeCard).find(Button).at(1).simulate("click");
        expect(wrapper.find(DeleteModal).prop("visible")).toBe(true);
        wrapper.find(DeleteModal).find(Button).at(0).simulate("click");
        expect(wrapper.find(DeleteModal).prop("visible")).toBe(false);
    });

    it("should click delete perfume", () => {
        const mockStore = { ...mockRootStore, perfumes: { ...mockRootStore.perfumes, perfumes: mockPerfumesResponse } };
        const wrapper = mountWithStore(<PerfumeList />, mockStore);
        wrapper.find(PerfumeCard).find(Button).at(1).simulate("click");
        wrapper.find(DeleteModal).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should render delete notification", () => {
        window.scrollTo = jest.fn();
        const pushSpy = jest.spyOn(window, "scrollTo");
        const mockStore = { ...mockRootStore, admin: { ...mockRootStore.admin, isPerfumeDeleted: true } };
        mountWithStore(<PerfumeList />, mockStore);
        expect(pushSpy).toHaveBeenCalled();
    });

    it("should unmount PerfumeList", () => {
        const wrapper = mountWithStore(<PerfumeList />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "perfumes/resetPerfumesState" });
        expect(mockDispatchFn).nthCalledWith(3, { payload: LoadingStatus.LOADING, type: "admin/resetAdminState" });
    });
});
