import * as actionTypes from '../types/villagers'
import {Villager, VillagerRanking} from "../../types/Villager";
import {Tier} from "../../types/Tier";
import {compareOrder} from "../../utils/compareOrder";
import update from "immutability-helper";

export interface VillagersState {
    list: Array<Villager>,
    tiers: Array<Tier>,
    rankings: Record<string, VillagerRanking>,
    isLoading: boolean,
}

export type VillagersAction =
    { type: typeof actionTypes.VILLAGERS_GET_ALL }
    | { type: typeof actionTypes.VILLAGERS_SET_ALL, payload: Array<Villager> }
    | { type: typeof actionTypes.VILLAGERS_SET_LOADING, payload: boolean }
    | { type: typeof actionTypes.ADD_VIlLAGER_TO_TIER, payload: { tierId: Tier['id'], villagerId: Villager['id'] } }
    | { type: typeof actionTypes.SET_VILLAGERS_TIER_LOCK, payload: { tierId: Tier['id'], isLocked: boolean } }
    | { type: typeof actionTypes.REORDER_VILLAGER, payload: { villagerId: Villager['id'], order: number } };

const InitialVillagerTiers: Array<Tier> = [
    {
        id: 0,
        name: "Zucker",
        description: "The one and only",
    },
    {
        id: 1,
        name: "S",
        description: "The awesome ones"
    },
    {
        id: 2,
        name: "A",
        description: "The cool ones"
    },
    {
        id: 3,
        name: "B",
        description: "The good ones"
    },
    {
        id: 4,
        name: "C",
        description: "The fine ones"
    },
    {
        id: 5,
        name: "D",
        description: "The meh ones"
    },
    {
        id: 6,
        name: "E",
        description: "The ooooffs.."
    },
    {
        id: 7,
        name: "F",
        description: "The utter mistakes"
    },
].map(tier => ({...tier, isLocked: false}))

const getRankingsFromLocalStorage = () => {
    const state = localStorage.getItem('villagers')
    if (state){
        try{
            return JSON.parse(state).rankings
        }catch(e){}
    }
    return {};
}

const InitialState: VillagersState = {
    list: [],
    tiers: InitialVillagerTiers,
    rankings: getRankingsFromLocalStorage(),
    isLoading: false,
}

export const villagersReducer = (state: VillagersState = InitialState, action: VillagersAction): VillagersState => {
    switch (action.type) {
        case actionTypes.SET_VILLAGERS_TIER_LOCK:
            return {
                ...state,
                tiers: state.tiers.map(tier => {
                    if (tier.id !== action.payload.tierId) return tier;
                    return {
                        ...tier,
                        isLocked: action.payload.isLocked
                    }
                })
            }
        case actionTypes.ADD_VIlLAGER_TO_TIER:
            // const tier = state.tiers.find(tier => tier.id === action.payload.tierId)
            // if ( tier!.isLocked ) return state;
            const rankingsInTier = Object.values(state.rankings).filter(ranking => ranking.tierId === action.payload.tierId)
                .sort((a, b) => compareOrder(a.order, b.order));

            return {
                ...state, rankings: {
                    ...state.rankings,
                    [action.payload.villagerId]: {
                        tierId: action.payload.tierId,
                        order: rankingsInTier.length ? rankingsInTier[rankingsInTier.length - 1].order + 1 : 1,
                    }
                }
            }
        case actionTypes.REORDER_VILLAGER:
            const villagerRanking = state.rankings[action.payload.villagerId.toString()];
            if (!villagerRanking) return state;
            const allRankings = Object.entries(state.rankings).filter(([_, ranking]) => ranking.tierId === villagerRanking.tierId)
                .sort(([_, a], [__, b]) => compareOrder(a.order, b.order))
            const findVillagerEntry = (entry: typeof allRankings[0]) => entry[0] === action.payload.villagerId.toString()
            const villagerEntry = allRankings.find(findVillagerEntry)
            const villagerEntryIndex = allRankings.findIndex(findVillagerEntry)
            const toIndex = allRankings.findIndex(entry => entry[1].order >= action.payload.order)
            const newRankings = update(allRankings, {
                $splice: [
                    [villagerEntryIndex!, 1],
                    [toIndex!, 0, villagerEntry!]
                ]
            }).map((ranking, idx) => {
                return [ranking[0], {...ranking[1], order: idx + 1}]
            })
            return {...state, rankings: {...state.rankings, ...Object.fromEntries(newRankings)}};
        case actionTypes.VILLAGERS_SET_ALL:
            return {...state, list: action.payload}
        case actionTypes.VILLAGERS_SET_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}
