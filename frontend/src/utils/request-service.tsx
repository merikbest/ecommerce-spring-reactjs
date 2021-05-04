import React from 'react';
import axios, {Method} from 'axios';

import {API_BASE_URL} from "./constants/url";

class RequestService {

    get = (url: string, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("GET", url, null, isAuthRequired, contentType);
    };

    post = (url: string, body: any, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("POST", url, body, isAuthRequired, contentType);
    };

    put = (url: string, body: any, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("PUT", url, body, isAuthRequired, contentType);
    };

    delete = (url: string, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("DELETE", url, null, isAuthRequired, contentType);
    };
}

const createRequest = (method: Method, url: string, body: any, isAuthRequired: boolean, contentType: string) => {
    return axios({
        method: method,
        url: API_BASE_URL + url,
        data: body,
        headers: setHeader(isAuthRequired, contentType)
    });
};

const setHeader = (isAuthRequired: boolean, contentType: string) => {
    if (isAuthRequired) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
    axios.defaults.headers.common["Content-Type"] = contentType
};

export default new RequestService();
