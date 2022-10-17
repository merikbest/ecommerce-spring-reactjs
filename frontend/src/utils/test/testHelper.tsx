import React from "react";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { configureStore } from "@reduxjs/toolkit";

import { store, storeReducer } from "../../store";
import { LoadingStatus } from "../../types/types";
import { mockUserAdmin } from "./__mocks__/users-mock";

// @ts-ignore
export const mockDispatch = () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    return mockDispatchFn;
};

// @ts-ignore
export const waitForComponentToRender = async (wrapper) => {
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve));
        wrapper.update();
    });
};

// @ts-ignore
export const mountWithStore = (component, mockState?, mockHistory?) => {
    const mockStore = configureStore({
        reducer: storeReducer,
        preloadedState: mockState
    });

    return mount(
        <Router history={mockHistory ? mockHistory : createMemoryHistory()}>
            <Provider store={mockStore}>{component}</Provider>
        </Router>
    );
};

export const createMockRootState = (loadingStatus = LoadingStatus.LOADING): any => {
    const mockStore = store.getState();

    return {
        admin: { ...mockStore.admin, loadingState: loadingStatus },
        auth: { ...mockStore.auth, loadingState: loadingStatus },
        cart: { ...mockStore.cart, loadingState: loadingStatus },
        order: { ...mockStore.order, loadingState: loadingStatus },
        orders: { ...mockStore.orders, loadingState: loadingStatus },
        perfume: { ...mockStore.perfume, loadingState: loadingStatus },
        perfumes: { ...mockStore.perfumes, loadingState: loadingStatus },
        user: { ...mockStore.user, user: mockUserAdmin, loadingState: loadingStatus }
    };
};
