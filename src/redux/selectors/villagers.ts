import {RootState} from "../reducers";
import {compareOrder} from "../../utils/compareOrder";
import {ID} from "../../types/shared";
import {VillagerRanking} from "../../types/Villager";

// full state
export const getVillagersState = (state: RootState) => state.villagers

// direct state properties
export const getVillagersList = (state: RootState) => getVillagersState(state).list
export const getVillagersRankingMap = (state: RootState) => getVillagersState(state).rankings
export const getVillagersTiers = (state: RootState) => getVillagersState(state).tiers
export const getVillagersIsLoading = (state: RootState) => getVillagersState(state).isLoading

// computed states
export const getUnRankedVillagers = (state: RootState) => {
    const rankingMap = getVillagersRankingMap(state)
    return getVillagersList(state).filter(villager => typeof rankingMap[villager.id] === 'undefined')
}
export const getVillagersByTier = (tierId: ID) => (state: RootState) => {
    const rankingMap = getVillagersRankingMap(state)
    const list = getVillagersList(state).filter((villager) => {
        const ranking = rankingMap[villager.id.toString()];
        // @ts-ignore
        return ranking && ranking['tierId'] === tierId
    })
    if (list.length === 0) return list;
    list.sort((a, b) => compareOrder(rankingMap[a.id].order,rankingMap[b.id].order))
    return list
}
export const getVillagerById = (villagerId: ID) => (state:RootState ) => getVillagersList(state).find(villager => villager.id === villagerId)
export const getVillagerRanking = (villagerId: ID) => (state:RootState) : VillagerRanking | undefined => getVillagersRankingMap(state)[villagerId]

