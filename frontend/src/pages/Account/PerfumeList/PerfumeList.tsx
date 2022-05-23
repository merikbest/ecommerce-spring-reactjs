import React, { FC, ReactElement, useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PerfumeListComponent from "./PerfumeListComponent";
import ScrollButton from "../../../component/ScrollButton/ScrollButton";
import { fetchPerfumes } from "../../../redux/perfumes/perfumes-thunks";
import { selectPerfumes } from "../../../redux/perfumes/perfumes-selector";
import { resetPerfumesState } from "../../../redux/perfumes/perfumes-actions";
import { resetAdminState } from "../../../redux/admin/admin-actions";

const PerfumeList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);

    useEffect(() => {
        dispatch(fetchPerfumes());

        return () => {
            dispatch(resetPerfumesState());
            dispatch(resetAdminState());
        };
    }, []);

    return (
        <div className="container">
            <ScrollButton />
            <Route
                exact
                component={() => (
                    <PerfumeListComponent
                        data={perfumes}
                        itemsPerPage={24}
                        searchByData={[
                            { label: "Brand", value: "perfumer" },
                            { label: "Perfume title", value: "perfumeTitle" },
                            { label: "Manufacturer country", value: "country" },
                            { label: "Gender", value: "perfumeGender" }
                        ]}
                    />
                )}
            />
        </div>
    );
};

export default PerfumeList;
