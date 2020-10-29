import React, {Component} from 'react';
import NavBar from "../parts/navbar/navbar";
import Footer from "../parts/footer/footer";
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import Home from "../home/home";
import Contacts from "../parts/contacts/contacts";
import Product from "../product/product";
import Login from "../auth/login";
import Account from "../account/account";
import Registration from "../auth/registration";
import Menu from "../menu/menu";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount = () => {
        if (localStorage.getItem("isLoggedIn")) {
            this.setLoggedIn(true)
        }
    }

    setLoggedIn = (event) => {
        this.setState({
            isLoggedIn: event
        });
    }

    render() {
        return (
            <BrowserRouter>
                <NavBar isLoggedIn={this.state.isLoggedIn} setLoggedIn={this.setLoggedIn}/>
                <Route exact path="/rest" component={Home}/>
                <Route exact path="/rest/contacts" component={Contacts}/>
                <Route exact path="/rest/product/:id" component={Product}/>
                <Route exact path="/rest/login" component={() => <Login setLoggedIn={this.setLoggedIn}/>}/>
                <Route exact path="/rest/activate/:code"
                       render={(match) => {
                           const {code} = match.params;
                           return <Login code={code} setLoggedIn={this.setLoggedIn}/>
                       }
                       }/>
                <Route exact path="/rest/registration" component={Registration}/>
                <Route exact path="/rest/account" component={Account}/>
                <Route exact path="/rest/menu" component={Menu}/>
                <Footer/>
            </BrowserRouter>
        );
    }
}