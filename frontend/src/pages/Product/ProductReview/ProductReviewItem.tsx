import React, { FC, ReactElement } from "react";
import StarRatingComponent from "react-star-rating-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { Review } from "../../../types/types";

type PropType = {
    review: Review;
};

const ProductReviewItem: FC<PropType> = ({ review }): ReactElement => {
    return (
        <div key={review.id}>
            <div className="form row mt-5">
                <div className="col-md-3">
                    <p>
                        <b>{review.author}</b>
                    </p>
                    <p>{review.date}</p>
                    <StarRatingComponent
                        name="star"
                        value={review.rating}
                        renderStarIcon={() => <FontAwesomeIcon className="fa-sm" icon={faStar} />}
                        starCount={5}
                        editing={false}
                    />
                </div>
                <div className="col-md-9">
                    <p>{review.message}</p>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default ProductReviewItem;
