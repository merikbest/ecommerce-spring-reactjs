import React, {useEffect, useState} from 'react';
import ShopService from "../../services/ShopService";
import {BrowserRouter, Link, Route} from "react-router-dom";
import AddProduct from "./admin/AddProduct";
import EditProducts from "./admin/EditProducts";
import EditProduct from "./admin/EditProduct";
import OrdersList from "./admin/OrdersList";
import Product from "../shopping/product/Product";
import UserList from "./admin/UserList";
import EditUser from "./admin/EditUser";
import UserEditProfile from "./user/UserEditProfile";

function Account(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ShopService.getPerfumes()
            .then((response) => {
                setProducts(response.data)
            });
    },[])

    let links;

    if (localStorage.getItem("userRole") === "ADMIN") {
        links = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={"/rest/admin/orders"}><a className="nav-link text-light mx-3">Список всех заказов</a></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/rest/admin/users/all"}><a className="nav-link text-light mx-3">Список пользователей</a></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/rest/admin/add"}><a className="nav-link text-light mx-3">Добавить товар</a></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/rest/product/list/edit"}><a className="nav-link text-light mx-3">Список
                        товаров</a></Link>
                </li>
            </ul>
        );
    } else {
        links = (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to={"/rest/user/edit"}><a className="nav-link text-light mx-3">Изменить пароль</a></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/rest/user/orders"}><a className="nav-link text-light mx-3">Список заказов</a></Link>
                </li>
            </ul>
        );
    }

    return (
        <BrowserRouter>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                    {links}
                </nav>
                <Route exact path="/rest/admin/add" component={AddProduct}/>
                <Route exact path="/rest/admin/orders" component={OrdersList}/>
                <Route exact path="/rest/admin/users/all" component={UserList}/>
                <Route exact path="/rest/admin/user/:id" component={EditUser}/>
                <Route exact path="/rest/user/edit" component={UserEditProfile}/>
                <Route exact path="/rest/user/orders" component={OrdersList}/>
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
                <Route exact path="/rest/product/:id" component={Product}/>
            </div>
        </BrowserRouter>
    );
}

export default Account;