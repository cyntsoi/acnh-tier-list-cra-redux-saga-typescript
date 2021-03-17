import * as actionTypes from '../types/villagers'
import {Villager} from "../../types/Villager";
import {Tier} from "../../types/Tier";

export const getAllVillagers = () => ({type: actionTypes.VILLAGERS_GET_ALL, payload: null})

export const setVillagersLoading = (loading: boolean) => ({type: actionTypes.VILLAGERS_SET_LOADING, payload: loading})

export const setAllVillagers = (villagers: Array<Villager>) => ({
    type: actionTypes.VILLAGERS_SET_ALL,
    payload: villagers
})

export const addVillagerToTier = (villagerId: Villager['id'], tierId: Tier['id']) => ({
    type: actionTypes.ADD_VIlLAGER_TO_TIER,
    payload: {villagerId, tierId}
})

export const lockVillagerTier = (tierId: Tier['id']) => ({
    type: actionTypes.SET_VILLAGERS_TIER_LOCK,
    payload: {
        tierId,
        isLocked: true
    }
})

export const unlockVillagerTier = (tierId: Tier['id']) => ({
    type: actionTypes.SET_VILLAGERS_TIER_LOCK,
    payload: {
        tierId,
        isLocked: false
    }
})

export const reorderVillager = (villagerId: Villager['id'], order: number) => ({
    type: actionTypes.REORDER_VILLAGER,
    payload: {villagerId, order}
})