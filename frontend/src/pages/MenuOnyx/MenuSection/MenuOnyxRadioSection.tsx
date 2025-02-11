import React, { FC, ReactElement } from "react";
import { Radio, RadioChangeEvent, Row, Typography } from "antd";

import { PerfumePrice } from "../../../types/types";

type PropsType = {
    title: string;
    onChange: (event: RadioChangeEvent) => void;
    data: Array<PerfumePrice>;
};

const MenuRadioSection: FC<PropsType> = ({ title, onChange, data }): ReactElement => {
    return (
        <div>
            <Typography.Title level={5} style={{ marginTop: 8 }}>
                {title}
            </Typography.Title>
            <Radio.Group onChange={onChange}>
                {data.map((value, index) => (
                    <Row key={index}>
                        <Radio value={value.array}>{value.name}</Radio>
                    </Row>
                ))}
            </Radio.Group>
        </div>
    );
};

export default MenuRadioSection;
