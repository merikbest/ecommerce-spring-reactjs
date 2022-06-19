import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "antd";

import { SearchPerfume } from "../types/types";
import { fetchPerfumesByInputText } from "../redux-toolkit/perfumes/perfumes-thunks";

export const useSearch = () => {
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
