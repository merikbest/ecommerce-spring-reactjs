import React, {FC, FormEvent, useEffect, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import {formReset, registration} from "../../redux/thunks/auth-thunks";
import PageLoader from "../../component/PageLoader/PageLoader";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {AuthErrors, UserRegistration} from "../../types/types";

const Registration: FC = () => {
    const dispatch = useDispatch();
    const isRegistered: boolean = useSelector((state: AppStateType) => state.auth.isRegistered);
    const loading: boolean = useSelector((state: AppStateType) => state.auth.loading);
    const errors: Partial<AuthErrors> = useSelector((state: AppStateType) => state.auth.errors);
    const {emailError, firstNameError, lastNameError, passwordError, password2Error} = errors;
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [captchaValue, setCaptchaValue] = useState<string | null>("");

    useEffect(() => {
        dispatch(formReset());
    }, []);

    useEffect(() => {
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setPassword2("");
        setCaptchaValue("");
    }, [isRegistered]);

    const onClickSignUp = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userRegistrationData: UserRegistration = {email, firstName, lastName, password, password2, captcha: captchaValue}
        dispatch(registration(userRegistrationData));
        // @ts-ignore
        window.grecaptcha.reset();
    };

    const onChangeRecaptcha = (token: string | null): void => {
        setCaptchaValue(token);
    };

    let pageLoading;
    if (loading) {
        pageLoading = (<PageLoader/>);
    }

    return (
        <div className="container mt-5">
            {pageLoading}
            <h4><FontAwesomeIcon className="mr-2" icon={faUserPlus}/> SIGN UP</h4>
            <hr/>
            {isRegistered ? <div className="alert alert-success col-6" role="alert">
                Activation code has been sent to your email!
            </div> : null}
            <form onSubmit={onClickSignUp}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">E-mail: </label>
                    <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faEnvelope}/>
                    <div className="col-sm-4">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            className={emailError ? "form-control is-invalid" : "form-control"}
                            onChange={(event) => setEmail(event.target.value)}/>
                        <div className="invalid-feedback">{emailError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">First name: </label>
                    <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faUser}/>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            className={firstNameError ? "form-control is-invalid" : "form-control"}
                            onChange={(event) => setFirstName(event.target.value)}/>
                        <div className="invalid-feedback">{firstNameError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Last name: </label>
                    <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faUser}/>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            className={lastNameError ? "form-control is-invalid" : "form-control"}
                            onChange={(event) => setLastName(event.target.value)}/>
                        <div className="invalid-feedback">{lastNameError}</div>
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
                            className={passwordError ? "form-control is-invalid" : "form-control"}
                            onChange={(event) => setPassword(event.target.value)}/>
                        <div className="invalid-feedback">{passwordError}</div>
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
                            className={password2Error ? "form-control is-invalid" : "form-control"}
                            onChange={(event) => setPassword2(event.target.value)}/>
                        <div className="invalid-feedback">{password2Error}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-dark mx-3">
                        <FontAwesomeIcon className="mr-2" icon={faUserPlus}/>Sign up
                    </button>
                </div>
                <ReCAPTCHA onChange={onChangeRecaptcha} sitekey="6Lc5cLkZAAAAAN8mFk85HQieB9toPcWFoW0RXCNR"/>
            </form>
        </div>
    );
};

export default Registration;
