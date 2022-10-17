import React, { FC, ReactElement, useEffect, useState } from "react";
import { Card, Col, InputNumber, Row, Typography } from "antd";

import { PerfumeResponse } from "../../../types/types";
import RemoveButton from "./RemoveButton";
import CartItemInfo from "./CartItemInfo";

type PropsType = {
    perfume: PerfumeResponse;
    perfumeInCart: number;
    onChangePerfumeItemCount: (perfumeId: number, inputValue: number) => void;
    deleteFromCart: (perfumeId: number) => void;
};

const CartItem: FC<PropsType> = ({
    perfume,
    perfumeInCart,
    onChangePerfumeItemCount,
    deleteFromCart
}): ReactElement => {
    const [perfumeCount, setPerfumeCount] = useState(1);

    useEffect(() => {
        setPerfumeCount(perfumeInCart);
    }, []);

    const handlePerfumesCount = (value: number | null): void => {
        setPerfumeCount(value!);
        onChangePerfumeItemCount(perfume.id, value!);
    };

    return (
        <Card className={"cart-item"}>
            <Row gutter={16}>
                <CartItemInfo perfume={perfume} />
                <Col span={8}>
                    <Row gutter={8}>
                        <Col span={12}>
                            <InputNumber
                                min={1}
                                max={99}
                                value={perfumeCount}
                                onChange={handlePerfumesCount}
                            />
                        </Col>
                        <Col span={12}>
                            <RemoveButton perfumeId={perfume.id} deleteFromCart={deleteFromCart} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Typography.Title level={4}>${perfume.price * perfumeCount}</Typography.Title>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default CartItem;
