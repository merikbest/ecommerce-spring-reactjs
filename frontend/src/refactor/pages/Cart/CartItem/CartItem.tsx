import React, { FC, ReactElement } from "react";
import { Button, Card, Col, InputNumber, Row, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { Perfume } from "../../../../types/types";

type PropsType = {
    perfume: Perfume;
    perfumeInCart: Map<any, any>;
    onChangePerfumeItemCount: (perfumeId: number, inputValue: number) => void;
    deleteFromCart: (perfumeId: number) => void;
};

const CartItem: FC<PropsType> = ({
    perfume,
    perfumeInCart,
    onChangePerfumeItemCount,
    deleteFromCart
}): ReactElement => {
    return (
        <Card className={"cart-item"}>
            <Row gutter={16}>
                <Col span={8} className={"cart-item-image"}>
                    <img src={perfume.filename} alt={perfume.perfumeTitle} style={{ height: 100 }} />
                </Col>
                <Col span={8}>
                    <Typography.Title level={3}>{perfume.perfumer}</Typography.Title>
                    <Typography.Title level={5}>{perfume.perfumeTitle}</Typography.Title>
                    <Typography.Text strong>{perfume.volume} ml.</Typography.Text>
                </Col>
                <Col span={8}>
                    <Row gutter={8}>
                        <Col span={12}>
                            <InputNumber
                                min={1}
                                max={99}
                                value={perfumeInCart.get(perfume.id)}
                                onChange={(value) => onChangePerfumeItemCount(perfume.id, value)}
                            />
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => deleteFromCart(perfume.id)} icon={<CloseOutlined />}>
                                Remove
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Typography.Title level={4}>${perfume.price * perfumeInCart.get(perfume.id)}</Typography.Title>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default CartItem;
