import { createAsyncThunk } from "@reduxjs/toolkit";

import { PerfumeResponse } from "../../types/types";
import RequestService from "../../utils/request-service";
import { USERS_CART } from "../../constants/urlConstants";

export const fetchCart = createAsyncThunk<Array<PerfumeResponse>, Array<number>>("cart/fetchCart", async (perfumeIds) => {
    const response = await RequestService.post(USERS_CART, perfumeIds);
    return response.data;
});
