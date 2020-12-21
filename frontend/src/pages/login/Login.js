import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {login} from "../../actions/auth-actions";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    onClickSignIn = (event) => {
        event.preventDefault();

        const {email, password} = this.state;
        const data = {email, password};

        this.props.login(data);
    };

    onChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {email, password} = this.state;

        if (localStorage.getItem("isLoggedIn")) {
            this.props.setLoggedIn(true);
            this.props.setCartItems(this.props.auth.user.perfumeList);
            return <Redirect to="/account"/>
        }

        return (
            <div id="container" className="container mt-5">
                <h4>Вход в личный кабинет</h4>
                <hr align="left" width="550"/>
                {this.props.auth.error ?
                    <div className="alert alert-danger col-6" role="alert">
                        {this.props.auth.error}
                    </div> : null}
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Электронная почта: </label>
                    <div className="col-sm-4">
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.onChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Пароль: </label>
                    <div className="col-sm-4">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.onChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <button className="btn btn-dark mx-3" onClick={this.onClickSignIn}>Вход</button>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {login})(Login);
