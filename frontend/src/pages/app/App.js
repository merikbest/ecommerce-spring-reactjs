import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import Menu from "../menu/Menu";
import Contacts from "../contacts/Contacts";
import Footer from "../../component/footer/Footer";
import Home from "../home/Home";
import NavBar from "../../component/navbar/NavBar";
import Login from "../login/Login";
import Registration from "../registration/Registration";
import Product from "../product/Product";
import Account from "../account/Account";
import Cart from "../cart/Cart";
import Order from "../order/Order";
import OrderFinalize from "../order-finalize/OrderFinalize";
import AddProduct from "../add-product/AddProduct";
import OrdersList from "../orders-list/OrdersList";
import UserList from "../user-list/UserList";
import EditUser from "../edit-user/EditUser";
import UserEditProfile from "../user-edit-profile/UserEditProfile";
import EditPerfumesList from "../edit-perfumes-list/EditPerfumesList";
import EditPerfume from "../edit-perfume/EditProduct";

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
                    <Route exact path="/product/list/edit" component={EditPerfumesList}/>
                    <Route exact path="/product/list/edit/:id" component={EditPerfume}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
