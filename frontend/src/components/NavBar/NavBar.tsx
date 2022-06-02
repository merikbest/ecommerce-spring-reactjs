import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginOutlined, LogoutOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Affix, Badge, Col, Row, Space } from "antd";

import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import { selectCartItemsCount } from "../../redux-toolkit/cart/cart-selector";
import { logoutSuccess } from "../../redux-toolkit/user/user-slice";
import { ACCOUNT, BASE, CONTACTS, LOGIN, MENU, REGISTRATION } from "../../constants/routeConstants";
import { CART } from "../../constants/urlConstants";
import "./NavBar.scss";

const NavBar: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectUserFromUserState);
    const cartItemsCount = useSelector(selectCartItemsCount);

    const handleLogout = (): void => {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
    };

    return (
        <>
            <div className={"navbar-logo-wrapper"}>
                <img alt={"navbar-logo"} src="https://i.ibb.co/fqYvrL8/LOGO4.jpg" />
            </div>
            <Affix>
                <div className={"navbar-wrapper"}>
                    <Row style={{ padding: "0px 400px" }}>
                        <Col span={12}>
                            <ul>
                                <li>
                                    <Link to={BASE}>HOME</Link>
                                </li>
                                <li>
                                    <Link to={{ pathname: MENU, state: { id: "all" } }}>PERFUMES</Link>
                                </li>
                                <li>
                                    <Link to={CONTACTS}>CONTACTS</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col span={12}>
                            <ul>
                                <li className={"navbar-cart"}>
                                    <Badge count={cartItemsCount} size="small" color={"green"}>
                                        <Link to={CART}>
                                            <ShoppingCartOutlined />
                                        </Link>
                                    </Badge>
                                </li>
                                {usersData ? (
                                    <>
                                        <li>
                                            <Link to={ACCOUNT}>
                                                <UserOutlined />
                                                MY ACCOUNT
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={BASE} onClick={handleLogout}>
                                                <LogoutOutlined />
                                                EXIT
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to={LOGIN}>
                                                <Space align={"baseline"}>
                                                    <LoginOutlined />
                                                    SIGN IN
                                                </Space>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={REGISTRATION}>
                                                <UserAddOutlined />
                                                SIGN UP
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Affix>
        </>
    );
};

export default NavBar;
