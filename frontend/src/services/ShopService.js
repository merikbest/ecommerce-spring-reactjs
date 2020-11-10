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
            method: "GET",
            url: API_BASE_URL + "/cart",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    addToCart(id) {
        return axios({
            method: "POST",
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
            method: "POST",
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
            method: "GET",
            url: API_BASE_URL + "/order",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    postOrder(validOrder) {
        return axios({
            method: "POST",
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

    addPerfume(data) {
        return axios({
            method: "POST",
            url: API_BASE_URL + "/admin/add",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    updatePerfume(data) {
        return axios({
            method: "PUT",
            url: API_BASE_URL + "/admin/edit",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    getAllOrders() {
        return axios({
            method: "GET",
            url: API_BASE_URL + "/admin/orders",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    getUserOrders() {
        return axios({
            method: "GET",
            url: API_BASE_URL + "/user/orders",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    getAllUsers() {
        return axios({
            method: "GET",
            url: API_BASE_URL + "/admin/user/all",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    getUser(id) {
        return axios({
            method: "GET",
            url: API_BASE_URL + "/admin/user/" + id,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    updateUserInfo(user) {
        return axios({
            method: "PUT",
            url: API_BASE_URL + "/user/edit",
            data: user,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }
}

export default new ShopService();