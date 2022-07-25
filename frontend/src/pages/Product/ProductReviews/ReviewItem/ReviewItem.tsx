import React, { FC, ReactElement } from "react";
import {Col, Divider, Rate, Row, Typography} from "antd";

import { ReviewResponse } from "../../../../types/types";

type PropType = {
    review: ReviewResponse;
};

const ReviewItem: FC<PropType> = ({ review }): ReactElement => {
    return (
        <Row>
            <Col span={4}>
                <div>
                    <Typography.Text strong>{review.author}</Typography.Text>
                </div>
                <div>
                    <Typography.Text>{review.date}</Typography.Text>
                </div>
                <div>
                    <Rate disabled value={review.rating} />
                </div>
            </Col>
            <Col span={12}>
                <Typography.Text>{review.message}</Typography.Text>
            </Col>
            <Divider />
        </Row>
    );
};

export default ReviewItem;
