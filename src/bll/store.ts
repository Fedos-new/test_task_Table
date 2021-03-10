import {marketReducer} from './reducer';
import {combineReducers, createStore} from 'redux';
import {applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {rootWatcher} from './sagas';


const rootReducer = combineReducers({
    tableMarket: marketReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)


export type AppRootState = ReturnType<typeof rootReducer>
