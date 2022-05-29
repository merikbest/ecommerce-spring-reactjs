import React, { FC, ReactElement } from "react";
import { Button, Card, Col, Rate, Typography } from "antd";
import Meta from "antd/lib/card/Meta";

import { Perfume } from "../../../types/types";
import "./PerfumeCard.css";

type PropsType = {
    perfume: Perfume;
    colSpan: number;
};

const PerfumeCard: FC<PropsType> = ({ perfume, colSpan }): ReactElement => {
    return (
        <Col span={colSpan}>
            <Card
                className={"perfume-card"}
                cover={<img className={"perfume-card-image"} alt={perfume.perfumeTitle} src={perfume.filename} />}
                actions={[<Button>Show more</Button>]}
                hoverable
            >
                <div className={"perfume-card-rate"}>
                    <Rate defaultValue={5} />
                    <Typography.Text>0 reviews</Typography.Text>
                </div>
                <Meta title={perfume.perfumeTitle} description={perfume.perfumer} style={{ textAlign: "center" }} />
                <Typography.Text className={"perfume-card-price"}>${perfume.price}.00</Typography.Text>
            </Card>
        </Col>
    );
};

export default PerfumeCard;
