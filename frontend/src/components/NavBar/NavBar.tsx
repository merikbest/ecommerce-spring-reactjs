import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginOutlined, LogoutOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Affix, Badge, Col, Row, Space } from "antd";

import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import { selectCartItemsCount } from "../../redux-toolkit/cart/cart-selector";
import { logoutSuccess } from "../../redux-toolkit/user/user-slice";
import { ACCOUNT, BASE, CONTACTS, LOGIN, MENU,MENU_MINERALS, MENU_ONYX, MENU_JEWELRY, MENU_SOUVENIR,MENU_WITCHCRAFT, REGISTRATION } from "../../constants/routeConstants";
import { CART } from "../../constants/urlConstants";
import "./NavBar.scss";
import cristal from "../../img/Crystals1.png";

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
                <img alt={"navbar-logo"} src={cristal} />
            </div>
            <Affix>
                <div className={"navbar-wrapper"}>
                    <Row style={{ padding: "0px 400px" }}>
                        <Col span={7}>
                            <ul>
                                <Link to={BASE}>
                                    <li>Начало</li>
                                </Link>
                                <li>
                                    <Link to={{ pathname: MENU, state: { id: "all" } }}>Кристали, Минерали и Сувенири</Link>
                                </li>
                                {/* <li>
                                    <Link to={{ pathname: MENU_MINERALS, state: { id: "all" } }}> Минерали</Link>
                                </li>
                                  <li>
                                    <Link to={{ pathname: MENU_ONYX, state: { id: "all" } }}> Оникс</Link>
                                </li>
                                  <li>
                                    <Link to={{ pathname: MENU_JEWELRY, state: { id: "all" } }}> Бижута</Link>
                                </li>
                                  <li>
                                    <Link to={{ pathname: MENU_SOUVENIR, state: { id: "all" } }}> Сувенири</Link>
                                </li>
                                  <li>
                                    <Link to={{ pathname: MENU_WITCHCRAFT, state: { id: "all" } }}> Вещерски неща</Link>
                                </li> */}
                                <Link to={CONTACTS}>
                                    <li>Контакти</li>
                                </Link>
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
                                        <Link to={ACCOUNT}>
                                            <li>
                                                <UserOutlined />
                                                Акаунт
                                            </li>
                                        </Link>
                                        <Link id={"handleLogout"} to={BASE} onClick={handleLogout}>
                                            <li>
                                                <LogoutOutlined />
                                                Изход
                                            </li>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to={LOGIN}>
                                            <li>
                                                <Space align={"baseline"}>
                                                    <LoginOutlined />
                                                    Влизане
                                                </Space>
                                            </li>
                                        </Link>
                                        <Link to={REGISTRATION}>
                                            <li>
                                                <UserAddOutlined />
                                               Регистрация
                                            </li>
                                        </Link>

                                           <Link to={CONTACTS}>
                                            <li>
                                               Адрес: Кв.Манастирски Ливади Ул.Казбек 57
                                            </li>
                                        </Link>
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
