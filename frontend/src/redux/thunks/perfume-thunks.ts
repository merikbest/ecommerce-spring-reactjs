import axios from 'axios';
import {API_BASE_URL} from "../../utils/constants/url";
import {getPerfumes} from "../actions/admin-actions";
import {
    fetchPerfumesByFilterParamsSuccess,
    fetchPerfumesByGenderSuccess,
    fetchPerfumesByPerfumerSuccess,
    fetchPerfumeSuccess
} from "../actions/perfume-actions";
import {FilterParamsType} from "../../types/types";
import {Dispatch} from "redux";

export const fetchPerfumes = () => async (dispatch: Dispatch) => {
    const response = await axios.get(API_BASE_URL + "/home");
    dispatch(getPerfumes(response.data));
};

export const fetchPerfume = (id: string) => async (dispatch: Dispatch) => {
    const response = await axios.get(API_BASE_URL + "/home/product/" + id);
    dispatch(fetchPerfumeSuccess(response.data));
};

export const fetchPerfumesByGender = (gender: { perfumeGender: string }) => async (dispatch: Dispatch) => {
    const response = await axios.post(API_BASE_URL + "/menu/gender", gender);
    dispatch(fetchPerfumesByGenderSuccess(response.data));
};

export const fetchPerfumesByPerfumer = (perfumer: { perfumer: string }) => async (dispatch: Dispatch) => {
    const response = await axios.post(API_BASE_URL + "/menu/perfumer", perfumer);
    dispatch(fetchPerfumesByPerfumerSuccess(response.data));
};

export const fetchPerfumesByFilterParams = (filter: FilterParamsType) => async (dispatch: Dispatch) => {
    const response = await axios.post(API_BASE_URL + "/menu/search", filter);
    dispatch(fetchPerfumesByFilterParamsSuccess(response.data));
};
