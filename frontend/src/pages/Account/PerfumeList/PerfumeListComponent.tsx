import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import {LazyLoadImage} from "react-lazy-load-image-component";

import usePagination from "../../../component/Pagination/usePagination";
import {Perfume} from "../../../types/types";
import Modal from "../../../component/Modal/Modal";
import SearchForm from "../../../component/SearchForm/SearchForm";
import PaginationItem from "../../../component/Pagination/PaginationItem";
import StarRating from "../../../component/StarRating/StarRating";
import {deletePerfume} from "../../../redux/thunks/admin-thunks";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import Spinner from '../../../component/Spinner/Spinner';

type PropsType = {
    data: Array<Perfume>
    itemsPerPage: number
    startFrom?: number
    searchByData: Array<{ label: string, value: string }>
};

const PerfumeListComponent:FC<PropsType> = ({data, itemsPerPage,startFrom,searchByData}) => {
    const dispatch = useDispatch();
    const loading: boolean = useSelector((state: AppStateType) => state.perfume.isPerfumeLoading);
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
            {modalActive ?
                <Modal perfume={perfumeInfo}
                       deletePerfumeHandler={deletePerfumeHandler}
                       setModalActive={setModalActive}/> : null}
            <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faList}/> List of perfumes</h4>
            <br/>
            <SearchForm
                data={data}
                searchByData={searchByData}
                setFilteredData={setFilteredData}
                setSearching={setSearching}/>
            <div className="mt-3">
                <PaginationItem
                    pagination={pagination}
                    prevPage={prevPage}
                    changePage={changePage}
                    nextPage={nextPage}/>
            </div>
            {loading ? <Spinner/> :
            <>
                <div className="container-fluid mt-3">
                    <div className="row">
                        {slicedData.map((perfume: Perfume) => {
                            return (
                                <div key={perfume.id} className="col-lg-3">
                                    <div className="card mb-5" style={{height: "320px"}}>
                                        <div style={{height: "92px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <LazyLoadImage
                                                effect="blur"
                                                style={{width: "80px", marginTop: "20px"}}
                                                src={perfume.filename}/>
                                        </div>
                                        <div className="card-body text-center">
                                            <StarRating perfumeRating={perfume.perfumeRating}/>
                                            <h6>{perfume.perfumeTitle}</h6>
                                            <h6>{perfume.perfumer}</h6>
                                            <h6><span>${perfume.price}</span>.00</h6>
                                        </div>
                                        <div className="btn-group text-center mb-3">
                                            <Link type="button" className="btn btn-dark ml-2"
                                                  to={`/account/admin/perfumes/${perfume.id}`}>
                                                <FontAwesomeIcon className="fa-xs" icon={faEdit}/> Edit
                                            </Link>
                                            <button className="btn btn-warning mr-2"
                                                    onClick={() => showDeleteModalWindow(perfume)}>
                                                <FontAwesomeIcon className="fa-xs" icon={faTrash}/> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <PaginationItem
                    pagination={pagination}
                    prevPage={prevPage}
                    changePage={changePage}
                    nextPage={nextPage}/>
            </>
            }
        </>
    );
};

export default PerfumeListComponent;
