import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { faLock, faSync, faUndo } from "@fortawesome/free-solid-svg-icons";

import { fetchResetPasswordCode, resetPassword } from "../../redux/auth/auth-thunks";
import { UserResetPasswordRequest } from "../../types/types";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import Alert from "../../component/Alert/Alert";
import Input from "../../component/Input/Input";
import IconButton from "../../component/IconButton/IconButton";
import { selectErrorMessage, selectErrors, selectUserAuthEmail } from "../../redux/auth/auth-selector";
import { resetAuthState } from "../../redux/auth/auth-actions";

const initialState = {
    password: "",
    password2: ""
};

const ResetPassword: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ code: string }>();
    const history = useHistory();
    const userEmail = useSelector(selectUserAuthEmail);
    const error = useSelector(selectErrorMessage);
    const errors = useSelector(selectErrors);
    const [passwordData, setPasswordData] = useState(initialState);
    const { password, password2 } = passwordData;

    useEffect(() => {
        dispatch(resetAuthState());

        if (params.code) {
            dispatch(fetchResetPasswordCode(params.code));
        }
    }, []);

    const onClickReset = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userResetPasswordData: UserResetPasswordRequest = { email: userEmail, password, password2 };
        dispatch(resetPassword(userResetPasswordData, history));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    return (
        <div className="container mt-5">
            <InfoTitle iconClass={"mr-2"} icon={faSync} title={"RESET PASSWORD"} />
            <hr />
            {error && <Alert alertType={"danger"} message={error} />}
            <form onSubmit={onClickReset}>
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
                <IconButton buttonText={"Reset"} icon={faUndo} iconClassName={"mr-3"} />
            </form>
        </div>
    );
};

export default ResetPassword;
