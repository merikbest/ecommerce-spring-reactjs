import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import {IMG_URL} from "../../utils/constants/url";
import {Perfume} from "../../types/types";

type PropsType = {
    perfume: Perfume
    colSize: number
    link: string
    btnName: string
};

const PerfumeCardItem: FC<PropsType> = ({perfume, colSize, link, btnName}) => {
    return (
        <div className={`col-lg-${colSize}`}>
            <div className="card mb-5" style={{height: "293px"}}>
                <LazyLoadImage
                    effect="blur"
                    className="d-block mx-auto"
                    style={{width: "89px", height: "89px"}}
                    src={IMG_URL + `${perfume.filename}`}/>
                <div className="card-body text-center">
                    <h5>{perfume.perfumeTitle}</h5>
                    <h6>{perfume.perfumer}</h6>
                    <h6><span>${perfume.price}</span>.00</h6>
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
