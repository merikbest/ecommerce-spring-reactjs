import React, { FC, ReactElement } from "react";
import { Form, Input, Typography } from "antd";

type PropsType = {
    title: string;
    name: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
};

const AddFormInput: FC<PropsType> = ({ title, name, error, placeholder, disabled }): ReactElement => {
    return (
        <div>
            <Typography.Text>{title}</Typography.Text>
            <Form.Item name={name} help={error} validateStatus={error && "error"}>
                <Input disabled={disabled} placeholder={placeholder} />
            </Form.Item>
        </div>
    );
};

export default AddFormInput;
