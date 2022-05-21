import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import StarRating from "../../../../component/StarRating/StarRating";
import { Perfume } from "../../../../types/types";
import { ACCOUNT_ADMIN_PERFUMES } from "../../../../constants/routeConstants";

type PropsType = {
    perfume: Perfume;
    showDeleteModalWindow: (perfume: Perfume) => void;
};

const PerfumeListItem: FC<PropsType> = ({ perfume, showDeleteModalWindow }): ReactElement => {
    return (
        <div key={perfume.id} className="col-lg-3">
            <div className="card mb-5 perfume_list_item_wrapper">
                <div className="perfume_list_item_image_wrapper">
                    <LazyLoadImage className="perfume_list_item_image" effect="blur" src={perfume.filename} />
                </div>
                <div className="card-body text-center">
                    <StarRating perfumeRating={perfume.perfumeRating} />
                    <h6>{perfume.perfumeTitle}</h6>
                    <h6>{perfume.perfumer}</h6>
                    <h6>
                        <span>${perfume.price}</span>.00
                    </h6>
                </div>
                <div className="btn-group text-center mb-3">
                    <Link type="button" className="btn btn-dark ml-2" to={`${ACCOUNT_ADMIN_PERFUMES}/${perfume.id}`}>
                        <FontAwesomeIcon className="fa-xs" icon={faEdit} /> Edit
                    </Link>
                    <button className="btn btn-warning mr-2" onClick={() => showDeleteModalWindow(perfume)}>
                        <FontAwesomeIcon className="fa-xs" icon={faTrash} /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PerfumeListItem;
