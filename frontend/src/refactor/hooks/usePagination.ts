import { useState } from "react";

export const MAX_PAGE_VALUE = 15;

export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [minPageValue, setMinPageValue] = useState<number>(0);
    const [maxPageValue, setMaxPageValue] = useState<number>(MAX_PAGE_VALUE);

    const handleChangePagination = (page: number, pageSize: number): void => {
        changePageValue(page);
    };

    const resetPagination = (): void => {
        changePageValue(1);
        setCurrentPage(1);
    };

    const changePageValue = (page: number): void => {
        setMinPageValue((page - 1) * MAX_PAGE_VALUE);
        setMaxPageValue(page * MAX_PAGE_VALUE);
        setCurrentPage(page);
    };

    return { currentPage, minPageValue, maxPageValue, handleChangePagination, resetPagination };
};
