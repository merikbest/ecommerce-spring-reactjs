import React, { FC, ReactElement } from "react";
import StarRatingComponent from "react-star-rating-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import halfStar from "../../img/star-half.svg";
import "./StarRating.css";

const StarRating: FC<{ perfumeRating: number }> = ({ perfumeRating }): ReactElement => {
    return (
        <StarRatingComponent
            renderStarIconHalf={() => <img src={halfStar} alt="halfStar" className={"icon"} />}
            renderStarIcon={() => <FontAwesomeIcon className="fa-xs" icon={faStar} />}
            name={"star"}
            starCount={5}
            editing={false}
            value={perfumeRating === 0 ? 5 : perfumeRating}
        />
    );
};

export default StarRating;
