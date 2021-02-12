import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";

import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import PaginationItem from "../../component/Pagination/PaginationItem";
import SearchForm from "../../component/SearchForm/SearchForm";
import PerfumeCardItem from "../../component/PerfumeCardItem/PerfumeCardItem";
import {fetchPerfumes} from "../../actions/admin-actions";
import usePagination from "../../component/Pagination/usePagination";

const EditPerfumes = ({startFrom}) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.admin.perfumes);

    const itemsPerPage = 24;
    const searchByData = [
        {label: 'Brand', value: 'perfumer'},
        {label: 'Perfume title', value: 'perfumeTitle'},
        {label: 'Manufacturer country', value: 'country'},
        {label: 'Gender', value: 'perfumeGender'}
    ];

    useEffect(() => {
        dispatch(fetchPerfumes());
    }, []);

    const {slicedData, pagination, prevPage, nextPage, changePage, setFilteredData, setSearching} = usePagination({
        itemsPerPage,
        data,
        startFrom
    });

    return (
        <div>
            <AccountNavbar/>
            <div className="container mt-5">
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
                            data={data}
                            searchByData={searchByData}
                            setFilteredData={setFilteredData}
                            setSearching={setSearching}/>
                    </div>
                </div>
                <div className="container-fluid mt-3">
                    <div className="row">
                        {slicedData.map((perfume) => {
                            return (
                                <PerfumeCardItem
                                    perfume={perfume}
                                    colSize={2}
                                    link={"/product/list/edit"}
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
        </div>
    );
};

export default EditPerfumes;
