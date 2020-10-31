import React, {useEffect, useState} from 'react';
import ShopService from "../../services/ShopService";
import {BrowserRouter, Link, Route} from "react-router-dom";
import AddProduct from "./admin/AddProduct";
import EditProducts from "./admin/EditProducts";
import EditProduct from "./admin/EditProduct";

function Account(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ShopService.getProducts()
            .then((response) => {
                setProducts(response.data)
            });
    },[])

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
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                    {links}
                </nav>
                <Route exact path="/rest/admin/add" component={AddProduct}/>
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
            </div>
        </BrowserRouter>
    );
}

export default Account;