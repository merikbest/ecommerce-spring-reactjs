import React, {Component} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {registration} from "../../actions/auth-actions";

class Registration extends Component {
    state = {
        email: "",
        username: "",
        password: "",
        password2: "",
        captchaValue: ""
    };

    onClickSignUp = (event) => {
        event.preventDefault();

        const {email, username, password, password2, captchaValue} = this.state;
        const bodyFormData = new FormData();

        bodyFormData.append("email", email);
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);
        bodyFormData.append("password2", password2);
        bodyFormData.append("g-recaptcha-response", captchaValue);

        this.props.registration(bodyFormData);

        if (this.props.auth.errors != null) {
            window.grecaptcha.reset();
        } else {
            this.props.history.push("/login")
        }
    };

    onChangeRecaptcha = (value) => {
        this.setState({
            captchaValue: value
        });
    };

    onChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {email, username, password, password2} = this.state;
        const {emailError, usernameError, passwordError, password2Error} = this.props.auth.errors;

        return (
            <div className="container mt-5">
                <h4>Регистрация</h4>
                <hr align="left" width="550"/>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Электронная почта: </label>
                    <div className="col-sm-4">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            className={emailError ? "form-control is-invalid" : "form-control"}
                            onChange={this.onChange}/>
                        <div className="invalid-feedback">{emailError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Имя пользователя: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            name="username"
                            value={username}
                            className={usernameError ? "form-control is-invalid" : "form-control"}
                            onChange={this.onChange}/>
                        <div className="invalid-feedback">{usernameError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Пароль: </label>
                    <div className="col-sm-4">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className={passwordError ? "form-control is-invalid" : "form-control"}
                            onChange={this.onChange}/>
                        <div className="invalid-feedback">{passwordError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Повторите пароль: </label>
                    <div className="col-sm-4">
                        <input
                            type="password"
                            name="password2"
                            value={password2}
                            className={password2Error ? "form-control is-invalid" : "form-control"}
                            onChange={this.onChange}/>
                        <div className="invalid-feedback">{password2Error}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <button className="btn btn-dark mx-3" onClick={this.onClickSignUp}>Регистрация</button>
                </div>
                <ReCAPTCHA onChange={this.onChangeRecaptcha} sitekey="6Lc5cLkZAAAAAN8mFk85HQieB9toPcWFoW0RXCNR"/>
            </div>
        );
    }
}

Registration.propTypes = {
    registration: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {registration})(Registration);


