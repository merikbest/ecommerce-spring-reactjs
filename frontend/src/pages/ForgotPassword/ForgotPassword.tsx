import React, {FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faEnvelope, faKey, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

import {forgotPassword, formReset} from "../../redux/auth/auth-thunks";
import {validateEmail} from "../../utils/input-validators";
import PageLoader from "../../component/PageLoader/PageLoader";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import Alert from "../../component/Alert/Alert";
import PasswordInput from "../../component/PasswordInput/PasswordInput";
import IconButton from "../../component/IconButton/IconButton";
import {selectErrorMessage, selectIsAuthLoading, selectSuccessMessage} from "../../redux/auth/auth-selector";

const ForgotPassword: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const error = useSelector(selectErrorMessage);
    const success = useSelector(selectSuccessMessage);
    const loading = useSelector(selectIsAuthLoading);
    const [email, setEmail] = useState<string>("");
    const [validateEmailError, setValidateEmailError] = useState<string>("");

    useEffect(() => {
        dispatch(formReset());
    }, []);

    useEffect(() => {
        setEmail("");
    }, [success]);

    const onClickSend = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const validateEmailError: string = validateEmail(email);

        if (validateEmailError) {
            setValidateEmailError(validateEmailError);
        } else {
            dispatch(forgotPassword({email: email}));
        }
    };

    let pageLoading;

    if (loading) {
        pageLoading = (<PageLoader/>);
    }

    return (
        <div id="container" className="container mt-5">
            {pageLoading}
            <InfoTitle iconClass={"mr-3"} icon={faKey} title={"FORGOT PASSWORD?"}/>
            <hr/>
            <p>
                Enter your email address that you used to create your account.
            </p>
            {error && <Alert alertType={"danger"} message={error}/>}
            {success && <Alert alertType={"success"} message={success}/>}
            <form onSubmit={onClickSend}>
                <PasswordInput
                    title={"E-mail"}
                    titleClass={"col-sm-2"}
                    icon={faEnvelope}
                    type={"email"}
                    error={validateEmailError}
                    name={"email"}
                    value={email}
                    onChange={setEmail}
                />
                <IconButton
                    buttonText={"Send"}
                    icon={faPaperPlane}
                    iconClassName={"mr-3"}
                />
            </form>
        </div>
    );
};

export default ForgotPassword;
