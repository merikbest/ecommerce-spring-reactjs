import React, { FC, ReactElement } from "react";
import { Col, Form, Row, Select, Typography } from "antd";

type PropsType = {
    title: string;
    name: string;
    error?: string;
    placeholder: string;
    disabled: boolean;
    values: Array<string>;
};

const EditPerfumeSelect: FC<PropsType> = ({ title, name, error, placeholder, disabled, values }): ReactElement => {
    return (
        <Row className={"form-item"}>
            <Col span={6}>
                <Typography.Text>{title}</Typography.Text>
            </Col>
            <Col span={18}>
                <Form.Item name={name} help={error} validateStatus={error && "error"}>
                    <Select placeholder={placeholder} disabled={disabled} style={{ width: "100%" }}>
                        {values.map((option, index) => (
                            <Select.Option key={index} value={option}>
                                {option}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
        </Row>
    );
};

export default EditPerfumeSelect;
