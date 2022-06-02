import React, { FC, ReactElement } from "react";
import { Col, Row, Typography } from "antd";

type PropsType = {
    title: string;
    text?: string | string[] | number;
};

const AccountDataItem: FC<PropsType> = ({ title, text }): ReactElement => {
    return (
        <Row style={{ marginBottom: 8 }}>
            <Col span={8}>
                <Typography.Text strong>{title}</Typography.Text>
            </Col>
            <Col span={12}>
                <Typography.Text>{text}</Typography.Text>
            </Col>
        </Row>
    );
};

export default AccountDataItem;
