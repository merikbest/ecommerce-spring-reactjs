import React, {FC, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faLock, faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {AuthErrors, UserResetPasswordData} from "../../../types/types";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {resetForm, updateUserPassword} from "../../../redux/thunks/user-thunks";
import "./ChangePassword.css";

const ChangePassword: FC = () => {
    const dispatch = useDispatch();
    const errors: Partial<AuthErrors> = useSelector((state: AppStateType) => state.user.userResetPasswordErrors);
    const success: string = useSelector((state: AppStateType) => state.user.successMessage);
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const {passwordError, password2Error} = errors;

    useEffect(() => {
        dispatch(resetForm());
    }, []);

    useEffect(() => {
        setPassword("");
        setPassword2("");
    }, [success]);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data: UserResetPasswordData = {email: "", password, password2};
        dispatch(updateUserPassword(data));
    };

    return (
        <div className="password_reset">
            <h4><FontAwesomeIcon className="mr-2" icon={faLock}/> Change Password</h4>
            {success ? <div className="alert alert-success col-6" role="alert">{success}</div> : null}
            <form className="mt-5" onSubmit={onFormSubmit}>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Enter a new password: </label>
                    <div className="col-sm-4">
                        <input
                            type="password"
                            name="password"
                            className={passwordError ? "form-control is-invalid" : "form-control"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}/>
                        <div className="invalid-feedback">{passwordError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Confirm password: </label>
                    <div className="col-sm-4">
                        <input
                            type="password"
                            name="password2"
                            className={password2Error ? "form-control is-invalid" : "form-control"}
                            value={password2}
                            onChange={(event) => setPassword2(event.target.value)}/>
                        <div className="invalid-feedback">{password2Error}</div>
                    </div>
                </div>
                <button type="submit" className="btn btn-dark">
                    <FontAwesomeIcon className="mr-3" icon={faUndo}/>Change
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
