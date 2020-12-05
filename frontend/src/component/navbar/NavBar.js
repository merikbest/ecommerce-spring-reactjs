import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./NavBar.css";

function NavBar(props) {
    const [scrolled, setScrolled] = useState(false);
    let links;
    let signOut;

    const handleLogout = () => {
        localStorage.clear();
        props.setLoggedIn(false);
    }

    if (props.isLoggedIn) {
        links = (
            <li className="nav-item">
                <Link to={"/account"}><span className="nav-link pl-5 pr-5">ЛИЧНЫЙ КАБИНЕТ</span></Link>
            </li>
        );

        signOut = (
            <div>
                <Link to={"/"} onClick={handleLogout}>
                    <button className="btn btn-dark mr-3" style={{color: "white"}}>Выход</button>
                </Link>
            </div>
        );

    } else {
        links = (
            <>
                <li className="nav-item">
                    <Link to={"/login"}><span className="nav-link pl-5 pr-3">ВХОД</span></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/registration"}><span className="nav-link">РЕГИСТРАЦИЯ</span></Link>
                </li>
            </>
        );
    }

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 230) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    let navbar = ['navbar'];

    if (scrolled) {
        navbar.push('fixed');
    }

    return (
        <div>
            <div id="header" className="container-fluid header-top d-none d-md-block pb-5 pt-5">
                <img src="https://i.ibb.co/fqYvrL8/LOGO4.jpg" className="rounded mx-auto d-block"/>
            </div>
            <div className="container-fluid bg-black">
                {/*${navbar.join(" ")}*/}
                <nav id="navbar-main" className={`container navbar navbar-expand-lg bg-black text-white `}
                     style={{fontSize: "18px"}}>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto ">
                            <li className="nav-item">
                                <Link to={"/"}><span className="nav-link pl-5 pr-5">ГЛАВНАЯ</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{pathname: "/menu", state: {id: "all"}}}>
                                    <span className="nav-link pl-5 pr-5">ПАРФЮМЕРИЯ</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/contacts"}><span className="nav-link pl-5 pr-5">КОНТАКТЫ</span></Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/cart"}>
                                    <i className="fas fa-shopping-cart fa-lg pl-5" style={{color: "white"}}></i>
                                    {props.setCartItems !== null ?
                                        <h5 className="d-inline"
                                            style={{position: "relative", right: "15px", bottom: "8px"}}>
                                            <span className="badge badge-success">{props.setCartItems}</span>
                                        </h5> : null
                                    }
                                </Link>
                            </li>
                            {links}
                        </ul>
                        {signOut}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;