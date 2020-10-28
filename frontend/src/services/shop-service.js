import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1/rest";

class ShopService {

    getProducts() {
        return axios.get(API_BASE_URL);
    }

    getProductById(id) {
        return axios.get(API_BASE_URL + "/product/" + id);
    }

    getAllProducts() {
        return axios.get(API_BASE_URL + "/product/list");
    }

    login(data) {
        return axios.post(API_BASE_URL + "/login", data);
    }

    registration(data) {
        return axios.post(API_BASE_URL + "/registration", data);
    }

    addProductToBd(data) {
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

    saveEditedProductToBd(data) {
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
}

export default new ShopService();