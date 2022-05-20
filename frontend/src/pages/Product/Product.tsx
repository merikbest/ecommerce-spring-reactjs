import React, {FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {Route, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faPaperPlane, faStar} from "@fortawesome/free-solid-svg-icons";
import SockJS from "sockjs-client";
import {CompatClient, Stomp} from '@stomp/stompjs';
import StarRatingComponent from 'react-star-rating-component';

import {WEBSOCKET_URL} from "../../utils/constants/url";
import {fetchPerfumeByQuery} from "../../redux/perfume/perfume-thunks";
import {addReviewToPerfume} from "../../redux/user/user-thunks";
import {ReviewData} from "../../types/types";
import halfStar from "../../img/star-half.svg";
import Spinner from "../../component/Spinner/Spinner";
import ProductReview from "./ProductReview/ProductReview";
import ScrollButton from "../../component/ScrollButton/ScrollButton";
import IconButton from "../../component/IconButton/IconButton";
import {selectIsPerfumeLoading, selectPerfume, selectReviews} from "../../redux/perfume/perfume-selector";
import {selectIsReviewAdded, selectReviewErrors} from "../../redux/user/user-selector";
import {resetPerfumeState, setPerfume} from "../../redux/perfume/perfume-actions";
import "./Product.css";
import {resetInputForm} from "../../redux/user/user-actions";

let stompClient: CompatClient | null = null;

const Product: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const perfume = useSelector(selectPerfume);
    const reviews = useSelector(selectReviews);
    const isPerfumeLoading = useSelector(selectIsPerfumeLoading);
    const errors = useSelector(selectReviewErrors);
    const isReviewAdded = useSelector(selectIsReviewAdded);

    const [author, setAuthor] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const {authorError, messageError, ratingError} = errors;

    useEffect(() => {
        // GraphQL example
        dispatch(fetchPerfumeByQuery(params.id));
        // dispatch(fetchPerfume(match.params.id));
        dispatch(resetInputForm());
        window.scrollTo(0, 0);
        const socket = new SockJS(WEBSOCKET_URL);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient?.subscribe("/topic/reviews/" + params.id, (response: any) => {
                dispatch(setPerfume(JSON.parse(response.body)));
            });
        });
        
        return () => {
            stompClient?.disconnect();
            dispatch(resetPerfumeState());
        };
    }, []);

    useEffect(() => {
        setAuthor("");
        setMessage("");
        setRating(0);
    }, [isReviewAdded]);

    const addToCart = (): void => {
        const perfumeId: number | undefined = perfume.id;
        let data: string | null = localStorage.getItem("perfumes");
        let cart: Map<number, any> = data ? new Map(JSON.parse(data as string)) : new Map();

        if (cart.has(perfumeId as number)) {
            cart.set(perfumeId as number, cart.get(perfumeId as number) + 1);
        } else {
            cart.set(perfumeId as number, 1);
        }
        localStorage.setItem("perfumes", JSON.stringify(Array.from(cart.entries())));
        history.push("/cart");
    };

    const addReview = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const review: ReviewData = {perfumeId: params.id as string, author, message, rating}
        dispatch(addReviewToPerfume(review));
    };

    return (
        <div className="container mt-5 pb-5">
            {isPerfumeLoading ? (
                    <Spinner/>
                ) : (
                <>
                    <ScrollButton/>
                    <div className="row">
                        <div className="col-md-5">
                            <div>
                                <img src={perfume.filename} className="rounded mx-auto w-100"/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <h2>
                                {perfume.perfumeTitle}
                            </h2>
                            <h3>
                                {perfume.perfumer}
                            </h3>
                            <p>
                                Product code: <span>{perfume.id}</span>
                            </p>
                            <div className="row">
                                <div className="col-md-2">
                                    <StarRatingComponent
                                        renderStarIconHalf={() => <img src={halfStar} alt="halfStar" className="product_star_icon"/>}
                                        renderStarIcon={() => <FontAwesomeIcon className="fa-sm" icon={faStar}/>}
                                        name={"star"}
                                        starCount={5}
                                        editing={false}
                                        value={(perfume.perfumeRating === 0) ? 5 : perfume.perfumeRating!}
                                    />
                                </div>
                                <div className="col-md-10">
                                    <span className="product_reviews_count">
                                        {perfume.reviews?.length} reviews
                                    </span>
                                </div>
                            </div>
                            <p className="product_stock">
                                In Stock
                            </p>
                            <div className="row ml-1">
                                <h6 className="mr-5">
                                    <span>${perfume.price}</span>.00
                                </h6>
                                <button 
                                    type="submit"
                                    className="btn btn-success mx-3"
                                    onClick={addToCart}
                                >
                                    <FontAwesomeIcon className="mr-2 fa-lg" icon={faCartPlus}/> ADD TO CART
                                </button>
                            </div>
                            <br/>
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
                                    <td><span>{perfume.volume}</span> ml.</td>
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
                    <div className="mt-5">
                        <h3 className="text-center mb-5">
                            REVIEWS
                        </h3>
                        <Route exact component={() => <ProductReview data={reviews} itemsPerPage={5}/>}/>
                        <form onSubmit={addReview}>
                            <div className="form-group border mt-5">
                                <div className="mx-3 my-3">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label><span className="text-danger"><b>*</b></span> Your name</label>
                                            <input
                                                type="text"
                                                className={authorError ? "form-control is-invalid" : "form-control"}
                                                name="author"
                                                value={author}
                                                onChange={(event) => setAuthor(event.target.value)}
                                            />
                                            <div className="invalid-feedback">{authorError}</div>
                                            <label><span className="text-danger"><b>*</b></span> Message text</label>
                                        </div>
                                        <div className="col-md-8">
                                            <label><span className="text-danger"><b>*</b></span> Your mark</label>
                                            <div>
                                                <StarRatingComponent
                                                    name="star"
                                                    starCount={5}
                                                    value={rating}
                                                    onStarClick={(value) => setRating(value)}
                                                    renderStarIcon={() => <FontAwesomeIcon className="fa-sm" icon={faStar}/>}
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
                                        style={{resize: "none"}}
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
                    </div>
                </>
            )}
        </div>
    );
};

export default Product;
