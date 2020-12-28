import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import Menu from "../Menu/Menu";
import Contacts from "../Contacts/Contacts";
import Footer from "../../component/Footer/Footer";
import Home from "../Home/Home";
import NavBar from "../../component/NavBar/NavBar";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Product from "../Perfume/Perfume";
import Account from "../Account/Account";
import Cart from "../Cart/Cart";
import Order from "../Order/Order";
import OrderFinalize from "../OrderFinalize/OrderFinalize";
import AddProduct from "../AddProduct/AddProduct";
import OrdersList from "../OrdersList/OrdersList";
import UserList from "../UserList/UserList";
import EditUser from "../EditUser/EditUser";
import UserEditProfile from "../UserEditProfile/UserEditProfile";
import EditPerfumesList from "../EditPerfumesList/EditPerfumesList";
import EditPerfume from "../EditPerfume/EditPerfume";
import UserOrdersList from "../UserOrdersList/UserOrdersList";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";

class App extends Component {
    render() {
        const isAdmin = localStorage.getItem("userRole") === "ADMIN";

        return (
            <div>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/registration" component={Registration}/>
                    <Route exact path="/forgot" component={ForgotPassword}/>
                    <Route exact path="/reset/:code" component={ResetPassword}/>
                    <Route exact path="/activate/:code" component={Login}/>
                    <Route exact path="/menu" component={Menu}/>
                    <Route exact path="/product/:id" component={Product}/>
                    <Route exact path="/contacts" component={Contacts}/>
                    <Route exact path="/account" component={Account}/>
                    <Route exact path="/cart" render={() => localStorage.getItem("isLoggedIn") ?
                        (<Route component={Cart}/>) : (<Route component={Login}/>)}/>
                    <Route exact path="/order" component={Order}/>
                    <Route exact path="/order/finalize" component={OrderFinalize}/>
                    <Route exact path="/admin/add" render={() => (isAdmin) ?
                        (<Route component={AddProduct}/>) : (<Route component={Home}/>)}/>
                    <Route exact path="/admin/orders" render={() => (isAdmin) ?
                        (<Route component={OrdersList}/>) : (<Route component={Home}/>)}/>
                    <Route exact path="/admin/users/all" render={() => (isAdmin) ?
                        (<Route component={UserList}/>) : (<Route component={Home}/>)}/>
                    <Route exact path="/admin/user/:id" render={() => (isAdmin) ?
                        (<Route component={EditUser}/>) : (<Route component={Home}/>)}/>
                    <Route exact path="/product/list/edit" render={() => (isAdmin) ?
                        (<Route component={EditPerfumesList}/>) : (<Route component={Home}/>)}/>
                    <Route exact path="/product/list/edit/:id" render={() => (isAdmin) ?
                        (<Route component={EditPerfume}/>) : (<Route component={Home}/>)}/>
                    <Route exact path="/user/edit" render={() => localStorage.getItem("isLoggedIn") ?
                        (<Route component={UserEditProfile}/>) : (<Route component={Home}/>)}/>
                    <Route exact path="/user/orders" render={() => localStorage.getItem("isLoggedIn") ?
                        (<Route component={UserOrdersList}/>) : (<Route component={Home}/>)}/>
                    <Route path="*" component={Home}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
