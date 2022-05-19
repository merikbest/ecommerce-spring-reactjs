import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faSignOutAlt, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import {logout} from "../../redux/auth/auth-thunks";
import NavBarLink from "./NavBarLink/NavBarLink";
import {selectCartItems} from "../../redux/cart/cart-selector";
import {selectIsLoggedIn} from "../../redux/user/user-selector";
import "./NavBar.css";

const NavBar: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectCartItems);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const handleLogout = (): void => {
        dispatch(logout())
    };

    let links;
    let signOut;

    if (localStorage.getItem("isLoggedIn") || isLoggedIn) {
        links = <NavBarLink path={"/account"} title={"MY ACCOUNT"} linkClass={"pl-5 pr-5"} icon={faUser}/>;
        signOut = (
            <Link to={"/"} onClick={handleLogout}>
                <FontAwesomeIcon className="mr-2" icon={faSignOutAlt}/>EXIT
            </Link>
        );
    } else {
        links = (
            <>
                <NavBarLink path={"/login"} title={"SIGN IN"} linkClass={"pl-5 pr-3"} icon={faSignInAlt}/>
                <NavBarLink path={"/registration"} title={"SIGN UP"} icon={faUserPlus}/>
            </>
        );
        signOut = null;
    }

    return (
        <div>
            <div id="header" className="container-fluid header-top d-none d-md-block pb-5 pt-5">
                <img src="https://i.ibb.co/fqYvrL8/LOGO4.jpg" className="rounded mx-auto d-block"/>
            </div>
            <div className="container-fluid bg-black">
                <nav id="navbar-main" className="container navbar navbar-expand-lg bg-black text-white navbar-main">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <NavBarLink path={"/"} title={"HOME"} linkClass={"pl-5 pr-5"}/>
                            <li className="nav-item">
                                <Link to={{pathname: "/menu", state: {id: "all"}}}>
                                    <span className="nav-link pl-5 pr-5">
                                        PERFUMES
                                    </span>
                                </Link>
                            </li>
                            <NavBarLink path={"/contacts"} title={"CONTACTS"} linkClass={"pl-5 pr-5"}/>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/cart"} className="nav-link">
                                    <i className="fas fa-shopping-cart fa-lg pl-5" style={{color: "white"}}></i>
                                    <h5 className="d-inline cart_badge">
                                        <span className="badge badge-success">
                                            {perfumes.length}
                                        </span>
                                    </h5>
                                </Link>
                            </li>
                            {links}
                        </ul>
                        {signOut}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;
