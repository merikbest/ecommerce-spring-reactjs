import React, {Component} from 'react';
import ShopService from "../../services/shop-service";
import ReCAPTCHA from "react-google-recaptcha";

class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: "",
            password2: "",
            captchaValue: "",
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onClickSignUp = this.onClickSignUp.bind(this);
        this.onChangeRecaptcha = this.onChangeRecaptcha.bind(this);
    }

    onClickSignUp = (event) => {
        event.preventDefault();

        const {email, username, password, password2, captchaValue} = this.state;
        const bodyFormData = new FormData();

        bodyFormData.append("email", email);
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);
        bodyFormData.append("password2", password2);
        bodyFormData.append("g-recaptcha-response", captchaValue);

        ShopService.registration(bodyFormData)
            .then((response) => {
                this.props.history.push("/rest/login")
            })
            .catch((error) => {
                window.grecaptcha.reset();

                this.setState({
                    errors: error.response.data,
                })
            });
    }

    handleInputChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    onChangeRecaptcha(value) {
        this.setState({
            captchaValue: value
        })
    }

    render() {
        const {email, username, password, password2} = this.state;
        const {emailError, usernameError, passwordError, password2Error, captchaError} = this.state.errors;

        return (
            <div className="container mt-5">
                <h4>Регистрация</h4>
                <hr align="left" width="550"/>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Электронная почта: </label>
                    <div className="col-sm-4">
                        <input type="email" name="email" value={email}
                               className={emailError ? "form-control is-invalid" : "form-control"}
                               onChange={this.handleInputChange}
                        />
                        <div className="invalid-feedback">{emailError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Имя пользователя: </label>
                    <div className="col-sm-4">
                        <input type="text" name="username" value={username}
                               className={usernameError ? "form-control is-invalid" : "form-control"}
                               onChange={this.handleInputChange}
                        />
                        <div className="invalid-feedback">{usernameError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Пароль: </label>
                    <div className="col-sm-4">
                        <input type="password" name="password" value={password}
                               className={passwordError ? "form-control is-invalid" : "form-control"}
                               onChange={this.handleInputChange}
                        />
                        <div className="invalid-feedback">{passwordError}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Повторите пароль: </label>
                    <div className="col-sm-4">
                        <input type="password" name="password2" value={password2}
                               className={password2Error ? "form-control is-invalid" : "form-control"}
                               onChange={this.handleInputChange}
                        />
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

export default Registration;