import React from "react";
import { Route } from "react-router-dom";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import Account from "../Account";
import {
    ACCOUNT,
    ACCOUNT_ADMIN_ADD,
    ACCOUNT_ADMIN_ORDERS,
    ACCOUNT_ADMIN_PERFUMES,
    ACCOUNT_ADMIN_USERS,
    ACCOUNT_USER_EDIT,
    ACCOUNT_USER_INFO,
    ACCOUNT_USER_ORDERS
} from "../../../constants/routeConstants";
import ChangePassword from "../ChangePassword/ChangePassword";
import ManageUserOrder from "../ManageUserOrder/ManageUserOrder";
import PersonalData from "../PersonalData/PersonalData";
import AccountItem from "../AccountItem/AccountItem";
import PersonalOrdersList from "../PersonalOrdersList/PersonalOrdersList";
import AddPerfume from "../AddPerfume/AddPerfume";
import PerfumeList from "../PerfumeList/PerfumeList";
import EditPerfume from "../EditPerfume/EditPerfume";
import OrdersList from "../OrdersList/OrdersList";
import UsersList from "../UsersList/UsersList";
import ManageUser from "../ManageUser/ManageUser";

describe("Account", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render and route user account correctly", () => {
        const wrapper = mountWithStore(<Account />);
        const pathMap = wrapper.find(Route).reduce((pathMap: any, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});
        expect(mockDispatchFn).nthCalledWith(1, { type: "auth/resetAuthState" });
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
        expect(pathMap[ACCOUNT]).toBe(AccountItem);
        expect(pathMap[ACCOUNT_USER_INFO]).toBe(PersonalData);
        expect(pathMap[ACCOUNT_USER_EDIT]).toBe(ChangePassword);
        expect(pathMap[ACCOUNT_USER_ORDERS]).toBe(PersonalOrdersList);
        expect(pathMap[`${ACCOUNT_USER_ORDERS}/:id`]).toBe(ManageUserOrder);
    });

    it("should render and route admin account correctly", () => {
        const wrapper = mountWithStore(<Account />, mockRootStore);
        const pathMap = wrapper.find(Route).reduce((pathMap: any, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});
        expect(mockDispatchFn).nthCalledWith(1, { type: "auth/resetAuthState" });
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
        expect(pathMap[ACCOUNT_ADMIN_ADD]).toBe(AddPerfume);
        expect(pathMap[ACCOUNT_ADMIN_PERFUMES]).toBe(PerfumeList);
        expect(pathMap[`${ACCOUNT_ADMIN_PERFUMES}/:id`]).toBe(EditPerfume);
        expect(pathMap[ACCOUNT_ADMIN_ORDERS]).toBe(OrdersList);
        expect(pathMap[ACCOUNT_ADMIN_USERS]).toBe(UsersList);
        expect(pathMap[`${ACCOUNT_ADMIN_USERS}/:id`]).toBe(ManageUser);
    });
});
