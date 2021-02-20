import React from "react";
import {Link} from "react-router-dom";
import {faList, faLock, faPlusSquare, faShoppingBag, faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AccountNavbar = () => {
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
                                <FontAwesomeIcon className="mr-2" icon={faShoppingBag}/>List of all orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin/users/all"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faUsers}/>List of all users</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin/add"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faPlusSquare}/>Add perfume</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/product/list/edit"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faList}/>List of perfumes</Link>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to={"/user/edit"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faLock}/>Change password</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/user/orders"} className="nav-link text-light mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faShoppingBag}/>List of orders</Link>
                        </li>
                    </ul>
                }
            </nav>
        </div>
    )
}

export default AccountNavbar;