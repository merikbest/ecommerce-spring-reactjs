import React, { FC, ReactElement } from "react";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import usePagination from "../Pagination/usePagination";
import PerfumeCardItem from "../PerfumeCardItem/PerfumeCardItem";
import PaginationItem from "../Pagination/PaginationItem";
import SearchForm from "../SearchForm/SearchForm";
import { Perfume } from "../../types/types";
import Spinner from "../Spinner/Spinner";
import SortButton from "./SortButton/SortButton";
import { PRODUCT } from "../../constants/routeConstants";

type PropsType = {
    data: Array<Perfume>;
    loading: boolean;
    itemsPerPage: number;
    startFrom?: number;
    searchByData: Array<{ label: string; value: string }>;
    sortByPrice: boolean | undefined;
    handleSortByPrice: (sortedBy: boolean, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const MenuCards: FC<PropsType> = ({
    data,
    loading,
    itemsPerPage,
    startFrom,
    searchByData,
    sortByPrice,
    handleSortByPrice
}): ReactElement => {
    const { slicedData, pagination, prevPage, nextPage, changePage, setFilteredData, setSearching } = usePagination({
        itemsPerPage,
        data,
        startFrom
    });

    return (
        <div className="container">
            <div className="container-fluid mt-5 ml-2">
                <SearchForm
                    data={data}
                    searchByData={searchByData}
                    setFilteredData={setFilteredData}
                    setSearching={setSearching}
                />
            </div>
            <div className="container-fluid mt-3 ml-2">
                <div className="row">
                    <div className="col-md-6">
                        <PaginationItem
                            pagination={pagination}
                            prevPage={prevPage}
                            changePage={changePage}
                            nextPage={nextPage}
                        />
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <a className="page-link" href="#">
                                    Sort by price
                                </a>
                            </li>
                            <SortButton
                                sortByPrice={sortByPrice}
                                sortedBy={false}
                                icon={faArrowDown}
                                handleSortByPrice={handleSortByPrice}
                            />
                            <SortButton
                                sortByPrice={!sortByPrice}
                                sortedBy={true}
                                icon={faArrowUp}
                                handleSortByPrice={handleSortByPrice}
                            />
                        </ul>
                    </div>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="row">
                            {slicedData.map((perfume: Perfume) => (
                                <PerfumeCardItem
                                    key={perfume.id}
                                    perfume={perfume}
                                    colSize={3}
                                    link={PRODUCT}
                                    btnName={"SHOW MORE"}
                                />
                            ))}
                        </div>
                        <PaginationItem
                            pagination={pagination}
                            prevPage={prevPage}
                            changePage={changePage}
                            nextPage={nextPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default MenuCards;
