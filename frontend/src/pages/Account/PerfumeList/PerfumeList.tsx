import React, {FC, useEffect} from 'react';
import {Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Perfume} from "../../../types/types";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import PerfumeListComponent from "./PerfumeListComponent";
import ScrollButton from "../../../component/ScrollButton/ScrollButton";
import {fetchPerfumes} from "../../../redux/thunks/perfume-thunks";

const PerfumeList: FC = () => {
    const dispatch = useDispatch();
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.perfume.perfumes);

    useEffect(() => {
        dispatch(fetchPerfumes());
    }, []);

    const itemsPerPage = 24;
    const searchByData = [
        {label: 'Brand', value: 'perfumer'},
        {label: 'Perfume title', value: 'perfumeTitle'},
        {label: 'Manufacturer country', value: 'country'},
        {label: 'Gender', value: 'perfumeGender'}
    ];

    return (
        <div className="container">
            <ScrollButton/>
            <Route exact component={() =>
                <PerfumeListComponent
                    data={perfumes}
                    itemsPerPage={itemsPerPage}
                    searchByData={searchByData}/>}/>
        </div>
    );
};

export default PerfumeList;
