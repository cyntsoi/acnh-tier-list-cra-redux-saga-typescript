import {ID} from "./shared";

export type Gender = "Female" | "Male"
export type VillagerPersonality = "Cranky" | "Lazy" | "Normal" | "Sisterly" | "Snooty" | "Jock" | "Peppy" | "Smug";

export interface Villager {
    id: ID,
    name: {
        "name-USen": string
    },
    gender: Gender,
    species: string,
    personality: VillagerPersonality,
    "catch-phrase": string,
    "bubble-color": string,
    "text-color": string,
    icon_uri: string,
    saying: string
}

export interface VillagerProps {
    villager: Villager
}

export type VillagerRanking = { tierId: number, order: number }