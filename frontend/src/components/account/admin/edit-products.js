import React from 'react';
import usePagination from "../../parts/pagination/usePagination";
import {Link} from "react-router-dom";

const EditProducts = ({data, itemsPerPage, startFrom}) => {
    const {slicedData, pagination, prevPage, nextPage, changePage} = usePagination({itemsPerPage, data, startFrom});

    const paginationItem = (
        <ul className="pagination">
            <li className="page-item disabled">
                <a className="page-link " href="#" tabIndex="-1">Страницы</a>
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
                                   onClick={(e) => changePage(page.id, e)}
                                >{page.id}</a>
                            </li>
                        )
                    } else {
                        return (
                            <li className="page-item">
                                <a href="#"
                                   className="page-link text-dark"
                                   onClick={(e) => changePage(page.id, e)}
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
        <div className="container mt-5">
            {paginationItem}

            <div className="container-fluid mt-5">
                <div className="row">
                    {slicedData.map((perfume) => {
                        return (
                            <div className="col-lg-2 d-flex align-items-stretch">
                                <div key={perfume.id} className="card mb-5">
                                    <div>
                                        <img src={`http://localhost:8080/img/${perfume.filename}`}
                                             className="rounded mx-auto w-100"/>
                                    </div>
                                    <div className="card-body text-center">
                                        <h5>{perfume.perfumeTitle}</h5>
                                        <h6>{perfume.perfumer}</h6>
                                        <h6><span>{perfume.price}</span>,00 грн.</h6>
                                    </div>
                                    <div className="text-center align-items-end mb-3">
                                        <Link to={`/rest/product/list/edit/${perfume.id}`}>
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
    );
}

export default EditProducts;