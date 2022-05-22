import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import NavBarLink from "./NavBarLink/NavBarLink";
import { selectUserFromUserState } from "../../redux/user/user-selector";
import { selectCartItemsCount } from "../../redux/cart/cart-selector";
import { ACCOUNT, BASE, CONTACTS, LOGIN, MENU, REGISTRATION } from "../../constants/routeConstants";
import { CART } from "../../constants/urlConstants";
import { logoutSuccess } from "../../redux/user/user-actions";
import "./NavBar.css";

const NavBar: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectUserFromUserState);
    const cartItemsCount = useSelector(selectCartItemsCount);

    const handleLogout = (): void => {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
    };

    return (
        <div>
            <div id="header" className="container-fluid header-top d-none d-md-block pb-5 pt-5">
                <img src="https://i.ibb.co/fqYvrL8/LOGO4.jpg" className="rounded mx-auto d-block" />
            </div>
            <div className="container-fluid bg-black">
                <nav id="navbar-main" className="container navbar navbar-expand-lg bg-black text-white navbar-main">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <NavBarLink path={BASE} title={"HOME"} linkClass={"pl-5 pr-5"} />
                            <li className="nav-item">
                                <Link to={{ pathname: MENU, state: { id: "all" } }}>
                                    <span className="nav-link pl-5 pr-5">PERFUMES</span>
                                </Link>
                            </li>
                            <NavBarLink path={CONTACTS} title={"CONTACTS"} linkClass={"pl-5 pr-5"} />
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={CART} className="nav-link">
                                    <i className="fas fa-shopping-cart fa-lg pl-5" style={{ color: "white" }}></i>
                                    <h5 className="d-inline cart_badge">
                                        <span className="badge badge-success">{cartItemsCount}</span>
                                    </h5>
                                </Link>
                            </li>
                            {usersData ? (
                                <>
                                    <NavBarLink path={ACCOUNT} title={"MY ACCOUNT"} linkClass={"pl-5"} icon={faUser} />
                                    <Link to={BASE} onClick={handleLogout} className={"nav-link"}>
                                        <FontAwesomeIcon className="mr-2" icon={faSignOutAlt} />
                                        EXIT
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <NavBarLink path={LOGIN} title={"SIGN IN"} linkClass={"pl-5"} icon={faSignInAlt} />
                                    <NavBarLink path={REGISTRATION} title={"SIGN UP"} icon={faUserPlus} />
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;
