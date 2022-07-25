import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import { resetAuthState } from "../../redux-toolkit/auth/auth-slice";
import { fetchUserInfo } from "../../redux-toolkit/user/user-thunks";
import { UserRoles } from "../../types/types";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import {
    ACCOUNT,
    ACCOUNT_ADMIN_ADD,
    ACCOUNT_ADMIN_ORDERS,
    ACCOUNT_ADMIN_PERFUMES,
    ACCOUNT_ADMIN_USERS,
    ACCOUNT_USER_EDIT,
    ACCOUNT_USER_INFO,
    ACCOUNT_USER_ORDERS
} from "../../constants/routeConstants";
import AccountLink from "./AccountLink/AccountLink";
import AccountItem from "./AccountItem/AccountItem";
import PersonalData from "./PersonalData/PersonalData";
import AddPerfume from "./AddPerfume/AddPerfume";
import PerfumeList from "./PerfumeList/PerfumeList";
import EditPerfume from "./EditPerfume/EditPerfume";
import OrdersList from "./OrdersList/OrdersList";
import ManageUserOrder from "./ManageUserOrder/ManageUserOrder";
import UsersList from "./UsersList/UsersList";
import ManageUser from "./ManageUser/ManageUser";
import ChangePassword from "./ChangePassword/ChangePassword";
import PersonalOrdersList from "./PersonalOrdersList/PersonalOrdersList";

const Account: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectUserFromUserState);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        dispatch(resetAuthState());
        dispatch(fetchUserInfo());
    }, []);

    useEffect(() => {
        if (usersData) {
            setIsAdmin(usersData.roles![0] === UserRoles.ADMIN);
        }
    }, [usersData]);

    return (
        <ContentWrapper>
            <Row gutter={32}>
                <Col span={5}>
                    <ContentTitle title={"My Account"} titleLevel={4} icon={<UserOutlined />} />
                    <AccountLink link={ACCOUNT_USER_INFO} title={"Personal data"} />
                    {isAdmin ? (
                        <>
                            <AccountLink link={ACCOUNT_ADMIN_ADD} title={"Add perfume"} />
                            <AccountLink link={ACCOUNT_ADMIN_PERFUMES} title={"List of perfumes"} />
                            <AccountLink link={ACCOUNT_ADMIN_ORDERS} title={"List of all orders"} />
                            <AccountLink link={ACCOUNT_ADMIN_USERS} title={"List of all users"} />
                        </>
                    ) : (
                        <>
                            <AccountLink link={ACCOUNT_USER_EDIT} title={"Change password"} />
                            <AccountLink link={ACCOUNT_USER_ORDERS} title={"List of orders"} />
                        </>
                    )}
                </Col>
                <Col span={19}>
                    <Route exact path={ACCOUNT} component={AccountItem} />
                    <Route path={ACCOUNT_USER_INFO} component={PersonalData} />
                    <Route path={ACCOUNT_USER_EDIT} component={ChangePassword} />
                    <Route exact path={ACCOUNT_USER_ORDERS} component={PersonalOrdersList} />
                    <Route exact path={`${ACCOUNT_USER_ORDERS}/:id`} component={ManageUserOrder} />
                    {isAdmin ? (
                        <>
                            <Route path={ACCOUNT_ADMIN_ADD} component={AddPerfume} />
                            <Route exact path={ACCOUNT_ADMIN_PERFUMES} component={PerfumeList} />
                            <Route exact path={`${ACCOUNT_ADMIN_PERFUMES}/:id`} component={EditPerfume} />
                            <Route exact path={ACCOUNT_ADMIN_ORDERS} component={OrdersList} />
                            <Route exact path={ACCOUNT_ADMIN_USERS} component={UsersList} />
                            <Route exact path={`${ACCOUNT_ADMIN_USERS}/:id`} component={ManageUser} />
                        </>
                    ) : (
                        <Redirect to={ACCOUNT} />
                    )}
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Account;
