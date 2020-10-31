import React, {useEffect, useState} from 'react';
import {Route, Switch} from "react-router-dom";
import LandingPage from "../menu/Menu";
import Contacts from "../parts/contacts/Contacts";
import Footer from "../parts/footer/Footer";
import Home from "../home/Home";
import NavBar from "../parts/navbar/NavBar";
import Login from "../auth/login/Login";
import Registration from "../auth/registration/Registration";
import Product from "../shopping/product/Product";
import Account from "../account/Account";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn")) {
            setLoggedIn(true)
        }
    }, [])

    const setLoggedIn = (event) => {
        setIsLoggedIn(event)
    }

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
            <Route exact path="/rest" component={Home}/>
            <Route exact path="/rest/login" component={() => <Login setLoggedIn={setLoggedIn}/>}/>
            <Route exact path="/rest/registration" component={Registration}/>
            <Route exact path="/rest/menu" component={LandingPage}/>
            <Route exact path="/rest/product/:id" component={Product}/>
            <Route exact path="/rest/contacts" component={Contacts}/>
            <Route exact path="/rest/account" component={Account}/>
            <Footer/>
        </div>
    );
}

export default App;
