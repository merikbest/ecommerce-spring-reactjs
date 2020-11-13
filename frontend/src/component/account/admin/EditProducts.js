import React, {useState, useEffect} from 'react';
import usePagination from "../../parts/pagination/usePagination";
import {Link} from "react-router-dom";
import Spinner from "../../parts/spinner/Spinner";
import AccountNavbar from "../../parts/account-navbar/AccountNavbar";
import {IMG_URL} from "../../../constants";

function EditProducts({data, itemsPerPage, startFrom, searchByData}) {
    const [load, setLoad] = React.useState(false);
    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState(searchByData && searchByData.length > 0 ? searchByData[0].value : '');
    const [searchFor, setSearchFor] = useState('');
    const {slicedData, pagination, prevPage, nextPage, changePage, setFilteredData, setSearching} = usePagination({
        itemsPerPage,
        data,
        startFrom
    });

    const submitHandler = (event) => {
        event.preventDefault();

        if (search.trim() !== '') {
            setSearching(true);
            const copiedData = [...data];
            const filtered = copiedData.filter(perfumer => {
                let searchKey = 'perfumer';
                if (searchByData && searchByData.length > 0) {
                    searchKey = searchBy;
                }
                return perfumer[searchKey].toLowerCase().includes(search.trim().toLowerCase());
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
        setSearchFor(search);
    }

    const paginationItem = (
        <ul className="pagination">
            <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">Страницы</a>
            </li>
            <li className="page-item">
                <a className="page-link text-dark" href="#" aria-label="Previous" onClick={prevPage}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </a>
            </li>

            {pagination.map(page => {
                if (!page.ellipsis) {
                    if (page.current) {
                        return (
                            <li className="page-item active">
                                <a href="#"
                                   className="page-link bg-dark border-dark"
                                   onClick={(event) => changePage(page.id, event)}
                                >{page.id}</a>
                            </li>
                        )
                    } else {
                        return (
                            <li className="page-item">
                                <a href="#"
                                   className="page-link text-dark"
                                   onClick={(event) => changePage(page.id, event)}
                                >{page.id}</a>
                            </li>
                        )
                    }
                } else {
                    return (
                        <li className="page-item disabled">
                            <a className="page-link text-dark" href="#">...</a>
                        </li>
                    )
                }
            })}

            <li className="page-item">
                <a className="page-link text-dark" href="#" aria-label="Next" onClick={nextPage}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </a>
            </li>
        </ul>
    );

    return (
        <div>
            <AccountNavbar/>
            <div className="container mt-5">
                <div className="container form row">
                    {paginationItem}
                    <form onSubmit={submitHandler} style={{justifyContent: 'center'}}>
                        <div className="form row ml-5">
                            {searchByData && searchByData.length > 0 &&
                            <div className="col-sm-6">
                                <select className="form-control" value={searchBy}
                                        onChange={(event) => setSearchBy(event.target.value)}>
                                    {searchByData.map((data, index) => (
                                        <option key={index} value={data.value}>{data.label}</option>
                                    ))}
                                </select>
                            </div>
                            }
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Поиск..."
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">Поиск</button>
                        </div>
                    </form>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        {slicedData.map((perfume) => {
                            return (
                                <div className="col-lg-2 d-flex align-items-stretch">
                                    <div key={perfume.id} className="card mb-5">
                                        {load ? null :
                                            <div className="d-block mx-auto w-50">
                                                <Spinner/>
                                            </div>
                                        }
                                        <div>
                                            <img onLoad={() => setLoad(true)}
                                                 style={{display: load ? "block" : "none"}}
                                                 src={IMG_URL + `${perfume.filename}`}
                                                 className="rounded mx-auto w-100"
                                            />
                                        </div>
                                        <div className="card-body text-center">
                                            <h5>{perfume.perfumeTitle}</h5>
                                            <h6>{perfume.perfumer}</h6>
                                            <h6><span>{perfume.price}</span>,00 грн.</h6>
                                        </div>
                                        <div className="text-center align-items-end mb-3">
                                            <Link to={`/product/list/edit/${perfume.id}`}>
                                                <span className="btn btn-dark">EDIT</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {paginationItem}
            </div>
        </div>
    );
}

export default EditProducts;