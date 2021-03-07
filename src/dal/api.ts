import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3000/api/v1/",
    headers: {
        accept: "application/json",
    },
});

export const currencyApi = {
    setRates() {
        return instance.get(`first`);
    },
};