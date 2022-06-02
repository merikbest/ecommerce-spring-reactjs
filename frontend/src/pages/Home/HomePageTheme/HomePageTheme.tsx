import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

import { MENU } from "../../../constants/routeConstants";
import "./HomePageTheme.css";

const HomePageTheme: FC = (): ReactElement => {
    return (
        <div className={"page-theme"}>
            <Row gutter={32}>
                <Col span={12}>
                    <Link to={{ pathname: MENU, state: { id: "female" } }}>
                        <img src="https://i.ibb.co/jMmJs60/Them-Woman-ENG.jpg" alt={"female"} />
                    </Link>
                </Col>
                <Col span={12}>
                    <Link to={{ pathname: MENU, state: { id: "male" } }}>
                        <img src="https://i.ibb.co/mJGKz8c/Them-Man-ENG.jpg" alt={"male"} />
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default HomePageTheme;
