import React, {FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faLock, faUndo} from "@fortawesome/free-solid-svg-icons";

import {AuthErrors, UserResetPasswordData} from "../../../types/types";
import {updateUserPassword} from "../../../redux/user/user-thunks";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import Alert from "../../../component/Alert/Alert";
import IconButton from "../../../component/IconButton/IconButton";
import PasswordInput from "../../../component/PasswordInput/PasswordInput";
import {selectSuccessMessage, selectUserResetPasswordErrors} from "../../../redux/user/user-selector";
import {resetInputForm} from "../../../redux/user/user-actions";
import "./ChangePassword.css";

const ChangePassword: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const errors: Partial<AuthErrors> = useSelector(selectUserResetPasswordErrors);
    const successMessage = useSelector(selectSuccessMessage);
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const {passwordError, password2Error} = errors;

    useEffect(() => {
        dispatch(resetInputForm());
    }, []);

    useEffect(() => {
        setPassword("");
        setPassword2("");
    }, [successMessage]);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data: UserResetPasswordData = {email: "", password, password2};
        dispatch(updateUserPassword(data));
    };

    return (
        <div className="password_reset">
            <InfoTitle iconClass={"mr-2"} icon={faLock} title={"Change Password"}/>
            {successMessage && <Alert alertType={"success"} message={successMessage}/>}
            <form className="mt-5" onSubmit={onFormSubmit}>
                <PasswordInput
                    title={"Enter a new password"}
                    titleClass={"col-sm-3"}
                    type={"password"}
                    error={passwordError}
                    name={"password"}
                    value={password}
                    onChange={setPassword}
                />
                <PasswordInput
                    title={"Confirm password"}
                    titleClass={"col-sm-3"}
                    type={"password"}
                    error={password2Error}
                    name={"password2"}
                    value={password2}
                    onChange={setPassword2}
                />
                <IconButton
                    buttonText={"Change"}
                    icon={faUndo}
                    iconClassName={"mr-3"}
                />
            </form>
        </div>
    );
};

export default ChangePassword;
