import React, { FC, ReactElement } from "react";
import { Divider, Row, Typography } from "antd";

type PropsType = {
    title?: string | number;
};

const Description: FC<PropsType> = ({ title }): ReactElement => {
    return (
        <>
            <Row>
                <Typography.Text>{title}</Typography.Text>
            </Row>
            <Divider style={{ margin: "12px 0px" }} />
        </>
    );
};

export default Description;
