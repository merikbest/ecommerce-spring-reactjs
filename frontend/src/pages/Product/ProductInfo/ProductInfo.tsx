import React, { FC, ReactElement } from "react";
import StarRatingComponent from "react-star-rating-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";

import halfStar from "../../../img/star-half.svg";
import { Perfume } from "../../../types/types";

type PropType = {
    perfume: Partial<Perfume>;
    reviewLength: number;
    addToCart: () => void;
};

const ProductInfo: FC<PropType> = ({ perfume, reviewLength, addToCart }): ReactElement => {
    return (
        <div className="row">
            <div className="col-md-5">
                <div>
                    <img src={perfume.filename} className="rounded mx-auto w-100" />
                </div>
            </div>
            <div className="col-md-7">
                <h2>{perfume.perfumeTitle}</h2>
                <h3>{perfume.perfumer}</h3>
                <p>
                    Product code: <span>{perfume.id}</span>
                </p>
                <div className="row">
                    <div className="col-md-2">
                        <StarRatingComponent
                            renderStarIconHalf={() => (
                                <img src={halfStar} alt="halfStar" className="product_star_icon" />
                            )}
                            renderStarIcon={() => <FontAwesomeIcon className="fa-sm" icon={faStar} />}
                            name={"star"}
                            starCount={5}
                            editing={false}
                            value={perfume.perfumeRating === 0 ? 5 : perfume.perfumeRating!}
                        />
                    </div>
                    <div className="col-md-10">
                        <span className="product_reviews_count">{reviewLength} reviews</span>
                    </div>
                </div>
                <p className="product_stock">In Stock</p>
                <div className="row ml-1">
                    <h6 className="mr-5">
                        <span>${perfume.price}</span>.00
                    </h6>
                    <button type="submit" className="btn btn-success mx-3" onClick={addToCart}>
                        <FontAwesomeIcon className="mr-2 fa-lg" icon={faCartPlus} /> ADD TO CART
                    </button>
                </div>
                <br />
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Perfume title:</td>
                            <td>{perfume.perfumeTitle}</td>
                        </tr>
                        <tr>
                            <td>Brand:</td>
                            <td>{perfume.perfumer}</td>
                        </tr>
                        <tr>
                            <td>Perfume type:</td>
                            <td>{perfume.type}</td>
                        </tr>
                        <tr>
                            <td>Release year:</td>
                            <td>{perfume.year}</td>
                        </tr>
                        <tr>
                            <td>Volume:</td>
                            <td>
                                <span>{perfume.volume}</span> ml.
                            </td>
                        </tr>
                        <tr>
                            <td>Manufacturer country:</td>
                            <td>{perfume.country}</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>{perfume.perfumeGender}</td>
                        </tr>
                        <tr>
                            <td>Top notes:</td>
                            <td>{perfume.fragranceTopNotes}</td>
                        </tr>
                        <tr>
                            <td>Heart notes:</td>
                            <td>{perfume.fragranceMiddleNotes}</td>
                        </tr>
                        <tr>
                            <td>Base notes:</td>
                            <td>{perfume.fragranceBaseNotes}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductInfo;
