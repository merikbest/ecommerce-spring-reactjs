import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";

import {formReset} from "../../redux/admin/admin-thunks";
import {fetchUserInfo} from "../../redux/user/user-thunks";
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
import "./Account.css";

const Account: FC = (): ReactElement => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(formReset());
        dispatch(fetchUserInfo());
    }, []);

    return (
        <div className="account-container container">
            <div className="row mt-5">
                <div className="col-md-2">
                    <InfoTitle iconClass={"mr-1"} icon={faUserEdit} title={"My Account"}/>
                    <AccountLink link={"/account/user/info"} title={"Personal data"}/>
                    {(localStorage.getItem("userRole") === "ADMIN") ? (
                        <>
                            <AccountLink link={"/account/admin/add"} title={"Add perfume"}/>
                            <AccountLink link={"/account/admin/perfumes"} title={"List of perfumes"}/>
                            <AccountLink link={"/account/admin/orders"} title={"List of all orders"}/>
                            <AccountLink link={"/account/admin/users"} title={"List of all users"}/>
                        </>
                    ) : (
                        <>
                            <AccountLink link={"/account/user/edit"} title={"Change password"}/>
                            <AccountLink link={"/account/user/orders"} title={"List of orders"}/>
                        </>
                    )}
                </div>
                <div className="col-md-10">
                    <Route exact path="/account" component={() => <AccountItem/>}/>
                    <Route path="/account/user/info" component={() => <PersonalData/>}/>
                    <Route path="/account/user/edit" component={() => <ChangePassword/>}/>
                    <Route exact path="/account/user/orders" component={() => <PersonalOrdersList/>}/>
                    <Route exact path="/account/user/orders/:id" component={() => <ManageUserOrder/>}/>
                    {(localStorage.getItem("userRole") === "ADMIN") ?
                        <>
                            <Route path="/account/admin/add" component={() => <AddPerfume/>}/>
                            <Route exact path="/account/admin/perfumes" component={() => <PerfumeList/>}/>
                            <Route exact path="/account/admin/perfumes/:id" component={() => <EditPerfume/>}/>
                            <Route exact path="/account/admin/orders" component={() => <OrdersList/>}/>
                            <Route exact path="/account/admin/users" component={() => <UsersList/>}/>
                            <Route exact path="/account/admin/users/:id" component={() => <ManageUser/>}/>
                        </> : <Redirect to={"/account"}/>}
                </div>
            </div>
        </div>
    );
};

export default Account;
