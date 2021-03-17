import { all } from "redux-saga/effects";
import {villagersSaga} from "./villagers";

export function* rootSaga(){
    yield all([villagersSaga()])
}