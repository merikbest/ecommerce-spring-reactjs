import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1/rest";

class ShopService {

    getPerfumes() {
        return axios.get(API_BASE_URL);
    }

    getPerfumeById(id) {
        return axios.get(API_BASE_URL + "/product/" + id);
    }

    findPerfumeByGender(gender) {
        return axios.post(API_BASE_URL + "/menu/gender", gender);
    }

    findPerfumeByPerfumer(perfumer) {
        return axios.post(API_BASE_URL + "/menu/perfumer", perfumer);
    }

    getPerfumeByFilterParams(filter) {
        return axios.post(API_BASE_URL + "/menu/search", filter);
    }

    getCart() {
        return axios({
            method: "get",
            url: API_BASE_URL + "/cart",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    addToCart(id) {
        return axios({
            method: "post",
            url: API_BASE_URL + "/cart/add",
            data: id,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    removeFromCart(perfume) {
        return axios({
            method: "post",
            url: API_BASE_URL + "/cart/remove",
            data: perfume,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    getOrder() {
        return axios({
            method: "get",
            url: API_BASE_URL + "/order",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    postOrder(validOrder) {
        return axios({
            method: "post",
            url: API_BASE_URL + "/order",
            data: validOrder,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    finalizeOrder() {
        return axios.get(API_BASE_URL + "/order/finalize");
    }

    login(data) {
        return axios.post(API_BASE_URL + "/login", data);
    }

    registration(data) {
        return axios.post(API_BASE_URL + "/registration", data);
    }

    activateEmailCode(code) {
        return axios.get(API_BASE_URL + "/activate/" + code);
    }

    addPerfumeToBd(data) {
        return axios({
            method: "post",
            url: API_BASE_URL + "/admin/add",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    saveEditedPerfumeToBd(data) {
        return axios({
            method: "post",
            url: API_BASE_URL + "/admin/edit",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    getOrders() {
        return axios({
            method: "get",
            url: API_BASE_URL + "/admin/orders",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }
}

export default new ShopService();