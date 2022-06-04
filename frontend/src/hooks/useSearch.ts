import { useState } from "react";
import { useDispatch } from "react-redux";

import { SearchPerfume } from "../types/types";
import { fetchPerfumesByInputText } from "../redux-toolkit/perfumes/perfumes-thunks";

export const useSearch = () => {
    const dispatch = useDispatch();
    const [searchTypeValue, setSearchTypeValue] = useState<SearchPerfume>(SearchPerfume.BRAND);

    const handleChangeSelect = (value: SearchPerfume): void => {
        setSearchTypeValue(value);
    };

    const onSearch = (data: { searchValue: string }): void => {
        dispatch(fetchPerfumesByInputText({ searchType: searchTypeValue, text: data.searchValue }));
    };

    return { handleChangeSelect, onSearch };
};
