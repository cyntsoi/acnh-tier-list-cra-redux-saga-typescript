import {applyMiddleware, createStore, compose} from "redux";
import createReduxSagaMiddleware from "redux-saga";
import {rootReducer} from "../reducers";
import {rootSaga} from "../sagas";

const sagaMiddleware = createReduxSagaMiddleware();
// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
