import React, { FC, FormEvent, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { faLock, faSync, faUndo } from "@fortawesome/free-solid-svg-icons";

import { UserResetPasswordRequest } from "../../types/types";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import Alert from "../../component/Alert/Alert";
import Input from "../../component/Input/Input";
import IconButton from "../../component/IconButton/IconButton";
import { selectErrorMessage, selectErrors, selectUserAuthEmail } from "../../redux-toolkit/auth/auth-selector";
import { resetAuthState } from "../../redux-toolkit/auth/auth-slice";
import { fetchResetPasswordCode, resetPassword } from "../../redux-toolkit/auth/auth-thunks";
import { useInput } from "../../hooks/useInput";

const ResetPassword: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ code: string }>();
    const history = useHistory();
    const userEmail = useSelector(selectUserAuthEmail);
    const error = useSelector(selectErrorMessage);
    const errors = useSelector(selectErrors);
    const { inputValue, handleInputChange } = useInput({ password: "", password2: "" });
    const { password, password2 } = inputValue;

    useEffect(() => {
        dispatch(resetAuthState());

        if (params.code) {
            dispatch(fetchResetPasswordCode(params.code));
        }
    }, []);

    const onClickReset = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userResetPasswordData: UserResetPasswordRequest = { email: userEmail, password, password2 };
        dispatch(resetPassword({ request: userResetPasswordData, history }));
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
