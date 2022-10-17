import { useState } from "react";
import { useSelector } from "react-redux";

import { selectTotalElements } from "../redux-toolkit/perfumes/perfumes-selector";

interface UsePagination {
    currentPage: number,
    totalElements: number
    handleChangePagination: (page: number, pageSize: number) => void,
    resetPagination: () => void,
}

export const MAX_PAGE_VALUE = 15;

export const usePagination = (): UsePagination => {
    const totalElements = useSelector(selectTotalElements);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleChangePagination = (page: number, pageSize: number): void => {
        setCurrentPage(page);
    };

    const resetPagination = (): void => {
        setCurrentPage(1);
    };

    return { currentPage, totalElements, handleChangePagination, resetPagination };
};
