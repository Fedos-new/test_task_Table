const toFixed = (n: number): number => ~~(Math.pow(10, 2) * n) / Math.pow(10, 2);

export const handleResponse = (obj: any) => {
    return {
        id: obj.id,
        rates: {
            "RUB/CUPCAKE": toFixed(obj.rates.RUB),
            "USD/CUPCAKE": toFixed(obj.rates.USD),
            "EUR/CUPCAKE": toFixed(obj.rates.EUR),
            "RUB/USD": toFixed(toFixed(obj.rates.RUB) / toFixed(obj.rates.USD)),
            "RUB/EUR": toFixed(toFixed(obj.rates.RUB) / toFixed(obj.rates.EUR)),
            "EUR/USD": toFixed(toFixed(obj.rates.EUR) / toFixed(obj.rates.USD)),
        },
        timestamp: obj.timestamp
    };
};
