import React, {Component} from 'react';
import {BrowserRouter, Link, Route} from "react-router-dom";
import AddProduct from "./admin/add-product";

export default class Account extends Component {

    render() {
        let links;

        if (localStorage.getItem("userRole") === "ADMIN") {
            links = (
                <ul className="navbar-nav">
                    {/*<li className="nav-item">*/}
                    {/*    <a className="nav-link text-light mx-3" href="/orders">Список всех заказов</a>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <form action="/#" method="get">*/}
                    {/*        <a className="nav-link text-light mx-3" href="/user">Список пользователей</a>*/}
                    {/*    </form>*/}
                    {/*</li>*/}
                    <li className="nav-item">
                        <Link to={"/rest/admin/add"}><a className="nav-link text-light mx-3">Добавить товар</a></Link>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*    <form action="/user/productlist" method="get">*/}
                    {/*        <a className="nav-link text-light mx-3" href="/user/productlist">Список товаров</a>*/}
                    {/*    </form>*/}
                    {/*</li>*/}
                </ul>
            );
        } else {
            links = (
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link text-light mx-3" href="/user/edit">Изменить пароль</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light mx-3" href="/userOrders">Список заказов</a>
                    </li>
                </ul>
            );
        }

        return (
            <BrowserRouter>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {links}
                </nav>
                <Route exact path="/rest/admin/add" component={AddProduct}/>
            </div>
            </BrowserRouter>
        );
    }
}
