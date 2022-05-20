import React, {FC, ReactElement, useEffect} from 'react';
import Carousel from "react-bootstrap/Carousel";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {fetchPerfumesByIdsQuery} from "../../redux/perfumes/perfumes-thunks"
import {Perfume} from "../../types/types";
import StarRating from "../StarRating/StarRating";
import {selectPerfumes} from "../../redux/perfumes/perfumes-selector";
import {resetPerfumesState} from "../../redux/perfumes/perfumes-actions";
import "./PerfumeCardsSlider.css";

const PerfumeCardsSlider: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);
    const perfumesId = [26, 43, 46, 106, 34, 76, 82, 85, 27, 39, 79, 86];

    useEffect(() => {
        // GraphQL example
        dispatch(fetchPerfumesByIdsQuery(perfumesId));
        // dispatch(fetchPerfumesByIds(perfumesId));
        
        return () => {
            dispatch(resetPerfumesState());
        };
    }, []);

    const addCarouselItems = (array: Array<Perfume>, counter: number) => {
        return (
            <Carousel.Item>
                <div className="card-deck">
                    {array.map((perfume: Perfume) => {
                        for (let i = counter; i < counter + 4; i++) {
                            if (perfume.id === perfumesId[i]) {
                                return (
                                    <div className="card" key={perfume.id}>
                                        <div className={"perfume_card_item_image_wrapper"}>
                                            <img className={"perfume_card_item_image"} src={perfume.filename}/>
                                        </div>
                                        <div className="card-body text-center">
                                            <h5>{perfume.perfumeTitle}</h5>
                                            <h6>{perfume.perfumer}</h6>
                                            <StarRating perfumeRating={perfume.perfumeRating}/>
                                            <h6>$<span>{perfume.price}</span>.00</h6>
                                            <Link to={`/product/${perfume.id}`}>
                                            <span className="btn btn-dark">
                                                SHOW MORE
                                            </span>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </Carousel.Item>
        );
    };

    return (
        <div>
            <div className="container text-center my-3">
                <h3>PERSONALLY RECOMMENDED</h3>
            </div>
            <div className="container mt-5" id="indicators">
                <Carousel controls={false}>
                    {addCarouselItems(perfumes, 0)}
                    {addCarouselItems(perfumes, 4)}
                    {addCarouselItems(perfumes, 8)}
                </Carousel>
            </div>
        </div>
    );
};

export default PerfumeCardsSlider;
