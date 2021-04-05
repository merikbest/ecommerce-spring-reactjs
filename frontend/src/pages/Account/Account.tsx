import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect, Route, RouteComponentProps} from "react-router-dom";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {AppStateType} from "../../redux/reducers/root-reducer";
import {Perfume} from "../../types/types";
import {formReset} from "../../redux/thunks/admin-thunks";
import {fetchUserInfo} from "../../redux/thunks/user-thunks";
import {fetchPerfumes} from "../../redux/thunks/perfume-thunks";
import UserOrdersList from "../UserOrdersList/UserOrdersList";
import UserChangePassword from "../UserChangePassword/UserChangePassword";
import UsersPersonalData from "../UsersPersonalData/UsersPersonalData";
import AccountItem from "./AccountItem";
import AddPerfume from "../AddPerfume/AddPerfume";
import OrdersList from "../OrdersList/OrdersList";
import UserList from "../UserList/UserList";
import EditPerfumes from "../EditPerfumes/EditPerfumes";
import EditUser from "../EditUser/EditUser";
import EditPerfume from "../EditPerfume/EditPerfume";
import "./Account.css";

const Account: FC = () => {
    const dispatch = useDispatch();
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.perfume.perfumes);

    useEffect(() => {
        dispatch(formReset());
        dispatch(fetchUserInfo());
        dispatch(fetchPerfumes());
    }, []);

    return (
        <div className="account-container container">
            <div className="row mt-5">
                <div className="col-md-2">
                    <div>
                        <h4><FontAwesomeIcon className="mr-2" icon={faUser}/>My Account</h4>
                    </div>
                    <NavLink to={"/account/user/info"}
                             className="account-sidebar-link nav-link"
                             activeClassName="is-active">Personal data</NavLink>
                    {(localStorage.getItem("userRole") === "ADMIN") ?
                        <>
                            <NavLink to={"/account/admin/add"}
                                     className="account-sidebar-link nav-link"
                                     activeClassName="is-active">Add perfume</NavLink>
                            <NavLink to={"/account/admin/perfumes"}
                                     className="account-sidebar-link nav-link"
                                     activeClassName="is-active">List of perfumes</NavLink>
                            <NavLink to={"/account/admin/orders"}
                                     className="account-sidebar-link nav-link"
                                     activeClassName="is-active">List of all orders</NavLink>
                            <NavLink to={"/account/admin/users"}
                                     className="account-sidebar-link nav-link"
                                     activeClassName="is-active">List of all users</NavLink>
                        </> :
                        <>
                            <NavLink to={"/account/user/edit"}
                                     className="account-sidebar-link nav-link"
                                     activeClassName="is-active">Change password</NavLink>
                            <NavLink to={"/account/user/orders"}
                                     className="account-sidebar-link nav-link"
                                     activeClassName="is-active">List of orders</NavLink>
                        </>
                    }
                </div>
                <div className="col-md-10">
                    <Route exact path="/account" component={() => <AccountItem/>}/>
                    <Route path="/account/user/info" component={() => <UsersPersonalData/>}/>
                    <Route path="/account/user/edit" component={() => <UserChangePassword/>}/>
                    <Route path="/account/user/orders" component={() => <UserOrdersList/>}/>
                    {(localStorage.getItem("userRole") === "ADMIN") ?
                        <>
                            <Route path="/account/admin/add" component={() => <AddPerfume/>}/>
                            <Route exact path="/account/admin/perfumes" component={() => <EditPerfumes perfumes={perfumes}/>}/>
                            <Route exact path="/account/admin/perfumes/:id" component={(props: RouteComponentProps<{ id: string }>) => <EditPerfume {...props}/>}/>
                            <Route path="/account/admin/orders" component={() => <OrdersList/>}/>
                            <Route exact path="/account/admin/users" component={() => <UserList/>}/>
                            <Route exact path="/account/admin/users/:id" component={(props: RouteComponentProps<{ id: string }>) => <EditUser {...props}/>}/>
                        </> : <Redirect to={"/account"}/>}
                </div>
            </div>
        </div>
    );
};

export default Account;
