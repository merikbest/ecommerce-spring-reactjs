import React, {FC} from 'react';
import {Route, Switch} from "react-router-dom";

import Menu from "../Menu/Menu";
import Contacts from "../Contacts/Contacts";
import Footer from "../../component/Footer/Footer";
import Home from "../Home/Home";
import NavBar from "../../component/NavBar/NavBar";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Account from "../Account/Account";
import Order from "../Order/Order";
import OrderFinalize from "../OrderFinalize/OrderFinalize";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import Cart from "../Cart/Cart";
import Perfume from "../Perfume/Perfume";
import OAuth2RedirectHandler from "../../utils/oauth2/OAuth2RedirectHandler";

const App: FC = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/registration" component={Registration}/>
                <Route exact path="/forgot" component={ForgotPassword}/>
                <Route exact path="/reset/:code" component={ResetPassword}/>
                <Route exact path="/activate/:code" component={Login}/>
                <Route exact path="/menu" component={Menu}/>
                <Route exact path="/product/:id" component={Perfume}/>
                <Route exact path="/contacts" component={Contacts}/>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path="/order" component={Order}/>
                <Route exact path="/order/finalize" component={OrderFinalize}/>
                <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
                <Route path="/account" render={() => localStorage.getItem("token") ?
                    (<Route component={Account}/>) : (<Route component={Home}/>)}/>
                <Route path="*" component={Home}/>
            </Switch>
            <Footer/>
        </>
    );
};

export default App;
