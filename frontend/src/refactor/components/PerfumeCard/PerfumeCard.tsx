import React, { FC, ReactElement } from "react";
import { Button, Card, Col, Rate, Typography } from "antd";
import { Link } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Perfume } from "../../../types/types";
import { ACCOUNT_ADMIN_PERFUMES, PRODUCT } from "../../../constants/routeConstants";
import "./PerfumeCard.css";

type PropsType = {
    perfume: Perfume;
    colSpan: number;
    edit?: boolean;
    onOpenDelete?: (perfume: Perfume) => void;
};

const PerfumeCard: FC<PropsType> = ({ perfume, colSpan, edit, onOpenDelete }): ReactElement => {
    return (
        <Col span={colSpan}>
            <Card
                className={"perfume-card"}
                cover={<img className={"perfume-card-image"} alt={perfume.perfumeTitle} src={perfume.filename} />}
                hoverable
                actions={
                    edit
                        ? [
                              <Link to={`${ACCOUNT_ADMIN_PERFUMES}/${perfume.id}`}>
                                  <Button icon={<EditOutlined />}>Edit</Button>
                              </Link>,
                              <Button icon={<DeleteOutlined />} onClick={() => onOpenDelete!(perfume)} danger>
                                  Delete
                              </Button>
                          ]
                        : [
                              <Link to={`${PRODUCT}/${perfume.id}`}>
                                  <Button>Show more</Button>
                              </Link>
                          ]
                }
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
