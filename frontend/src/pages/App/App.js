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

class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/registration" component={Registration}/>
                    <Route exact path="/menu" component={Menu}/>
                    <Route exact path="/product/:id" component={Product}/>
                    <Route exact path="/contacts" component={Contacts}/>
                    <Route exact path="/account" component={Account}/>
                    <Route exact path="/cart" component={Cart}/>
                    <Route exact path="/order" component={Order}/>
                    <Route exact path="/order/finalize" component={OrderFinalize}/>
                    <Route exact path="/admin/add" component={AddProduct}/>
                    <Route exact path="/admin/orders" component={OrdersList}/>
                    <Route exact path="/admin/users/all" component={UserList}/>
                    <Route exact path="/admin/user/:id" component={EditUser}/>
                    <Route exact path="/user/edit" component={UserEditProfile}/>
                    <Route exact path="/user/orders" component={UserOrdersList}/>
                    <Route exact path="/product/list/edit" component={EditPerfumesList}/>
                    <Route exact path="/product/list/edit/:id" component={EditPerfume}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
