import React, {FC} from 'react';

import usePagination from "../Pagination/usePagination";
import PerfumeCardItem from "../PerfumeCardItem/PerfumeCardItem";
import PaginationItem from "../Pagination/PaginationItem";
import SearchForm from "../SearchForm/SearchForm";
import {Perfume} from "../../types/types";

type PropsType = {
    data: Array<Perfume>
    itemsPerPage: number
    startFrom?: number
    searchByData: Array<{ label: string, value: string }>
};

const MenuCards: FC<PropsType> = ({data, itemsPerPage, startFrom, searchByData}) => {
    const {
        slicedData,
        pagination,
        prevPage,
        nextPage,
        changePage,
        setFilteredData,
        setSearching
    } = usePagination({itemsPerPage, data, startFrom});

    return (
        <div className="container">
            <div className="container-fluid row mt-5 ml-2">
                <SearchForm
                    data={data}
                    searchByData={searchByData}
                    setFilteredData={setFilteredData}
                    setSearching={setSearching}/>
            </div>
            <div className="row mt-3 ml-2">
                <div className="container-fluid">
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage}/>
                    <div className="row">
                        {slicedData.map((perfume: Perfume) => {
                            return (
                                <PerfumeCardItem
                                    perfume={perfume}
                                    colSize={3}
                                    link={"/product"}
                                    btnName={"SHOW MORE"}/>
                            );
                        })}
                    </div>
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage}/>
                </div>
            </div>
        </div>
    );
}

export default MenuCards;
