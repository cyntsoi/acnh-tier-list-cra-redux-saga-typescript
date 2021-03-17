import {all, put, takeLatest, takeEvery, select} from 'redux-saga/effects'
import * as actions from '../actions/villagers'
import {GET_ALL_VILLAGERS_URL} from "../../utils/consts/api";
import axios from "axios";
import {Villager} from "../../types/Villager";
import {ADD_VIlLAGER_TO_TIER, REORDER_VILLAGER, VILLAGERS_GET_ALL, VILLAGERS_SET_ALL} from "../types/villagers";
import {getVillagersRankingMap} from "../selectors/villagers";
import {delay} from "../../utils/delay";

function* getAllVillagers() {
    yield put(actions.setVillagersLoading(true))
    try {
        const villagersMap: Record<string, Villager> = yield axios.get(GET_ALL_VILLAGERS_URL).then(res => res.data)
        yield put(actions.setAllVillagers(Object.values(villagersMap)))
    } catch (e) {
        console.log(e)
    }
    yield put(actions.setVillagersLoading(false))
}

function* getAllVillagersSaga() {
    yield takeLatest(VILLAGERS_GET_ALL, getAllVillagers)
}

function* addZuckerToHisTier() {
    yield put(actions.addVillagerToTier(269, 0))
    yield put(actions.lockVillagerTier(0))
}

function* setAllVillagersSaga() {
    yield takeEvery(VILLAGERS_SET_ALL, addZuckerToHisTier)
}

function* updateLocalStorage() {
    yield delay(500)
    const rankings: ReturnType<typeof getVillagersRankingMap> = yield select(getVillagersRankingMap)
    yield localStorage.setItem('villagers', JSON.stringify({rankings}))
}

function* onRankingChange() {
    yield takeLatest([REORDER_VILLAGER, ADD_VIlLAGER_TO_TIER], updateLocalStorage)
}

export function* villagersSaga() {
    yield all([getAllVillagersSaga(), setAllVillagersSaga(), onRankingChange()])
}