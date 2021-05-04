import React, {useEffect, useState} from 'react';

export type Pagination = {
    id: number
    current: boolean
    ellipsis: boolean
};

const usePagination: ({itemsPerPage, data, startFrom}: { itemsPerPage: number, data: Array<any>, startFrom: any }) => {
    pagination: Array<Pagination>;
    changePage: (page: number, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    setFilteredData: (value: (((prevState: Array<any>) => Array<any>) | Array<any>)) => void;
    nextPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    setSearching: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    slicedData: Array<any>;
    prevPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
} = ({itemsPerPage, data, startFrom}) => {

    const [searching, setSearching] = useState<boolean>(false);
    const [filteredData, setFilteredData] = useState<Array<any>>(data);
    const perPage: number = itemsPerPage ? itemsPerPage : 12;
    const pages: number = Math.ceil(filteredData.length / perPage);
    const pagination: Array<Pagination> = [];
    const [currentPage, setCurrentPage] = useState<number>(startFrom <= pages ? startFrom : 1);
    const [slicedData, setSlicedData] = useState<Array<any>>([...filteredData].slice((currentPage - 1) * perPage, currentPage * perPage));

    useEffect(() => {
        setSlicedData([...filteredData].slice((currentPage - 1) * perPage, currentPage * perPage));

        if (searching) {
            setCurrentPage(1);
            setSearching(false);
        }
    }, [filteredData, currentPage]);

    let ellipsisLeft: boolean = false;
    let ellipsisRight: boolean = false;

    for (let i = 1; i <= pages; i++) {
        if (i === currentPage) {
            pagination.push(
                {id: i, current: true, ellipsis: false}
            );
        } else {
            if (i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1) {
                pagination.push(
                    {id: i, current: false, ellipsis: false}
                );
            } else if (i > 1 && i < currentPage && !ellipsisLeft) {
                pagination.push(
                    {id: i, current: false, ellipsis: true}
                );
                ellipsisLeft = true;
            } else if (i < pages && i > currentPage && !ellipsisRight) {
                pagination.push(
                    {id: i, current: false, ellipsis: true}
                );
                ellipsisRight = true;
            }
        }
    }

    const changePage = (page: number, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        event.preventDefault();

        if (page !== currentPage) {
            setCurrentPage(page);
            setSlicedData([...filteredData].slice((page - 1) * perPage, page * perPage));
        }
    };

    const goToPrevPage = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        event.preventDefault();

        setCurrentPage(prevVal => prevVal - 1 === 0 ? prevVal : prevVal - 1);

        if (currentPage !== 1) {
            setSlicedData([...filteredData].slice((currentPage - 2) * perPage, (currentPage - 1) * perPage));
        }
    };

    const goToNextPage = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        event.preventDefault();

        setCurrentPage(prevVal => prevVal === pages ? prevVal : prevVal + 1);

        if (currentPage !== pages) {
            setSlicedData([...filteredData].slice(currentPage * perPage, (currentPage + 1) * perPage));
        }
    };

    return {
        slicedData,
        pagination,
        prevPage: goToPrevPage,
        nextPage: goToNextPage,
        changePage,
        setFilteredData,
        setSearching
    };
};

export default usePagination;
