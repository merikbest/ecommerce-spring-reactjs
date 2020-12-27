import React, {useState} from 'react';
import {Link} from "react-router-dom";

import {IMG_URL} from "../../utils/constants/url";
import Spinner from "../Spinner/Spinner";

const PerfumeCardItem = ({perfume, colSize, link, btnName}) => {
    const [load, setLoad] = useState(false);

    return (
        <div className={`col-lg-${colSize} d-flex align-items-stretch`}>
            <div className="card mb-5">
                {load ? null :
                    <div className="d-block mx-auto w-50">
                        <Spinner/>
                    </div>
                }
                <img onLoad={() => setLoad(true)}
                     className="mx-auto w-50"
                     style={{display: load ? "block" : "none"}}
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
    )
}

export default PerfumeCardItem;