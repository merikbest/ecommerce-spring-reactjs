import React, { FC, ReactElement, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Divider, Form, Row, Space } from "antd";
import { LockOutlined, LoginOutlined, MailOutlined } from "@ant-design/icons";

import googleLogo from "../../img/google.png";
import facebookLogo from "../../img/facebook.png";
import githubLogo from "../../img/github.png";
import { selectErrorMessage } from "../../redux-toolkit/auth/auth-selector";
import { resetAuthState } from "../../redux-toolkit/auth/auth-slice";
import { activateAccount, login } from "../../redux-toolkit/auth/auth-thunks";
import { selectSuccessMessage } from "../../redux-toolkit/user/user-selector";
import { FORGOT } from "../../constants/routeConstants";
import SocialButton from "./SocialButton/SocialButton";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import FormInput from "../../components/FormInput/FormInput";
import IconButton from "../../components/IconButton/IconButton";
import "./Login.css";

const Login: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ code: string }>();
    const errorMessage = useSelector(selectErrorMessage);
    const successMessage = useSelector(selectSuccessMessage);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        if (params.code) {
            dispatch(activateAccount(params.code));
        }

        return () => {
            dispatch(resetAuthState());
        };
    }, []);

    const onClickSignIn = (userData: { email: ""; password: "" }): void => {
        dispatch(login({ userData, history }));
    };

    return (
        <ContentWrapper>
            <ContentTitle icon={<LoginOutlined />} title={"SIGN IN"} />
            <Row gutter={32}>
                <Col span={12}>
                    <Form onFinish={onClickSignIn}>
                        <Divider />
                        {errorMessage && <Alert type="error" message={errorMessage} />}
                        {successMessage && <Alert type="success" message={successMessage} />}
                        <FormInput
                            title={"E-mail:"}
                            icon={<MailOutlined />}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"email"}
                            placeholder={"E-mail"}
                        />
                        <FormInput
                            title={"Password:"}
                            icon={<LockOutlined />}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"password"}
                            placeholder={"Password"}
                            inputPassword
                        />
                        <Space align={"baseline"} size={13}>
                            <IconButton title={"Sign in"} icon={<LoginOutlined />} />
                            <Link to={FORGOT}>Forgot password?</Link>
                        </Space>
                    </Form>
                </Col>
                <Col span={12}>
                    <Space direction={"vertical"} className={"social-login-wrapper"}>
                        <SocialButton socialNetwork={"google"} image={googleLogo} />
                        <SocialButton socialNetwork={"facebook"} image={facebookLogo} />
                        <SocialButton socialNetwork={"github"} image={githubLogo} />
                    </Space>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Login;
