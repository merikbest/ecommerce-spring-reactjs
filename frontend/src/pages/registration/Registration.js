import React, {useState} from 'react';
import ShopService from "../../services/ShopService";
import ReCAPTCHA from "react-google-recaptcha";

function Registration(props) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [captchaValue, setCaptchaValue] = useState("");
    const [errors, setErrors] = useState({});

    const onClickSignUp = (event) => {
        event.preventDefault();

        const bodyFormData = new FormData();

        bodyFormData.append("email", email);
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);
        bodyFormData.append("password2", password2);
        bodyFormData.append("g-recaptcha-response", captchaValue);

        ShopService.registration(bodyFormData)
            .then((response) => {
                props.history.push("/login")
            })
            .catch((error) => {
                window.grecaptcha.reset();
                setErrors(error.response.data)
            });
    }

    const onChangeRecaptcha = (value) => {
        setCaptchaValue(value)
    }

    const {emailError, usernameError, passwordError, password2Error, captchaError} = errors;

    return (
        <div className="container mt-5">
            <h4>Регистрация</h4>
            <hr align="left" width="550"/>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Электронная почта: </label>
                <div className="col-sm-4">
                    <input type="email" name="email" value={email}
                           className={emailError ? "form-control is-invalid" : "form-control"}
                           onChange={(event) => setEmail(event.target.value)}
                    />
                    <div className="invalid-feedback">{emailError}</div>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Имя пользователя: </label>
                <div className="col-sm-4">
                    <input type="text" name="username" value={username}
                           className={usernameError ? "form-control is-invalid" : "form-control"}
                           onChange={(event) => setUsername(event.target.value)}
                    />
                    <div className="invalid-feedback">{usernameError}</div>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Пароль: </label>
                <div className="col-sm-4">
                    <input type="password" name="password" value={password}
                           className={passwordError ? "form-control is-invalid" : "form-control"}
                           onChange={(event) => setPassword(event.target.value)}
                    />
                    <div className="invalid-feedback">{passwordError}</div>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Повторите пароль: </label>
                <div className="col-sm-4">
                    <input type="password" name="password2" value={password2}
                           className={password2Error ? "form-control is-invalid" : "form-control"}
                           onChange={(event) => setPassword2(event.target.value)}
                    />
                    <div className="invalid-feedback">{password2Error}</div>
                </div>
            </div>

            <div className="form-group row">
                <button className="btn btn-dark mx-3" onClick={onClickSignUp}>Регистрация</button>
            </div>

            <ReCAPTCHA onChange={onChangeRecaptcha} sitekey="6Lc5cLkZAAAAAN8mFk85HQieB9toPcWFoW0RXCNR"/>
        </div>
    );
}

export default Registration;