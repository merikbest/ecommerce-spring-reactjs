import React from 'react';
import usePagination from "../../component/pagination/usePagination";
import AccountNavbar from "../../component/account-navbar/AccountNavbar";
import PerfumeCardItem from "../../component/card/PerfumeCardItem";
import PaginationItem from "../../component/pagination/PaginationItem";
import SearchForm from "../../component/search-form/SearchForm";

function EditProducts({data, itemsPerPage, startFrom, searchByData}) {
    const {slicedData, pagination, prevPage, nextPage, changePage, setFilteredData, setSearching} = usePagination({
        itemsPerPage,
        data,
        startFrom
    });

    return (
        <div>
            <AccountNavbar/>
            <div className="container mt-5">
                <div className="container form row">
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage}/>
                    <SearchForm
                        data={data}
                        searchByData={searchByData}
                        setFilteredData={setFilteredData}
                        setSearching={setSearching} />
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        {slicedData.map((perfume) => {
                            return (
                                <PerfumeCardItem
                                    perfume={perfume}
                                    colSize={2}
                                    link={"/product/list/edit"}
                                    btnName={"EDIT"} />
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
        </div>
    );
}

export default EditProducts;