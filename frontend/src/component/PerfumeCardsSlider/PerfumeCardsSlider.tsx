import React, { FC, ReactElement, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";

import { fetchPerfumesByIds } from "../../redux/perfumes/perfumes-thunks";
import { Perfume } from "../../types/types";
import { selectPerfumes } from "../../redux/perfumes/perfumes-selector";
import { resetPerfumesState } from "../../redux/perfumes/perfumes-actions";
import PerfumeCardSliderItem from "./PerfumeCardSliderItem/PerfumeCardSliderItem";
import "./PerfumeCardsSlider.css";

const PerfumeCardsSlider: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);
    const perfumesId = [26, 43, 46, 106, 34, 76, 82, 85, 27, 39, 79, 86];

    useEffect(() => {
        // GraphQL example
        // dispatch(fetchPerfumesByIdsQuery(perfumesId));
        dispatch(fetchPerfumesByIds(perfumesId));

        return () => {
            dispatch(resetPerfumesState());
        };
    }, []);

    const addCarouselItems = (perfumes: Array<Perfume>, counter: number) => {
        return (
            <Carousel.Item>
                <div className="card-deck">
                    {perfumes.map((perfume) => {
                        for (let i = counter; i < counter + 4; i++) {
                            if (perfume.id === perfumesId[i]) {
                                return <PerfumeCardSliderItem key={perfume.id} perfume={perfume} />;
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
