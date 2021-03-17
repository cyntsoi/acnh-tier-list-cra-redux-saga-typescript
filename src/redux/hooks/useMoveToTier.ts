import {ID} from "../../types/shared";
import {useCallback} from "react";
import {addVillagerToTier} from "../actions/villagers";
import {useDispatch} from "react-redux";

export const useMoveToTier = (villagerId: ID) => {
    const dispatch = useDispatch();
    return useCallback(
        (tierId: ID) => {
            dispatch(addVillagerToTier(villagerId, tierId))
        },
        [villagerId, dispatch]
    )
}