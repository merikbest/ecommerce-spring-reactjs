import {Link} from "react-router-dom";
import React from "react";
import {faEdit, faList, faPlusSquare, faShoppingBag, faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                            <Link to={"/admin/orders"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faShoppingBag}/>Список всех заказов</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin/users/all"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faUsers}/>Список пользователей</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin/add"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faPlusSquare}/>Добавить товар</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/product/list/edit"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faList}/>Список товаров</Link>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to={"/user/edit"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faShoppingBag}/>Изменить пароль</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/user/orders"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faEdit}/>Список заказов</Link>
                        </li>
                    </ul>
                }
            </nav>
        </div>
    )
}

export default AccountNavbar;