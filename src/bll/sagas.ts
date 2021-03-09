import {call, put, takeEvery} from "redux-saga/effects";
import {
    fetchData,
    fetchDataWithPolling,
    setFetchErrorAC,
    setInitDataAC,
    setRatesAC,
    FETCH_DATA,
    FETCH_DATA_POLLING
} from "./reducer";
import {currencyApi} from "../dal/api";

function* fetchDataWorkerSaga(action: ReturnType<typeof fetchData>) {
    try {
        // @ts-ignore
        const response = yield call(currencyApi.setRates, action.id, action.endPoint)
        yield put(setRatesAC(response.data, action.id))
        yield put(setInitDataAC(true))
    } catch (error) {
        yield put(setFetchErrorAC(error.message))
    }
}

function* fetchDataPollingWorkerSaga(action: ReturnType<typeof fetchData>) {
    try {
        // @ts-ignore
        const response = yield call(currencyApi.setRates, action.id, action.endPoint)
        if (response.status === 502) {
            yield put(fetchDataWithPolling(action.id, action.endPoint))
        } else if (response.status !== 200) {
            console.log(`${response.statusText}. Retry will be in 1 second`);
            yield new Promise(resolve => setTimeout(resolve, 1000))
            yield put(fetchDataWithPolling(action.id, action.endPoint))
        } else {
            yield put(setRatesAC(response.data, action.id))
            yield put(fetchDataWithPolling(action.id, action.endPoint))
        }
    } catch (error) {
        yield put(setFetchErrorAC(error.message))
    }
}

export function* rootWatcher() {
    yield takeEvery(FETCH_DATA, fetchDataWorkerSaga)
    yield takeEvery(FETCH_DATA_POLLING, fetchDataPollingWorkerSaga)
}
