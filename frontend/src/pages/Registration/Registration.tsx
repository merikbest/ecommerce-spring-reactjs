import React, {FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {useDispatch, useSelector} from "react-redux";
import {faEnvelope, faLock, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import {formReset, registration} from "../../redux/auth/auth-thunks";
import PageLoader from "../../component/PageLoader/PageLoader";
import {UserRegistration} from "../../types/types";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import Alert from "../../component/Alert/Alert";
import PasswordInput from "../../component/PasswordInput/PasswordInput";
import IconButton from "../../component/IconButton/IconButton";
import {selectErrors, selectIsAuthLoading, selectIsRegistered} from "../../redux/auth/auth-selector";

const Registration: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isRegistered = useSelector(selectIsRegistered);
    const loading = useSelector(selectIsAuthLoading);
    const errors = useSelector(selectErrors);

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
        const userRegistrationData: UserRegistration = {
            email,
            firstName,
            lastName,
            password,
            password2,
            captcha: captchaValue
        }
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
            <InfoTitle iconClass={"mr-2"} icon={faUserPlus} title={"SIGN UP"}/>
            <hr/>
            {isRegistered && <Alert alertType={"success"} message={"Activation code has been sent to your email!"}/>}
            <form onSubmit={onClickSignUp}>
                <PasswordInput
                    title={"E-mail"}
                    icon={faEnvelope}
                    titleClass={"col-sm-2"}
                    type={"email"}
                    error={errors.emailError}
                    name={"email"}
                    value={email}
                    onChange={setEmail}
                />
                <PasswordInput
                    title={"First name"}
                    icon={faUser}
                    titleClass={"col-sm-2"}
                    type={"text"}
                    error={errors.firstNameError}
                    name={"firstName"}
                    value={firstName}
                    onChange={setFirstName}
                />
                <PasswordInput
                    title={"Last name"}
                    icon={faUser}
                    titleClass={"col-sm-2"}
                    type={"text"}
                    error={errors.lastNameError}
                    name={"lastName"}
                    value={lastName}
                    onChange={setLastName}
                />
                <PasswordInput
                    title={"Password"}
                    icon={faLock}
                    titleClass={"col-sm-2"}
                    type={"password"}
                    error={errors.passwordError}
                    name={"password"}
                    value={password}
                    onChange={setPassword}
                />
                <PasswordInput
                    title={"Confirm password"}
                    icon={faLock}
                    titleClass={"col-sm-2"}
                    type={"password"}
                    error={errors.password2Error}
                    name={"password2"}
                    value={password2}
                    onChange={setPassword2}
                />
                <div className="form-group row">
                    <IconButton
                        buttonText={"Sign up"}
                        buttonClassName={"mx-3"}
                        icon={faUserPlus}
                        iconClassName={"mr-3"}
                    />
                </div>
                <ReCAPTCHA onChange={onChangeRecaptcha} sitekey="6Lc5cLkZAAAAAN8mFk85HQieB9toPcWFoW0RXCNR"/>
            </form>
        </div>
    );
};

export default Registration;
