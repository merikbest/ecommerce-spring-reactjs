import React, { FC, ReactElement, useEffect, useState } from "react";
import { Col, Divider, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { LockOutlined, MailOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";

import { selectErrors, selectIsAuthLoading, selectIsRegistered } from "../../redux-toolkit/auth/auth-selector";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import { registration } from "../../redux-toolkit/auth/auth-thunks";
import FormInput from "../../components/FormInput/FormInput";
import IconButton from "../../components/IconButton/IconButton";
import { resetAuthState, setAuthLoadingState } from "../../redux-toolkit/auth/auth-slice";
import { LoadingStatus, UserRegistration } from "../../types/types";

const Registration: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isRegistered = useSelector(selectIsRegistered);
    const isLoading = useSelector(selectIsAuthLoading);
    const errors = useSelector(selectErrors);
    const [captchaValue, setCaptchaValue] = useState<string | null>("");

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setAuthLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAuthState());
        };
    }, []);

    useEffect(() => {
        setCaptchaValue("");
    }, [isRegistered]);

    const onChangeRecaptcha = (token: string | null): void => {
        setCaptchaValue(token);
    };

    const onClickSignIn = (userData: UserRegistration): void => {
        dispatch(registration({ ...userData, captcha: captchaValue }));
        // @ts-ignore
        window.grecaptcha.reset();
    };

    return (
        <ContentWrapper>
            <ContentTitle icon={<UserAddOutlined />} title={"SIGN UP"} />
            <Row gutter={32}>
                <Col span={12}>
                    <Form onFinish={onClickSignIn}>
                        <Divider />
                        <FormInput
                            title={"E-mail:"}
                            icon={<MailOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"email"}
                            error={errors.emailError}
                            placeholder={"E-mail"}
                        />
                        <FormInput
                            title={"First name:"}
                            icon={<UserOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"firstName"}
                            error={errors.firstNameError}
                            placeholder={"First name"}
                        />
                        <FormInput
                            title={"Last name:"}
                            icon={<UserOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"lastName"}
                            error={errors.lastNameError}
                            placeholder={"Last name"}
                        />
                        <FormInput
                            title={"Password:"}
                            icon={<LockOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"password"}
                            error={errors.passwordError}
                            placeholder={"Password"}
                            inputPassword
                        />
                        <FormInput
                            title={"Confirm password:"}
                            icon={<LockOutlined />}
                            titleSpan={8}
                            wrapperSpan={16}
                            name={"password2"}
                            error={errors.password2Error}
                            placeholder={"Confirm password"}
                            inputPassword
                        />
                        <IconButton disabled={isLoading} title={"Sign up"} icon={<UserAddOutlined />} />
                        <Form.Item
                            help={errors.captchaError}
                            validateStatus={errors.captchaError ? "error" : "validating"}
                            style={{ marginTop: 16 }}
                        >
                            <ReCAPTCHA
                                onChange={onChangeRecaptcha}
                                sitekey="6Lc5cLkZAAAAAN8mFk85HQieB9toPcWFoW0RXCNR"
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Registration;
