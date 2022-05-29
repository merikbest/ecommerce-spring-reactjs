import React, { FC, ReactElement } from "react";
import { Row } from "antd";

import PerfumeCard from "../../../../components/PerfumeCard/PerfumeCard";
import { Perfume } from "../../../../../types/types";

type PropsType = {
    perfumes: Array<Perfume>;
};

const PerfumeCardsSliderItem: FC<PropsType> = ({ perfumes }): ReactElement => {
    return (
        <Row gutter={[16, 16]} style={{ margin: 10, marginTop: 10, marginBottom: 10 }}>
            {perfumes.slice(0, 4).map((perfume) => (
                <PerfumeCard key={perfume.id} perfume={perfume} colSpan={6} />
            ))}
        </Row>
    );
};

export default PerfumeCardsSliderItem;
