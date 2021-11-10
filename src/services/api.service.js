import axios from "axios";


class ApiService{
    getInstance(url, token){

        return axios.create({
            baseURL: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });
    }
}

export default new ApiService();