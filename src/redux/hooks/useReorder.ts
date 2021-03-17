import {ID} from "../../types/shared";
import {useCallback} from "react";
import {reorderVillager} from "../actions/villagers";
import {useDispatch} from "react-redux";

export const useReorder = (villagerId: ID) => {
    const dispatch = useDispatch();
    return useCallback(
        (order:number) => {
            dispatch(reorderVillager(villagerId, order))
        },
        [villagerId, dispatch]
    )
}