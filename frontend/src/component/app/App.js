import React, {useEffect, useState} from 'react';
import {Route} from "react-router-dom";
import Menu from "../menu/Menu";
import Contacts from "../parts/contacts/Contacts";
import Footer from "../parts/footer/Footer";
import Home from "../home/Home";
import NavBar from "../parts/navbar/NavBar";
import Login from "../auth/login/Login";
import Registration from "../auth/registration/Registration";
import Product from "../shopping/product/Product";
import Account from "../account/Account";
import Cart from "../shopping/cart/Cart";
import Order from "../shopping/order/Order";
import OrderFinalize from "../shopping/order/OrderFinalize";

function App(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn")) {
            setLoggedIn(true)
        }
    }, [])

    const setLoggedIn = (event) => {
        setIsLoggedIn(event)
    }

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
            <Route exact path="/rest" component={Home}/>
            <Route exact path="/rest/login" component={() => <Login setLoggedIn={setLoggedIn}/>}/>
            <Route exact path="/rest/registration" component={Registration}/>
            <Route exact path="/rest/menu" component={(props) => <Menu {...props}/>}/>
            <Route exact path="/rest/product/:id" component={Product}/>
            <Route exact path="/rest/contacts" component={Contacts}/>
            <Route exact path="/rest/account" component={Account}/>
            <Route exact path="/rest/cart" component={Cart}/>
            <Route exact path="/rest/order" component={Order}/>
            <Route exact path="/rest/order/finalize" component={OrderFinalize}/>

            {/*<Route exact path="/rest/admin/add" component={AddProduct}/>*/}
            {/*<Route exact path="/rest/admin/orders" component={OrdersList}/>*/}
            {/*<Route exact path="/rest/product/list/edit/:id" component={EditProduct}/>*/}

            <Footer/>
        </div>
    );
}

export default App;
