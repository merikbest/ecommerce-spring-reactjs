import React, { FC, ReactElement, useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PerfumeListComponent from "./PerfumeListComponent";
import ScrollButton from "../../../component/ScrollButton/ScrollButton";
import { selectPerfumes } from "../../../redux-toolkit/perfumes/perfumes-selector";
import { fetchPerfumes } from "../../../redux-toolkit/perfumes/perfumes-thunks";
import { resetPerfumesState } from "../../../redux-toolkit/perfumes/perfumes-slice";
import { resetAdminState } from "../../../redux-toolkit/admin/admin-slice";

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
