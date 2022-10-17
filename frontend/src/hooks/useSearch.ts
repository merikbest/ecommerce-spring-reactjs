import { useState } from "react";
import { useDispatch } from "react-redux";
import {Form, FormInstance} from "antd";

import { SearchPerfume } from "../types/types";
import { fetchPerfumesByInputText } from "../redux-toolkit/perfumes/perfumes-thunks";

interface UseSearch {
    form: FormInstance<any>,
    searchTypeValue: SearchPerfume,
    onSearch: (data: {searchValue: string}) => void,
    resetFields: () => void,
    searchValue: string,
    handleChangeSelect: (value: SearchPerfume) => void
}

export const useSearch = (): UseSearch => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [searchTypeValue, setSearchTypeValue] = useState<SearchPerfume>(SearchPerfume.BRAND);
    const [searchValue, setSearchValue] = useState<string>("");

    const handleChangeSelect = (value: SearchPerfume): void => {
        setSearchTypeValue(value);
    };

    const onSearch = (data: { searchValue: string }): void => {
        setSearchValue(data.searchValue);
        dispatch(fetchPerfumesByInputText({ searchType: searchTypeValue, text: data.searchValue, currentPage: 0 }));
    };

    const resetFields = (): void => {
        form.resetFields();
    };

    return { searchValue, searchTypeValue, form, resetFields, handleChangeSelect, onSearch };
};
