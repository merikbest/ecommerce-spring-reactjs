import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "antd";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import {
    selectIsPerfumeLoaded,
    selectIsPerfumeLoading,
    selectPerfume,
    selectPerfumeError,
    selectPerfumeErrorMessage,
    selectReviews
} from "../../../redux-toolkit/perfume/perfume-selector";
import { selectIsReviewAdded, selectReviewErrors } from "../../../redux-toolkit/user/user-selector";
import { fetchPerfume, fetchReviewsByPerfumeId } from "../../../redux-toolkit/perfume/perfume-thunks";
import { resetInputForm } from "../../../redux-toolkit/user/user-slice";
import { WEBSOCKET_URL } from "../../../constants/urlConstants";
import { resetPerfumeState, setReview } from "../../../redux-toolkit/perfume/perfume-slice";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ProductInfo from "./ProductInfo/ProductInfo";
import ProductReviews from "./ProductReviews/ProductReviews";
import { CART } from "../../../constants/routeConstants";
import { addReviewToPerfume } from "../../../redux-toolkit/user/user-thunks";
import "./Product2.css";

let stompClient: CompatClient | null = null;

export interface ReviewData {
    author: string;
    message: string;
    rating: number;
}

const Product2: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();
    const params = useParams<{ id: string }>();
    const perfume = useSelector(selectPerfume);
    const reviews = useSelector(selectReviews);
    const isPerfumeLoading = useSelector(selectIsPerfumeLoading);
    const isPerfumeLoaded = useSelector(selectIsPerfumeLoaded);
    const isPerfumeError = useSelector(selectPerfumeError);
    const errorMessage = useSelector(selectPerfumeErrorMessage);
    const reviewErrors = useSelector(selectReviewErrors);
    const isReviewAdded = useSelector(selectIsReviewAdded);

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
        form.resetFields();
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

    const addReview = (data: ReviewData): void => {
        dispatch(addReviewToPerfume({ perfumeId: params.id, ...data }));
    };

    return (
        <ContentWrapper>
            {isPerfumeLoading ? (
                <Spinner />
            ) : (
                <>
                    {isPerfumeError ? (
                        <ErrorMessage errorMessage={errorMessage} />
                    ) : (
                        <>
                            <ProductInfo perfume={perfume} reviewsLength={reviews.length} addToCart={addToCart} />
                            <ProductReviews
                                reviews={reviews}
                                reviewErrors={reviewErrors}
                                addReview={addReview}
                                form={form}
                            />
                        </>
                    )}
                </>
            )}
        </ContentWrapper>
    );
};

export default Product2;
