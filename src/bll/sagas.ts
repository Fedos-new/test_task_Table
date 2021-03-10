import {call, put, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/core';
import {all} from 'redux-saga/effects'
import {
    setFetchErrorAC,
    setInitDataAC,
    setRatesAC,
    FETCH_DATA,
    FETCH_DATA_POLLING,
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
            put(setFetchErrorAC('')),
            put(setInitDataAC(true))
        ])

    } catch (error) {
        yield put(setFetchErrorAC(error.message))
    }
}

function* fetchDataPollingWorkerSaga(): SagaIterator {
    while (true) {
        try {
            const [firstP, secondP, thirdP] = yield all([
                call(currencyApi.setRates, 1, 'first/poll'),
                call(currencyApi.setRates, 2, 'second/poll'),
                call(currencyApi.setRates, 3, 'third/poll'),
            ])

            yield all([
                put(setRatesAC(firstP.data)),
                put(setRatesAC(secondP.data)),
                put(setRatesAC(thirdP.data))
            ])
        } catch (error) {
            yield put(setFetchErrorAC(error.message))

        }
    }
}

export function* rootWatcher() {
    yield takeEvery(FETCH_DATA, fetchDataWorkerSaga)
    yield takeEvery(FETCH_DATA_POLLING, fetchDataPollingWorkerSaga)
}

