import React, { FC, ReactElement, ReactNode } from "react";
import { Col, Form, Input, Row, Typography } from "antd";
import { Rule } from "antd/lib/form";

import "./FormInput.css";

type PropsType = {
    title: string;
    icon?: ReactNode;
    titleSpan: number;
    wrapperSpan: number;
    name: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    rule?: Rule[];
    inputPassword?: boolean;
};

const FormInput: FC<PropsType> = ({
    title,
    icon,
    titleSpan,
    wrapperSpan,
    name,
    error,
    placeholder,
    disabled,
    rule,
    inputPassword
}): ReactElement => {
    return (
        <Row className={"form-item"}>
            <Col span={titleSpan}>
                <Typography.Text>{title}</Typography.Text>
                {icon}
            </Col>
            <Col span={wrapperSpan}>
                <Form.Item name={name} help={error} validateStatus={error && "error"} rules={rule}>
                    {inputPassword ? (
                        <Input.Password disabled={disabled} placeholder={placeholder} />
                    ) : (
                        <Input disabled={disabled} placeholder={placeholder} />
                    )}
                </Form.Item>
            </Col>
        </Row>
    );
};

export default FormInput;
