import React, {Component} from 'react';
import ShopService from "../../services/shop-service";
import {Redirect} from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: false,
            email: "",
            password: "",
            message: "",
            messageType: ""
        };

        this.onClickSignIn = this.onClickSignIn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        ShopService.activateEmailCode(this.props.code)
            .then((response) => {
                this.setState({
                    message: response.data,
                    messageType: response.data
                })
            });
    }

    onClickSignIn = (event) => {
        event.preventDefault();

        const {email, password} = this.state;
        const data = {email, password};

        ShopService.login(data)
            .then((response) => {
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userRole", response.data.userRole);
                localStorage.setItem("isLoggedIn", true);

                this.setState({
                    logged: true
                });

                this.props.setLoggedIn(true);
            });
    }

    handleInputChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {email, password, message, messageType} = this.state;

        if (this.state.logged) {
            return <Redirect to="/rest/account"/>
        }

        return (
            <div className="container mt-5">

                <div className={`alert ${messageType}`} role="alert">
                    {message}
                </div>

                <h4>Вход в личный кабинет</h4>
                <hr align="left" width="550"/>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Электронная почта: </label>
                    <div className="col-sm-4">
                        <input className="form-control" type="email" name="email" value={email}
                               onChange={this.handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Пароль: </label>
                    <div className="col-sm-4">
                        <input className="form-control" type="password" name="password" value={password}
                               onChange={this.handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <button className="btn btn-dark mx-3" onClick={this.onClickSignIn}>Вход</button>
                </div>

            </div>
        );
    }
}