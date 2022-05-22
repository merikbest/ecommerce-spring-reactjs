import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { faEnvelope, faLock, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { registration } from "../../redux/auth/auth-thunks";
import PageLoader from "../../component/PageLoader/PageLoader";
import { UserRegistration } from "../../types/types";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import Alert from "../../component/Alert/Alert";
import IconButton from "../../component/IconButton/IconButton";
import { selectErrors, selectIsAuthLoading, selectIsRegistered } from "../../redux/auth/auth-selector";
import Input from "../../component/Input/Input";
import { resetAuthState } from "../../redux/auth/auth-actions";

const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    password2: ""
};

const Registration: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isRegistered = useSelector(selectIsRegistered);
    const isLoading = useSelector(selectIsAuthLoading);
    const errors = useSelector(selectErrors);

    const [registrationInfo, setRegistrationInfo] = useState(initialState);
    const [captchaValue, setCaptchaValue] = useState<string | null>("");
    const { email, firstName, lastName, password, password2 } = registrationInfo;

    useEffect(() => {
        dispatch(resetAuthState());
    }, []);

    useEffect(() => {
        setRegistrationInfo(initialState);
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
        };
        dispatch(registration(userRegistrationData));
        // @ts-ignore
        window.grecaptcha.reset();
    };

    const onChangeRecaptcha = (token: string | null): void => {
        setCaptchaValue(token);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setRegistrationInfo({ ...registrationInfo, [name]: value });
    };

    let pageLoading;
    if (isLoading) {
        pageLoading = <PageLoader />;
    }

    return (
        <div className="container mt-5">
            {pageLoading}
            <InfoTitle iconClass={"mr-2"} icon={faUserPlus} title={"SIGN UP"} />
            <hr />
            {isRegistered && <Alert alertType={"success"} message={"Activation code has been sent to your email!"} />}
            <form onSubmit={onClickSignUp}>
                <Input
                    title={"E-mail"}
                    icon={faEnvelope}
                    titleClass={"col-sm-2"}
                    wrapperClass={"col-sm-4"}
                    type={"email"}
                    error={errors.emailError}
                    name={"email"}
                    value={email}
                    onChange={handleInputChange}
                />
                <Input
                    title={"First name"}
                    icon={faUser}
                    titleClass={"col-sm-2"}
                    wrapperClass={"col-sm-4"}
                    type={"text"}
                    error={errors.firstNameError}
                    name={"firstName"}
                    value={firstName}
                    onChange={handleInputChange}
                />
                <Input
                    title={"Last name"}
                    icon={faUser}
                    titleClass={"col-sm-2"}
                    wrapperClass={"col-sm-4"}
                    type={"text"}
                    error={errors.lastNameError}
                    name={"lastName"}
                    value={lastName}
                    onChange={handleInputChange}
                />
                <Input
                    title={"Password"}
                    icon={faLock}
                    titleClass={"col-sm-2"}
                    wrapperClass={"col-sm-4"}
                    type={"password"}
                    error={errors.passwordError}
                    name={"password"}
                    value={password}
                    onChange={handleInputChange}
                />
                <Input
                    title={"Confirm password"}
                    icon={faLock}
                    titleClass={"col-sm-2"}
                    wrapperClass={"col-sm-4"}
                    type={"password"}
                    error={errors.password2Error}
                    name={"password2"}
                    value={password2}
                    onChange={handleInputChange}
                />
                <div className="form-group row">
                    <IconButton
                        buttonText={"Sign up"}
                        buttonClassName={"mx-3"}
                        icon={faUserPlus}
                        iconClassName={"mr-3"}
                    />
                </div>
                <ReCAPTCHA onChange={onChangeRecaptcha} sitekey="6Lc5cLkZAAAAAN8mFk85HQieB9toPcWFoW0RXCNR" />
            </form>
        </div>
    );
};

export default Registration;
