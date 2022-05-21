import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import StarRating from "../../StarRating/StarRating";
import { Perfume } from "../../../types/types";
import { PRODUCT } from "../../../constants/routeConstants";

type PropsType = {
    perfume: Perfume;
};

const PerfumeCardSliderItem: FC<PropsType> = ({ perfume }): ReactElement => {
    return (
        <div className="card" key={perfume.id}>
            <div className={"perfume_card_item_image_wrapper"}>
                <img className={"perfume_card_item_image"} src={perfume.filename} />
            </div>
            <div className="card-body text-center">
                <h5>{perfume.perfumeTitle}</h5>
                <h6>{perfume.perfumer}</h6>
                <StarRating perfumeRating={perfume.perfumeRating} />
                <h6>
                    $<span>{perfume.price}</span>.00
                </h6>
                <Link to={`${PRODUCT}/${perfume.id}`}>
                    <span className="btn btn-dark">SHOW MORE</span>
                </Link>
            </div>
        </div>
    );
};

export default PerfumeCardSliderItem;
