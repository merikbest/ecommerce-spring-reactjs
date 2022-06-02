import React, { FC, ReactElement, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { BackTop } from "antd";

import {
    ACCOUNT,
    ACTIVATE,
    BASE,
    CART,
    CONTACTS,
    FORGOT,
    LOGIN,
    MENU,
    OAUTH2_REDIRECT,
    ORDER,
    ORDER_FINALIZE,
    PRODUCT,
    REGISTRATION,
    RESET
} from "./constants/routeConstants";
import { fetchCart } from "./redux-toolkit/cart/cart-thunks";
import { fetchUserInfo } from "./redux-toolkit/user/user-thunks";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Menu from "./pages/Menu/Menu";
import Contacts from "./pages/Contacts/Contacts";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Account from "./pages/Account/Account";
import OrderFinalize from "./pages/OrderFinalize/OrderFinalize";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import OAuth2RedirectHandler from "./utils/oauth2/OAuth2RedirectHandler";
import "./App.css";

const App: FC = (): ReactElement => {
    const dispatch = useDispatch();

    useEffect(() => {
        const perfumesFromLocalStorage: Map<number, number> = new Map(
            JSON.parse(localStorage.getItem("perfumes") as string)
        );
        dispatch(fetchCart(Array.from(perfumesFromLocalStorage.keys())));

        if (localStorage.getItem("token")) {
            dispatch(fetchUserInfo());
        }
    }, []);

    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path={BASE} component={Home} />
                <Route exact path={LOGIN} component={Login} />
                <Route exact path={REGISTRATION} component={Registration} />
                <Route exact path={FORGOT} component={ForgotPassword} />
                <Route exact path={`${RESET}/:code`} component={ResetPassword} />
                <Route exact path={`${ACTIVATE}/:code`} component={Login} />
                <Route exact path={MENU} component={Menu} />
                <Route exact path={`${PRODUCT}/:id`} component={Product} />
                <Route exact path={CONTACTS} component={Contacts} />
                <Route exact path={CART} component={Cart} />
                <Route exact path={ORDER} component={Order} />
                <Route exact path={ORDER_FINALIZE} component={OrderFinalize} />
                <Route path={OAUTH2_REDIRECT} component={OAuth2RedirectHandler} />
                <Route
                    path={ACCOUNT}
                    render={() =>
                        localStorage.getItem("token") ? <Route component={Account} /> : <Route component={Home} />
                    }
                />
                <Route path="*" component={Home} />
            </Switch>
            <Footer />
            <BackTop />
        </>
    );
};

export default App;
