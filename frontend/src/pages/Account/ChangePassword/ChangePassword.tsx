import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faLock, faUndo } from "@fortawesome/free-solid-svg-icons";

import { UserResetPasswordRequest } from "../../../types/types";
import { updateUserPassword } from "../../../redux/user/user-thunks";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import Alert from "../../../component/Alert/Alert";
import IconButton from "../../../component/IconButton/IconButton";
import Input from "../../../component/Input/Input";
import { selectSuccessMessage, selectUserResetPasswordErrors } from "../../../redux/user/user-selector";
import { resetInputForm } from "../../../redux/user/user-actions";
import "./ChangePassword.css";

const initialState = {
    password: "",
    password2: ""
};

const ChangePassword: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const errors = useSelector(selectUserResetPasswordErrors);
    const successMessage = useSelector(selectSuccessMessage);
    const [passwords, setPasswords] = useState(initialState);
    const { passwordError, password2Error } = errors;
    const { password, password2 } = passwords;

    useEffect(() => {
        dispatch(resetInputForm());
    }, []);

    useEffect(() => {
        setPasswords(initialState);
    }, [successMessage]);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data: UserResetPasswordRequest = { email: "", password, password2 };
        dispatch(updateUserPassword(data));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setPasswords({ ...passwords, [name]: value });
    };

    return (
        <div className="password_reset">
            <InfoTitle iconClass={"mr-2"} icon={faLock} title={"Change Password"} />
            {successMessage && <Alert alertType={"success"} message={successMessage} />}
            <form className="mt-5" onSubmit={onFormSubmit}>
                <Input
                    title={"Enter a new password"}
                    titleClass={"col-sm-3"}
                    wrapperClass={"col-sm-4"}
                    type={"password"}
                    error={passwordError}
                    name={"password"}
                    value={password}
                    onChange={handleInputChange}
                />
                <Input
                    title={"Confirm password"}
                    titleClass={"col-sm-3"}
                    wrapperClass={"col-sm-4"}
                    type={"password"}
                    error={password2Error}
                    name={"password2"}
                    value={password2}
                    onChange={handleInputChange}
                />
                <IconButton buttonText={"Change"} icon={faUndo} iconClassName={"mr-3"} />
            </form>
        </div>
    );
};

export default ChangePassword;
