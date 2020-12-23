import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {login} from "../../actions/auth-actions";
import {faEnvelope, faLock, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

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

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {email, password} = this.state;

        if (localStorage.getItem("isLoggedIn")) {
            return <Redirect to="/account"/>
        }

        return (
            <div id="container" className="container mt-5">
                <h4><FontAwesomeIcon className="mr-3" icon={faSignInAlt}/>Вход в личный кабинет</h4>
                <hr align="left" width="550"/>
                {this.props.auth.error ?
                    <div className="alert alert-danger col-6" role="alert">
                        {this.props.auth.error}
                    </div> : null}
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Электронная почта: </label>
                    <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faEnvelope}/>
                    <div className="col-sm-4">
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Пароль: </label>
                    <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faLock}/>
                    <div className="col-sm-4">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={password}
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {login})(Login);
