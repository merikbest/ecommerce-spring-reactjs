import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

import { fetchUserInfo } from "../../redux/user/user-thunks";
import PersonalOrdersList from "./PersonalOrdersList/PersonalOrdersList";
import ChangePassword from "./ChangePassword/ChangePassword";
import PersonalData from "./PersonalData/PersonalData";
import AccountItem from "./AccountItem/AccountItem";
import AddPerfume from "./AddPerfume/AddPerfume";
import OrdersList from "./OrdersList/OrdersList";
import UsersList from "./UsersList/UsersList";
import PerfumeList from "./PerfumeList/PerfumeList";
import ManageUser from "./ManageUser/ManageUser";
import EditPerfume from "./EditPerfume/EditPerfume";
import ManageUserOrder from "./ManageUserOrder/ManageUserOrder";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import AccountLink from "./AccountLink";
import { selectUserFromUserState } from "../../redux/user/user-selector";
import { UserRoles } from "../../types/types";
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
import "./Account.css";
import { resetAuthState } from "../../redux/auth/auth-actions";

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
        <div className="account-container container">
            <div className="row mt-5">
                <div className="col-md-2">
                    <InfoTitle iconClass={"mr-1"} icon={faUserEdit} title={"My Account"} />
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
                </div>
                <div className="col-md-10">
                    <Route exact path={ACCOUNT} component={() => <AccountItem />} />
                    <Route path={ACCOUNT_USER_INFO} component={() => <PersonalData />} />
                    <Route path={ACCOUNT_USER_EDIT} component={() => <ChangePassword />} />
                    <Route exact path={ACCOUNT_USER_ORDERS} component={() => <PersonalOrdersList />} />
                    <Route exact path={`${ACCOUNT_USER_ORDERS}/:id`} component={() => <ManageUserOrder />} />
                    {isAdmin ? (
                        <>
                            <Route path={ACCOUNT_ADMIN_ADD} component={() => <AddPerfume />} />
                            <Route exact path={ACCOUNT_ADMIN_PERFUMES} component={() => <PerfumeList />} />
                            <Route exact path={`${ACCOUNT_ADMIN_PERFUMES}/:id`} component={() => <EditPerfume />} />
                            <Route exact path={ACCOUNT_ADMIN_ORDERS} component={() => <OrdersList />} />
                            <Route exact path={ACCOUNT_ADMIN_USERS} component={() => <UsersList />} />
                            <Route exact path={`${ACCOUNT_ADMIN_USERS}/:id`} component={() => <ManageUser />} />
                        </>
                    ) : (
                        <Redirect to={ACCOUNT} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
