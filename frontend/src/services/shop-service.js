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

}

export default new ShopService();