import axios from 'axios'
import {handleResponse} from "../utils/handle-response";

const instance = axios.create({
    baseURL: "http://localhost:3000/api/v1/",
    headers: {
        accept: "application/json",
    },
});

export const currencyApi = {
    async setRates(id: number, endPoint: string) {
        const response = await instance.get(`${endPoint}`);
        response.data = {...handleResponse(response.data), id}
        return response
    }
}
