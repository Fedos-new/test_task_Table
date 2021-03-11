import {ResponseDataOutputType} from "../dal/api";

const toFixed = (n: number): number => ~~(Math.pow(10, 2) * n) / Math.pow(10, 2);

export const handleResponse = (data: ResponseDataOutputType, id: number) => {
    return {
        id: id,
        rates: {
            'RUB/CUPCAKE': toFixed(data.rates.RUB),
            'USD/CUPCAKE': toFixed(data.rates.USD),
            'EUR/CUPCAKE': toFixed(data.rates.EUR),
            'RUB/USD': toFixed(toFixed(data.rates.RUB) / toFixed(data.rates.USD)),
            'RUB/EUR': toFixed(toFixed(data.rates.RUB) / toFixed(data.rates.EUR)),
            'EUR/USD': toFixed(toFixed(data.rates.EUR) / toFixed(data.rates.USD)),
        },
        timestamp: data.timestamp
    };
};

