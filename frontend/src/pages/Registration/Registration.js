import React, {Component} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import {registration, formReset} from "../../actions/auth-actions";
import {checkPasswords, validateEmail, validatePassword} from "../../utils/input-validators";

class Registration extends Component {
    initialState = {
        email: "",
        username: "",
        password: "",
        password2: "",
        captchaValue: "",
        validateEmailError: "",
        validatePasswordError: "",
        validateRepeatPasswordError: ""
    };

    state = {...this.initialState};

    componentDidMount() {
        this.props.formReset();
    }

    onClickSignUp = (event) => {
        event.preventDefault();

        const {email, username, password, password2, captchaValue} = this.state;
        const validateErrors = {};
        validateErrors.validateEmailError = validateEmail(email);
        validateErrors.validatePasswordError = validatePassword(password);
        validateErrors.validateRepeatPasswordError = checkPasswords(password, password2);

        if (validateErrors.validateEmailError || validateErrors.validatePasswordError ||
            validateErrors.validateRepeatPasswordError) {
            this.setState({
                ...validateErrors
            });
        } else {
            const bodyFormData = new FormData();
            bodyFormData.append("email", email);
            bodyFormData.append("username", username);
            bodyFormData.append("password", password);
            bodyFormData.append("password2", password2);
            bodyFormData.append("g-recaptcha-response", captchaValue);

            this.props.registration(bodyFormData)
                .then(() => {
                    if (this.props.isRegistered) {
                        this.setState({
                            ...this.initialState
                        });
                    }
                });

            window.grecaptcha.reset();
        }
    };

    onChangeRecaptcha = (value) => {
        this.setState({
            captchaValue: value
        });
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {email, username, password, password2, validateEmailError, validatePasswordError, validateRepeatPasswordError} = this.state;
        const {emailError, usernameError, passwordError, password2Error} = this.props.errors;

        return (
            <div className="container mt-5">
                <h4><FontAwesomeIcon className="mr-2" icon={faUserPlus}/> SIGN UP</h4>
                <hr align="left" width="550"/>
                {this.props.isRegistered ? <div className="alert alert-success col-6" role="alert">
                    Activation code has been sent to your email!
                </div> : null}
                <form onSubmit={this.onClickSignUp}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">E-mail: </label>
                        <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faEnvelope}/>
                        <div className="col-sm-4">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                className={emailError || validateEmailError ? "form-control is-invalid" : "form-control"}
                                onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">{emailError || validateEmailError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">User name: </label>
                        <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faUser}/>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                name="username"
                                value={username}
                                className={usernameError ? "form-control is-invalid" : "form-control"}
                                onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">{usernameError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password: </label>
                        <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faLock}/>
                        <div className="col-sm-4">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                className={passwordError || validatePasswordError ? "form-control is-invalid" : "form-control"}
                                onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">{passwordError || validatePasswordError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Confirm password: </label>
                        <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faLock}/>
                        <div className="col-sm-4">
                            <input
                                type="password"
                                name="password2"
                                value={password2}
                                className={password2Error || validateRepeatPasswordError ? "form-control is-invalid" : "form-control"}
                                onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">{password2Error || validateRepeatPasswordError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <button type="submit" className="btn btn-dark mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faUserPlus}/>Sign up
                        </button>
                    </div>
                    <ReCAPTCHA onChange={this.onChangeRecaptcha} sitekey="6Lc5cLkZAAAAAN8mFk85HQieB9toPcWFoW0RXCNR"/>
                </form>
            </div>
        );
    }
}

Registration.propTypes = {
    registration: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isRegistered: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.auth.errors,
    isRegistered: state.auth.isRegistered
});

export default connect(mapStateToProps, {registration, formReset})(Registration);


