import React, {useEffect, useState} from 'react';
import {Route} from "react-router-dom";
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
import EditProducts from "../edit-products/EditProducts";
import EditProduct from "../edit-product/EditProduct";
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
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={() => <Login setCartItems={setCartItems} setLoggedIn={setLoggedIn}/>}/>
            <Route exact path="/registration" component={Registration}/>
            <Route exact path="/menu" component={(props) => <Menu {...props}/>}/>
            <Route exact path="/product/:id" component={Product}/>
            <Route exact path="/contacts" component={Contacts}/>
            <Route exact path="/account" component={Account}/>
            <Route exact path="/cart" component={() => <Cart setCartItems={setCartItems}/>}/>
            <Route exact path="/order" component={Order}/>
            <Route exact path="/order/finalize" component={OrderFinalize}/>
            <Route exact path="/admin/add" component={AddProduct}/>
            <Route exact path="/admin/orders" component={OrdersList}/>
            <Route exact path="/admin/users/all" component={UserList}/>
            <Route exact path="/admin/user/:id" component={EditUser}/>
            <Route exact path="/user/edit" component={UserEditProfile}/>
            <Route exact path="/product/list/edit" component={() =>
                <EditProducts
                    data={products}
                    itemsPerPage={24}
                    searchByData={[
                        {label: 'Парфюмер', value: 'perfumer'},
                        {label: 'Название парфюма', value: 'perfumeTitle'},
                        {label: 'Страна производитель', value: 'country'},
                        {label: 'Пол', value: 'perfumeGender'}
                    ]}/>}/>
            <Route exact path="/product/list/edit/:id" component={EditProduct}/>
            <Footer/>
        </div>
    );
}

export default App;
