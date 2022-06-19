import { useState } from "react";
import { useSelector } from "react-redux";

import { selectTotalElements } from "../redux-toolkit/perfumes/perfumes-selector";

export const MAX_PAGE_VALUE = 15;

export const usePagination = () => {
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
