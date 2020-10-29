import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class NavBar extends Component {

    handleLogout = () => {
        localStorage.clear();
        this.props.setLoggedIn(false);
    }

    render() {
        let links;
        let signOut;

        if (this.props.isLoggedIn) {
            links = (
                <li className="nav-item">
                    <Link to={"/rest/account"}><a className="nav-link text-light ">Личный кабинет</a></Link>
                </li>
            );

            signOut = (
                <div>
                    <Link to={"/rest"} onClick={this.handleLogout}>
                        <input type="submit" className="bg-black" style={{color: "white"}} value="Выход"/>
                    </Link>
                </div>
            );

        } else {
            links = (
                <>
                    <li className="nav-item">
                        <Link to={"/rest/login"}><a className="nav-link text-light ">Вход</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/rest/registration"}><a className="nav-link text-light ">Регистрация</a></Link>
                    </li>
                </>
            );
        }

        return (
            <div>
                <div className="container-fluid bg-black header-top d-none d-md-block pb-5 pt-5">
                    <img id="logo-main" src="https://i.ibb.co/fqYvrL8/LOGO4.jpg"
                         className="rounded mx-auto d-block "/>
                </div>
                <div className="container-fluid bg-black">
                    <nav className="container navbar navbar-expand-lg bg-black text-white"
                         style={{fontSize: "18px"}}>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto ">
                                <li className="nav-item">
                                    <Link to={"/rest"}><span
                                        className="nav-link text-light pl-5 pr-5">Главная</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/rest/menu"}><span
                                        className="nav-link text-light pl-5 pr-5">Парфюмерия</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/rest/contacts"}><span
                                        className="nav-link text-light pl-5 pr-5">Контакты</span></Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item">
                                    <a className="nav-link" href="/cart">
                                        <i className="fas fa-shopping-cart fa-1 pl-2 pr-2"
                                           style={{color: "white"}}></i></a>
                                </li>
                                {links}
                            </ul>
                            {signOut}
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}