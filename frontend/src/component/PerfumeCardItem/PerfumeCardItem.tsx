import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Perfume } from "../../types/types";
import StarRating from "../StarRating/StarRating";
import "./PerfumeCardItem.css";

type PropsType = {
    key: number;
    perfume: Perfume;
    colSize: number;
    link: string;
    btnName: string;
};

const PerfumeCardItem: FC<PropsType> = ({ key, perfume, colSize, link, btnName }): ReactElement => {
    return (
        <div key={key} className={`col-lg-${colSize}`}>
            <div className="card mb-5 perfume_card_item_wrapper">
                <div className="perfume_card_item_image_wrapper">
                    <LazyLoadImage className="perfume_card_item_image" effect="blur" src={perfume.filename} />
                </div>
                <div className="card-body text-center">
                    <StarRating perfumeRating={perfume.perfumeRating} />
                    <h6>{perfume.perfumeTitle}</h6>
                    <h6>{perfume.perfumer}</h6>
                    <h6>
                        <span>${perfume.price}</span>.00
                    </h6>
                </div>
                <div className="text-center align-items-end mb-3">
                    <Link to={`${link}/${perfume.id}`}>
                        <span className="btn btn-dark">{btnName}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PerfumeCardItem;
