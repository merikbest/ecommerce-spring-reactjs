import React, {FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {faLock, faSync, faUndo} from "@fortawesome/free-solid-svg-icons";

import {fetchResetPasswordCode, formReset, resetPassword} from "../../redux/auth/auth-thunks";
import {UserResetPasswordData} from "../../types/types";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import Alert from "../../component/Alert/Alert";
import PasswordInput from "../../component/PasswordInput/PasswordInput";
import IconButton from "../../component/IconButton/IconButton";
import {selectErrorMessage, selectErrors, selectUserAuth} from "../../redux/auth/auth-selector";

const ResetPassword: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ code: string }>();
    const history = useHistory();
    const user = useSelector(selectUserAuth);
    const error = useSelector(selectErrorMessage);
    const errors = useSelector(selectErrors);
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    useEffect(() => {
        dispatch(formReset());

        if (params.code) {
            dispatch(fetchResetPasswordCode(params.code));
        }
    }, []);

    const onClickReset = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userResetPasswordData: UserResetPasswordData = {email: user.email, password, password2};
        dispatch(resetPassword(userResetPasswordData, history));
    };

    return (
        <div className="container mt-5">
            <InfoTitle iconClass={"mr-2"} icon={faSync} title={"RESET PASSWORD"}/>
            <hr/>
            {error && <Alert alertType={"danger"} message={error}/>}
            <form onSubmit={onClickReset}>
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
                <IconButton
                    buttonText={"Reset"}
                    icon={faUndo}
                    iconClassName={"mr-3"}
                />
            </form>
        </div>
    );
};

export default ResetPassword;
