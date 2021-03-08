import {call, put, takeEvery} from "redux-saga/effects";
import {fetchData, setRatesAC} from "./reducer";
import {currencyApi} from "../dal/api";


function* fetchDataWorkerSaga(action: ReturnType<typeof fetchData>) {
    // @ts-ignore
    const response = yield call(currencyApi.setRates, action.id, action.endPoint)
    yield put(setRatesAC(response.data, action.id))
}


export function* rootWatcher() {
    yield takeEvery('FETCH-DATA', fetchDataWorkerSaga)
}
