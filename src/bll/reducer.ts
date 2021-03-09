const SET_DATA_RATES = 'tableMarket/SET_DATA_RATES';
const SET_FETCH_ERROR = 'tableMarket/SET_FETCH_ERROR';
const SET_INIT_DATA_TABLE = 'tableMarket/SET_INIT_DATA_TABLE';
export const FETCH_DATA = 'tableMarket/FETCH_DATA';
export const FETCH_DATA_POLLING = 'tableMarket/FETCH_DATA_POLLING';

const initialState: TableMarketType = {
    markets: [
        {
            id: 1,
            name: "First",
            rates: {
                "RUB/CUPCAKE": 0,
                "USD/CUPCAKE": 0,
                "EUR/CUPCAKE": 0,
                "RUB/USD": 0,
                "RUB/EUR": 0,
                "EUR/USD": 0,
            },
            timestamp: 0
        },
        {
            id: 2,
            name: "Second",
            rates: {
                "RUB/CUPCAKE": 0,
                "USD/CUPCAKE": 0,
                "EUR/CUPCAKE": 0,
                "RUB/USD": 0,
                "RUB/EUR": 0,
                "EUR/USD": 0,
            },
            timestamp: 0
        },
        {
            id: 3,
            name: "Third",
            rates: {
                "RUB/CUPCAKE": 0,
                "USD/CUPCAKE": 0,
                "EUR/CUPCAKE": 0,
                "RUB/USD": 0,
                "RUB/EUR": 0,
                "EUR/USD": 0,
            },
            timestamp: 0
        },
    ],
    initData: {
        isInitData: false,
        error: ''
    }
}


export const marketReducer = (state: TableMarketType = initialState, action: ActionsType): TableMarketType => {
    switch (action.type) {
        case SET_DATA_RATES:
            return {
                ...state,
                markets: state.markets.map(m => m.id === action.newMarketData.id
                    ? {
                        ...m,
                        rates: {
                            "RUB/CUPCAKE": action.newMarketData.rates["RUB/CUPCAKE"],
                            "USD/CUPCAKE": action.newMarketData.rates["USD/CUPCAKE"],
                            "EUR/CUPCAKE": action.newMarketData.rates["EUR/CUPCAKE"],
                            "RUB/USD": action.newMarketData.rates["EUR/USD"],
                            "RUB/EUR": action.newMarketData.rates["RUB/EUR"],
                            "EUR/USD": action.newMarketData.rates["EUR/USD"],
                        },
                        timestamp: action.newMarketData.timestamp,
                    }
                    : m
                )
            }
        case SET_INIT_DATA_TABLE:
            return {
                ...state,
                initData: {
                    ...state.initData,
                    isInitData: true
                }
            }
        case SET_FETCH_ERROR:
            return {
                ...state,
                initData: {
                    error: action.errorText,
                    isInitData: false
                }
            }
        default:
            return state
    }
}


export const setRatesAC = (newMarketData: MarketType,id: number) => ({type: SET_DATA_RATES, newMarketData, id} as const)
export const setFetchErrorAC = (errorStatus: string) => ({type: SET_FETCH_ERROR, errorText: errorStatus} as const)
export const setInitDataAC = (isInitData: boolean) => ({type: SET_INIT_DATA_TABLE, isInitData: isInitData} as const)


export const fetchData = (id: number, endPoint: string) => ({type: FETCH_DATA, id, endPoint})
export const fetchDataWithPolling = (id: number, endPoint: string) => ({type: FETCH_DATA_POLLING, id, endPoint})

export type MarketType = {
    id: number,
    name?: string,
    rates: {
        "RUB/CUPCAKE": number,
        "USD/CUPCAKE": number,
        "EUR/CUPCAKE": number,
        "RUB/USD": number,
        "RUB/EUR": number,
        "EUR/USD": number,
    },
    timestamp: number
}
export type TableMarketType = {
    markets: MarketType[],
    initData: {
        isInitData: boolean
        error: string
    }
}
type ActionsType =
    | ReturnType<typeof setRatesAC>
    | ReturnType<typeof setFetchErrorAC>
    | ReturnType<typeof setInitDataAC>
