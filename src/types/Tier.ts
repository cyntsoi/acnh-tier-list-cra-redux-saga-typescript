import {ID} from "./shared";

export interface Tier{
    id: ID;
    name: string;
    description: string;
    isLocked: boolean
}

export interface TierProps{
    tier: Tier
}