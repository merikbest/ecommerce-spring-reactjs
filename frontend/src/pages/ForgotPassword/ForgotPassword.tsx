import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faEnvelope, faKey, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { forgotPassword } from "../../redux/auth/auth-thunks";
import { validateEmail } from "../../utils/input-validators";
import PageLoader from "../../component/PageLoader/PageLoader";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import Alert from "../../component/Alert/Alert";
import Input from "../../component/Input/Input";
import IconButton from "../../component/IconButton/IconButton";
import { selectErrorMessage, selectIsAuthLoading, selectSuccessMessage } from "../../redux/auth/auth-selector";
import { resetAuthState } from "../../redux/auth/auth-actions";

const ForgotPassword: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const error = useSelector(selectErrorMessage);
    const success = useSelector(selectSuccessMessage);
    const isLoading = useSelector(selectIsAuthLoading);
    const [email, setEmail] = useState<string>("");
    const [validateEmailError, setValidateEmailError] = useState<string>("");

    useEffect(() => {
        dispatch(resetAuthState());
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
            dispatch(forgotPassword(email));
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    let pageLoading;

    if (isLoading) {
        pageLoading = <PageLoader />;
    }

    return (
        <div id="container" className="container mt-5">
            {pageLoading}
            <InfoTitle iconClass={"mr-3"} icon={faKey} title={"FORGOT PASSWORD?"} />
            <hr />
            <p>Enter your email address that you used to create your account.</p>
            {error && <Alert alertType={"danger"} message={error} />}
            {success && <Alert alertType={"success"} message={success} />}
            <form onSubmit={onClickSend}>
                <Input
                    title={"E-mail"}
                    titleClass={"col-sm-2"}
                    wrapperClass={"col-sm-4"}
                    icon={faEnvelope}
                    type={"email"}
                    error={validateEmailError}
                    name={"email"}
                    value={email}
                    onChange={handleInputChange}
                />
                <IconButton buttonText={"Send"} icon={faPaperPlane} iconClassName={"mr-3"} />
            </form>
        </div>
    );
};

export default ForgotPassword;
