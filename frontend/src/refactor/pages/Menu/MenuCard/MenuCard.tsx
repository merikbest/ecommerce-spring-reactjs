import React, { FC, ReactElement } from "react";
import { Button, Card, Col, Rate, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import "antd/dist/antd.css";

import { Perfume } from "../../../../types/types";
import "./MenuCard.css";

type PropsType = {
    perfume: Perfume;
};

const MenuCard: FC<PropsType> = ({ perfume }): ReactElement => {
    return (
        <Col span={8}>
            <Card
                className={"menu-card"}
                cover={<img className={"menu-card-image"} alt={perfume.perfumeTitle} src={perfume.filename} />}
                actions={[<Button>Show more</Button>]}
                hoverable
            >
                <div className={"menu-card-rate"}>
                    <Rate defaultValue={5} style={{ fontSize: 12 }} />
                    <Typography.Text>0 reviews</Typography.Text>
                </div>
                <Meta title={perfume.perfumeTitle} description={perfume.perfumer} style={{ textAlign: "center" }} />
                <Typography.Text className={"menu-card-price"}>${perfume.price}.00</Typography.Text>
            </Card>
        </Col>
    );
};

export default MenuCard;
