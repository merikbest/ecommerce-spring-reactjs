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
import AddProduct from "../account/admin/AddProduct";
import OrdersList from "../account/admin/OrdersList";
import UserList from "../account/admin/UserList";
import EditUser from "../account/admin/EditUser";
import UserEditProfile from "../account/user/UserEditProfile";
import EditProducts from "../account/admin/EditProducts";
import EditProduct from "../account/admin/EditProduct";
import ShopService from "../../services/ShopService";

function App(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(null);

    useEffect(() => {
        ShopService.getPerfumes()
            .then((response) => {
                setProducts(response.data)
            });
    }, [])

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn")) {
            setLoggedIn(true)
        }
    }, [])

    const setLoggedIn = (event) => {
        setIsLoggedIn(event)
        setCartItemsCount(event)
    }

    const setCartItems = (event) => {
        setCartItemsCount(event)
    }

    return (
        <div>
            <NavBar setCartItems={cartItemsCount} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
            <Route exact path="/rest" component={Home}/>
            <Route exact path="/rest/login" component={() => <Login setCartItems={setCartItems} setLoggedIn={setLoggedIn}/>}/>
            <Route exact path="/rest/registration" component={Registration}/>
            <Route exact path="/rest/menu" component={(props) => <Menu {...props}/>}/>
            <Route exact path="/rest/product/:id" component={Product}/>
            <Route exact path="/rest/contacts" component={Contacts}/>
            <Route exact path="/rest/account" component={Account}/>
            <Route exact path="/rest/cart" component={() => <Cart setCartItems={setCartItems}/>}/>
            <Route exact path="/rest/order" component={Order}/>
            <Route exact path="/rest/order/finalize" component={OrderFinalize}/>
            <Route exact path="/rest/admin/add" component={AddProduct}/>
            <Route exact path="/rest/admin/orders" component={OrdersList}/>
            <Route exact path="/rest/admin/users/all" component={UserList}/>
            <Route exact path="/rest/admin/user/:id" component={EditUser}/>
            <Route exact path="/rest/user/edit" component={UserEditProfile}/>
            <Route exact path="/rest/product/list/edit" component={() =>
                <EditProducts
                    data={products}
                    itemsPerPage={24}
                    searchByData={[
                        {label: 'Парфюмер', value: 'perfumer'},
                        {label: 'Название парфюма', value: 'perfumeTitle'},
                        {label: 'Страна производитель', value: 'country'},
                        {label: 'Пол', value: 'perfumeGender'}
                    ]}/>}/>
            <Route exact path="/rest/product/list/edit/:id" component={EditProduct}/>
            <Footer/>
        </div>
    );
}

export default App;
