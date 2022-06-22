import { useDispatch } from "react-redux";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { FilterValue, SorterResult, TableCurrentDataSource, TablePaginationConfig } from "antd/lib/table/interface";

import { HeaderResponse } from "../types/types";

export const useTablePagination = <T, S>(
    getPaginationItems: (page: S) => AsyncThunkAction<HeaderResponse<T>, S, {}>,
    userEmail?: string
) => {
    const dispatch = useDispatch();

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<T> | SorterResult<T>[],
        extra: TableCurrentDataSource<T>
    ): void => {
        if (extra.action === "paginate") {
            dispatch(
                getPaginationItems(
                    userEmail ? { email: userEmail, page: pagination.current! - 1 } as any : pagination.current! - 1 as any
                )
            );
        }
    };

    return handleTableChange;
};
