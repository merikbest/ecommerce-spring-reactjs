import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faEnvelope, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import { activateAccount, login } from "../../redux/auth/auth-thunks";
import { UserData } from "../../types/types";
import googleLogo from "../../img/google.png";
import facebookLogo from "../../img/facebook.png";
import githubLogo from "../../img/github.png";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import Alert from "../../component/Alert/Alert";
import Input from "../../component/EditInput/Input";
import IconButton from "../../component/IconButton/IconButton";
import SocialButton from "./SocialButton/SocialButton";
import { selectErrorMessage, selectSuccessMessage } from "../../redux/auth/auth-selector";
import { formReset } from "../../redux/admin/admin-actions";
import { FORGOT } from "../../constants/routeConstants";
import "./Login.css";

const initialState = {
    email: "",
    password: ""
};

const Login: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ code: string }>();
    const errorMessage = useSelector(selectErrorMessage);
    const successMessage = useSelector(selectSuccessMessage);
    const [loginInfo, setLoginInfo] = useState(initialState);
    const { email, password } = loginInfo;

    useEffect(() => {
        dispatch(formReset());

        if (params.code) {
            dispatch(activateAccount(params.code));
        }
    }, []);

    const onClickSignIn = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userData: UserData = { email, password };
        dispatch(login(userData, history));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    return (
        <div id="container" className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <InfoTitle iconClass={"mr-3"} icon={faSignInAlt} title={"SIGN IN"} />
                    <hr />
                    {errorMessage && <Alert alertType={"danger"} message={errorMessage} />}
                    {successMessage && <Alert alertType={"success"} message={successMessage} />}
                    <form onSubmit={onClickSignIn}>
                        <Input
                            title={"E-mail"}
                            titleClass={"col-sm-4"}
                            wrapperClass={"col-sm-7"}
                            icon={faEnvelope}
                            type={"email"}
                            name={"email"}
                            value={email}
                            onChange={handleInputChange}
                        />
                        <Input
                            title={"Password"}
                            titleClass={"col-sm-4"}
                            wrapperClass={"col-sm-7"}
                            icon={faLock}
                            type={"password"}
                            name={"password"}
                            value={password}
                            onChange={handleInputChange}
                        />
                        <div className="form-group row">
                            <IconButton
                                buttonText={"Sign in"}
                                buttonClassName={"mx-2"}
                                icon={faSignInAlt}
                                iconClassName={"mr-3"}
                            />
                            <Link to={FORGOT} className="forgot-password">
                                Forgot password?
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-6 mt-5">
                    <SocialButton socialNetwork={"google"} image={googleLogo} />
                    <SocialButton socialNetwork={"facebook"} image={facebookLogo} />
                    <SocialButton socialNetwork={"github"} image={githubLogo} />
                </div>
            </div>
        </div>
    );
};

export default Login;
