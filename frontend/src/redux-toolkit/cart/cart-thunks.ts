import { createAsyncThunk } from "@reduxjs/toolkit";

import { Perfume } from "../../types/types";
import RequestService from "../../utils/request-service";
import { USERS_CART } from "../../constants/urlConstants";
import { setPerfumes } from "../perfumes/perfumes-slice";

export const fetchCart = createAsyncThunk<Array<Perfume>, Array<number>>(
    "cart/fetchCart",
    async (perfumeIds, { dispatch }) => {
        const response = await RequestService.post(USERS_CART, perfumeIds);
        dispatch(setPerfumes(response.data));
        return response.data;
    }
);
