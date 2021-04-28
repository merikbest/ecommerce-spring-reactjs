import axios from 'axios';
import {Dispatch} from "redux";

import {API_BASE_URL} from "../../utils/constants/url";
import {
    getPerfumes,
    fetchPerfumesByQuerySuccess,
    fetchPerfumeByQuerySuccess,
    fetchPerfumesByFilterParamsSuccess,
    fetchPerfumesByGenderSuccess,
    fetchPerfumesByPerfumerSuccess,
    fetchPerfumeSuccess
} from "../actions/perfume-actions";
import {FilterParamsType, Perfume} from "../../types/types";
import {getAllPerfumesByQuery, getPerfumeByQuery} from "../../utils/graphql-query/perfume";

export const fetchPerfumesByQuery = () => async (dispatch: Dispatch) => {
    const response = await axios.post(API_BASE_URL + "/perfumes/graphql/perfumes", {query: getAllPerfumesByQuery});
    dispatch(fetchPerfumesByQuerySuccess(response.data.data.perfumes));
};

export const fetchPerfumeByQuery = (id: string) => async (dispatch: Dispatch) => {
    const response = await axios.post(API_BASE_URL + "/perfumes/graphql/perfume", {query: getPerfumeByQuery(id)});
    dispatch(fetchPerfumeByQuerySuccess(response.data.data.perfume));
};

export const fetchPerfumes = () => async (dispatch: Dispatch) => {
    const response = await axios.get(API_BASE_URL + "/perfumes");
    dispatch(getPerfumes(response.data));
};

export const fetchPerfume = (id: string) => async (dispatch: Dispatch) => {
    const response = await axios.get(API_BASE_URL + "/perfumes/" + id);
    dispatch(fetchPerfumeSuccess(response.data));
};

export const fetchPerfumesByFilterParams = (filter: FilterParamsType) => async (dispatch: Dispatch) => {
    const response = await axios.post(API_BASE_URL + "/perfumes/search", filter);
    dispatch(fetchPerfumesByFilterParamsSuccess(response.data));
};

export const fetchPerfumesByGender = (gender: { perfumeGender: string }) => async (dispatch: Dispatch) => {
    const response = await axios.post(API_BASE_URL + "/perfumes/search/gender", gender);
    dispatch(fetchPerfumesByGenderSuccess(response.data));
};

export const fetchPerfumesByPerfumer = (perfumer: { perfumer: string }) => async (dispatch: Dispatch) => {
    const response = await axios.post(API_BASE_URL + "/perfumes/search/perfumer", perfumer);
    dispatch(fetchPerfumesByPerfumerSuccess(response.data));
};

export const fetchPerfumeReviewsWS = (response: Perfume) => async (dispatch: Dispatch) => {
    dispatch(fetchPerfumeSuccess(response));
};
