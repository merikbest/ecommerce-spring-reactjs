import React, {FC, ReactElement, useEffect} from 'react';
import {Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PerfumeListComponent from "./PerfumeListComponent";

import ScrollButton from "../../../component/ScrollButton/ScrollButton";
import {fetchPerfumes} from "../../../redux/perfumes/perfumes-thunks";
import {selectPerfumes} from "../../../redux/perfumes/perfumes-selector";

const PerfumeList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);

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
            <Route exact component={() => (
                <PerfumeListComponent
                    data={perfumes}
                    itemsPerPage={itemsPerPage}
                    searchByData={searchByData}
                />)}
            />
        </div>
    );
};

export default PerfumeList;
