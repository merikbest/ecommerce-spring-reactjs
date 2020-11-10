import {Link} from "react-router-dom";
import React from "react";

function AccountNavbar(props) {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                {(localStorage.getItem("userRole") === "ADMIN") ?
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={"/rest/admin/orders"}><a className="nav-link text-light mx-3">Список всех
                                заказов</a></Link>
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
                    :
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to={"/rest/user/edit"}><a className="nav-link text-light mx-3">Изменить пароль</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/rest/user/orders"}><a className="nav-link text-light mx-3">Список заказов</a></Link>
                        </li>
                    </ul>
                }
            </nav>
        </div>
    )
}

export default AccountNavbar;