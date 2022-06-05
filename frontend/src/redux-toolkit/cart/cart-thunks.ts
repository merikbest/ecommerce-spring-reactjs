import { createAsyncThunk } from "@reduxjs/toolkit";

import { Perfume } from "../../types/types";
import RequestService from "../../utils/request-service";
import { USERS_CART } from "../../constants/urlConstants";

export const fetchCart = createAsyncThunk<Array<Perfume>, Array<number>>("cart/fetchCart", async (perfumeIds) => {
    const response = await RequestService.post(USERS_CART, perfumeIds);
    return response.data;
});
