import React, { FC, ReactElement } from "react";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";

import "./Footer.scss";

const Footer: FC = (): ReactElement => {
    return (
        <div className={"footer-wrapper"}>
            <Row >
                <Col span={12}>
                    <Typography.Title level={3}>Може да ни намерите на: Кв.Манастирски Ливади Ул.Казбек 57</Typography.Title>

                    <Typography.Text>(+359) 897631393</Typography.Text>
                    <Typography.Text className={"mt-12"}>От 08:00 до 20:00 без Неделя.</Typography.Text>
                </Col>
                <Col span={12} >
                    <div className={"footer-wrapper-social"}>
                        <Typography.Title level={3}>Социални Мрежи</Typography.Title>
                            <a href="#">
                            <FacebookOutlined />
                        </a>
                             <a href="#">
                            <InstagramOutlined />
                        </a>
                        <a href="#">
                            <TwitterOutlined />
                        </a>
                    </div>
                </Col>
            </Row>
            <Row className={"footer-wrapper-copyright"}>
                <Typography.Text>© Авторско право © 2025 MagicCrystals</Typography.Text>
            </Row>
        </div>
    );
};

export default Footer;
