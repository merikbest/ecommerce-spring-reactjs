import { Col, Row } from "antd";
import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import { MENU } from "../../../../constants/routeConstants";
import "./SliderBrandsItem.css";

export type BrandType = {
    name: string;
    url: string;
};

type PropsType = {
    brands: Array<BrandType>;
};

const SliderBrandsItem: FC<PropsType> = ({ brands }): ReactElement => {
    return (
        <Row>
            {brands.map((brand: BrandType, index: number) => (
                <Col span={4} key={index} className={"slider-brand-item"}>
                    <Link className={"slider-brand-item-link"} to={{ pathname: MENU, state: { id: brand.name } }} />
                    <img style={{ width: "80%" }} src={brand.url} alt={brand.name} />
                </Col>
            ))}
        </Row>
    );
};

export default SliderBrandsItem;
