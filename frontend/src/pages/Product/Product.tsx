import React, { FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

import { WEBSOCKET_URL } from "../../constants/urlConstants";
import { fetchPerfume, fetchReviewsByPerfumeId } from "../../redux/perfume/perfume-thunks";
import { addReviewToPerfume } from "../../redux/user/user-thunks";
import { ReviewRequest } from "../../types/types";
import Spinner from "../../component/Spinner/Spinner";
import ProductReview from "./ProductReview/ProductReview";
import ScrollButton from "../../component/ScrollButton/ScrollButton";
import {
    selectIsPerfumeLoaded,
    selectIsPerfumeLoading,
    selectPerfume,
    selectPerfumeError,
    selectPerfumeErrorMessage,
    selectReviews
} from "../../redux/perfume/perfume-selector";
import { selectIsReviewAdded, selectReviewErrors } from "../../redux/user/user-selector";
import { resetPerfumeState, setReview } from "../../redux/perfume/perfume-actions";
import { resetInputForm } from "../../redux/user/user-actions";
import { CART } from "../../constants/routeConstants";
import ProductInfo from "./ProductInfo/ProductInfo";
import ProductReviewForm from "./ProductReviewForm/ProductReviewForm";
import "./Product.css";

let stompClient: CompatClient | null = null;

const Product: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const perfume = useSelector(selectPerfume);
    const reviews = useSelector(selectReviews);
    const isPerfumeLoading = useSelector(selectIsPerfumeLoading);
    const isPerfumeLoaded = useSelector(selectIsPerfumeLoaded);
    const isPerfumeError = useSelector(selectPerfumeError);
    const errorMessage = useSelector(selectPerfumeErrorMessage);
    const errors = useSelector(selectReviewErrors);
    const isReviewAdded = useSelector(selectIsReviewAdded);

    const [author, setAuthor] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        // GraphQL example
        // dispatch(fetchPerfumeByQuery(params.id));
        dispatch(fetchPerfume(params.id));
        dispatch(resetInputForm());
        window.scrollTo(0, 0);
        const socket = new SockJS(WEBSOCKET_URL);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient?.subscribe("/topic/reviews/" + params.id, (response: any) => {
                dispatch(setReview(JSON.parse(response.body)));
            });
        });

        return () => {
            stompClient?.disconnect();
            dispatch(resetPerfumeState());
        };
    }, []);

    useEffect(() => {
        if (isPerfumeLoaded) {
            dispatch(fetchReviewsByPerfumeId(params.id));
        }
    }, [isPerfumeLoaded]);

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
        history.push(CART);
    };

    const addReview = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const review: ReviewRequest = { perfumeId: params.id as string, author, message, rating };
        dispatch(addReviewToPerfume(review));
    };

    return (
        <div className="container mt-5 pb-5">
            {isPerfumeLoading ? (
                <Spinner />
            ) : (
                <>
                    {isPerfumeError ? (
                        <h2 className="text-center">{errorMessage}</h2>
                    ) : (
                        <>
                            <ScrollButton />
                            <ProductInfo perfume={perfume} reviewLength={reviews.length} addToCart={addToCart} />
                            <div className="mt-5">
                                <h3 className="text-center mb-5">REVIEWS</h3>
                                <Route exact component={() => <ProductReview data={reviews} itemsPerPage={5} />} />
                                <ProductReviewForm
                                    addReview={addReview}
                                    errors={errors}
                                    author={author}
                                    setAuthor={setAuthor}
                                    rating={rating}
                                    setRating={setRating}
                                    message={message}
                                    setMessage={setMessage}
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Product;
