import React, { FC, ReactElement } from "react";
import { Col, Row, Typography } from "antd";

type PropsType = {
    errorMessage: string;
};

const ErrorMessage: FC<PropsType> = ({ errorMessage }): ReactElement => {
    return (
        <Row>
            <Col span={24} style={{ textAlign: "center" }}>
                <Typography.Title level={3}>{errorMessage}</Typography.Title>
            </Col>
        </Row>
    );
};

export default ErrorMessage;
