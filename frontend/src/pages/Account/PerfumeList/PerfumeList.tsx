import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";

import {Perfume} from "../../../types/types";
import PaginationItem from "../../../component/Pagination/PaginationItem";
import SearchForm from "../../../component/SearchForm/SearchForm";
import PerfumeCardItem from "../../../component/PerfumeCardItem/PerfumeCardItem";
import usePagination from "../../../component/Pagination/usePagination";

type PropsType = {
    startFrom?: number
    perfumes: Array<Perfume>
};

const PerfumeList: FC<PropsType> = ({startFrom, perfumes}) => {
    const itemsPerPage = 24;
    const searchByData = [
        {label: 'Brand', value: 'perfumer'},
        {label: 'Perfume title', value: 'perfumeTitle'},
        {label: 'Manufacturer country', value: 'country'},
        {label: 'Gender', value: 'perfumeGender'}
    ];

    const {slicedData, pagination, prevPage, nextPage, changePage, setFilteredData, setSearching} = usePagination({
        itemsPerPage,
        perfumes,
        startFrom
    });

    return (
        <div className="container">
            <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faList}/> List of perfumes</h4>
            <br/>
            <div className="container form row">
                <PaginationItem
                    pagination={pagination}
                    prevPage={prevPage}
                    changePage={changePage}
                    nextPage={nextPage}/>
                <div className="ml-5">
                    <SearchForm
                        data={perfumes}
                        searchByData={searchByData}
                        setFilteredData={setFilteredData}
                        setSearching={setSearching}/>
                </div>
            </div>
            <div className="container-fluid mt-3">
                <div className="row">
                    {slicedData.map((perfume: Perfume) => {
                        return (
                            <PerfumeCardItem
                                key={perfume.id}
                                perfume={perfume}
                                colSize={3}
                                link={"/account/admin/perfumes"}
                                btnName={"Edit"}/>
                        );
                    })}
                </div>
            </div>
            <PaginationItem
                pagination={pagination}
                prevPage={prevPage}
                changePage={changePage}
                nextPage={nextPage}/>
        </div>
    );
};

export default PerfumeList;
