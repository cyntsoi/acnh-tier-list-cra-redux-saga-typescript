import {VillagerRanking} from "./Villager";

export interface DragItem {
    getRanking: () => (VillagerRanking | undefined)
    reorder: (order:number) => void
    moveToTier: (tierId: number) => void
    id: string;
    type: string;
}
