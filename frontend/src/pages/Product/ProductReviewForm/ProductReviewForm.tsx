import React, { FC, FormEvent, ReactElement } from "react";
import StarRatingComponent from "react-star-rating-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faStar } from "@fortawesome/free-solid-svg-icons";

import IconButton from "../../../component/IconButton/IconButton";
import { ReviewError } from "../../../types/types";

type PropType = {
    addReview: (event: FormEvent<HTMLFormElement>) => void;
    errors: Partial<ReviewError>;
    author: string;
    setAuthor: (value: ((prevState: string) => string) | string) => void;
    rating: number;
    setRating: (value: ((prevState: number) => number) | number) => void;
    message: string;
    setMessage: (value: ((prevState: string) => string) | string) => void;
};

const ProductReviewForm: FC<PropType> = ({
    addReview,
    errors,
    author,
    setAuthor,
    rating,
    setRating,
    message,
    setMessage
}): ReactElement => {
    const { authorError, messageError, ratingError } = errors;

    return (
        <form onSubmit={addReview}>
            <div className="form-group border mt-5">
                <div className="mx-3 my-3">
                    <div className="row">
                        <div className="col-md-4">
                            <label>
                                <span className="text-danger">
                                    <b>*</b>
                                </span>{" "}
                                Your name
                            </label>
                            <input
                                type="text"
                                className={authorError ? "form-control is-invalid" : "form-control"}
                                name="author"
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                            />
                            <div className="invalid-feedback">{authorError}</div>
                            <label>
                                <span className="text-danger">
                                    <b>*</b>
                                </span>{" "}
                                Message text
                            </label>
                        </div>
                        <div className="col-md-8">
                            <label>
                                <span className="text-danger">
                                    <b>*</b>
                                </span>{" "}
                                Your mark
                            </label>
                            <div>
                                <StarRatingComponent
                                    name="star"
                                    starCount={5}
                                    value={rating}
                                    onStarClick={(value) => setRating(value)}
                                    renderStarIcon={() => <FontAwesomeIcon className="fa-sm" icon={faStar} />}
                                />
                                <div className="invalid-feedback d-block">{ratingError}</div>
                            </div>
                        </div>
                    </div>
                    <textarea
                        rows={4}
                        className={messageError ? "form-control is-invalid" : "form-control"}
                        name="message"
                        value={message}
                        style={{ resize: "none" }}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <div className="invalid-feedback">{messageError}</div>
                    <IconButton
                        buttonText={"Post a review"}
                        buttonClassName={"mt-3"}
                        icon={faPaperPlane}
                        iconClassName={"mr-2"}
                    />
                </div>
            </div>
        </form>
    );
};

export default ProductReviewForm;
