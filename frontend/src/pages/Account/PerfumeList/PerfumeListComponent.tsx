import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faList} from "@fortawesome/free-solid-svg-icons";

import usePagination from "../../../component/Pagination/usePagination";
import {Perfume} from "../../../types/types";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import SearchForm from "../../../component/SearchForm/SearchForm";
import PaginationItem from "../../../component/Pagination/PaginationItem";
import {deletePerfume} from "../../../redux/admin/admin-thunks";
import Spinner from '../../../component/Spinner/Spinner';
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import PerfumeListItem from "./PerfumeListItem/PerfumeListItem";
import {selectIsPerfumeLoading} from "../../../redux/perfume/perfume-selector";

type PropsType = {
    data: Array<Perfume>
    itemsPerPage: number
    startFrom?: number
    searchByData: Array<{ label: string, value: string }>
};

const PerfumeListComponent: FC<PropsType> = ({data, itemsPerPage, startFrom, searchByData}): ReactElement => {
    const dispatch = useDispatch();
    const loading = useSelector(selectIsPerfumeLoading);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [perfumeInfo, setPerfumeInfo] = useState<Perfume>();

    const {
        slicedData,
        pagination,
        prevPage,
        nextPage,
        changePage,
        setFilteredData,
        setSearching
    } = usePagination({itemsPerPage, data, startFrom});

    useEffect(() => {
        setModalActive(false);
    }, [data]);

    const deletePerfumeHandler = (id?: number): void => {
        dispatch(deletePerfume(id));
    };

    const showDeleteModalWindow = (perfume: Perfume): void => {
        setModalActive(true);
        setPerfumeInfo(perfume);
    };

    return (
        <>
            {modalActive && (
                <DeleteModal 
                    perfume={perfumeInfo}
                    deletePerfumeHandler={deletePerfumeHandler}
                    setModalActive={setModalActive}
                />
            )}
            <InfoTitle iconClass={"ml-2 mr-2"} icon={faList} title={"List of perfumes"}/>
            <br/>
            <SearchForm
                data={data}
                searchByData={searchByData}
                setFilteredData={setFilteredData}
                setSearching={setSearching}
            />
            <div className="mt-3">
                <PaginationItem
                    pagination={pagination}
                    prevPage={prevPage}
                    changePage={changePage}
                    nextPage={nextPage}
                />
            </div>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <div className="container-fluid mt-3">
                        <div className="row">
                            {slicedData.map((perfume: Perfume) => (
                                <PerfumeListItem 
                                    key={perfume.id} 
                                    perfume={perfume} 
                                    showDeleteModalWindow={showDeleteModalWindow}
                                />
                            ))}
                        </div>
                    </div>
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage}
                    />
                </>
            )}
        </>
    );
};

export default PerfumeListComponent;
