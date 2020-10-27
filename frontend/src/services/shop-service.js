import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1/rest";

class ShopService {

    getProducts() {
        return axios.get(API_BASE_URL);
    }

    getProductById(id) {
        return axios.get(API_BASE_URL + "/product/" + id);
    }

    login(user) {
        return axios.post(API_BASE_URL + "/login", user);
    }

    addProductToBd2(data) {
        return axios.post(API_BASE_URL + "/admin/add", data);
    }

    //работает
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
}

export default new ShopService();