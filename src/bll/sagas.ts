import {all, call, put, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/core';
import {
    FETCH_DATA,
    FETCH_DATA_FIRST_POLLING,
    FETCH_DATA_SECOND__POLLING,
    FETCH_DATA_THIRD_POLLING,
    setFetchErrorAC,
    setInitDataAC,
    setRatesAC,
} from './reducer';
import {currencyApi} from '../dal/api';


function* fetchDataWorkerSaga(): SagaIterator {
    try {
        const [first, second, third] = yield all([
            call(currencyApi.setRates, 1, 'first'),
            call(currencyApi.setRates, 2, 'second'),
            call(currencyApi.setRates, 3, 'third'),
        ])
        yield all([
            put(setRatesAC(first.data)),
            put(setRatesAC(second.data)),
            put(setRatesAC(third.data)),
        ])
        yield put(setFetchErrorAC(''))
        yield put(setInitDataAC(true))

    } catch (error) {
        yield put(setFetchErrorAC(error.message))
    }
}

function* fetchDataFistPollingWorkerSaga(): SagaIterator {
    while (true) {
        try {
            const firstP = yield call(currencyApi.setRates, 1, 'first/poll')
            yield put(setRatesAC(firstP.data))
        } catch (error) {
            yield put(setFetchErrorAC(error.message))
        }
    }
}

function* fetchDataSecondPollingWorkerSaga(): SagaIterator {
    while (true) {
        try {
            const secondP = yield call(currencyApi.setRates, 2, 'second/poll')
            yield put(setRatesAC(secondP.data))
        } catch (error) {
            yield put(setFetchErrorAC(error.message))
        }
    }
}

function* fetchDataThirdPollingWorkerSaga(): SagaIterator {
    while (true) {
        try {
            const thirdP = yield call(currencyApi.setRates, 3, 'third/poll')
            yield put(setRatesAC(thirdP.data))
        } catch (error) {
            yield put(setFetchErrorAC(error.message))
        }
    }
}

export function* rootWatcher() {
    yield takeEvery(FETCH_DATA, fetchDataWorkerSaga)
    yield takeEvery(FETCH_DATA_FIRST_POLLING, fetchDataFistPollingWorkerSaga)
    yield takeEvery(FETCH_DATA_SECOND__POLLING, fetchDataSecondPollingWorkerSaga)
    yield takeEvery(FETCH_DATA_THIRD_POLLING, fetchDataThirdPollingWorkerSaga)
}

