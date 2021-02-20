import React, {FC} from 'react';
import {Pagination} from "./usePagination";

type PropsType = {
    pagination: Array<Pagination>
    prevPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
    changePage: (page: number, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
    nextPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
};

const PaginationItem: FC<PropsType> = ({pagination, prevPage, changePage, nextPage}) => {
    return (
        <ul className="pagination">
            <li className="page-item disabled">
                <a className="page-link" href="#">Pages</a>
            </li>
            <li className="page-item">
                <a className="page-link text-dark" href="#" aria-label="Previous" onClick={prevPage}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </a>
            </li>
            {pagination.map((page: Pagination, index: number) => {
                if (!page.ellipsis) {
                    if (page.current) {
                        return (
                            <li key={index} className="page-item active">
                                <a href="#"
                                   className="page-link bg-dark border-dark"
                                   onClick={(event) => changePage(page.id, event)}>{page.id}</a>
                            </li>
                        )
                    } else {
                        return (
                            <li key={index} className="page-item">
                                <a href="#"
                                   className="page-link text-dark"
                                   onClick={(event) => changePage(page.id, event)}>{page.id}</a>
                            </li>
                        )
                    }
                } else {
                    return (
                        <li key={index} className="page-item disabled">
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
    )
}

export default PaginationItem;
