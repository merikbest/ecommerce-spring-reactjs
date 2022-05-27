import React, { FC, FormEvent, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faLock, faUndo } from "@fortawesome/free-solid-svg-icons";

import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import Alert from "../../../component/Alert/Alert";
import IconButton from "../../../component/IconButton/IconButton";
import Input from "../../../component/Input/Input";
import { selectSuccessMessage, selectUserResetPasswordErrors } from "../../../redux-toolkit/user/user-selector";
import { resetInputForm } from "../../../redux-toolkit/user/user-slice";
import { updateUserPassword } from "../../../redux-toolkit/user/user-thunks";
import { useInput } from "../../../hooks/useInput";
import "./ChangePassword.css";

const initialState = {
    password: "",
    password2: ""
};

const ChangePassword: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const errors = useSelector(selectUserResetPasswordErrors);
    const successMessage = useSelector(selectSuccessMessage);
    const { inputValue, setInputValue, handleInputChange } = useInput(initialState);
    const { passwordError, password2Error } = errors;
    const { password, password2 } = inputValue;

    useEffect(() => {
        dispatch(resetInputForm());
    }, []);

    useEffect(() => {
        setInputValue(initialState);
    }, [successMessage]);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(updateUserPassword({ email: "", password, password2 }));
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
