import {TierProps} from "../../types/Tier";
import React, {FC, PropsWithChildren} from "react";
import {List} from "../../components/List";
import {useSelector, shallowEqual} from "react-redux";
import {getVillagersByTier} from "../../redux/selectors/villagers";
import {VillagerAvatar} from "../../components/villagers/VillagerAvatar";
import { DropTargetMonitor, useDrop} from "react-dnd";
import {VILLAGER_AVATAR} from "../../utils/consts/dnd";
import {DragItem} from "../../types/DragItem";
import {HStack} from "@chakra-ui/layout";
import {VillagerAvatarDraggable} from "./VillagerAvatarDraggable";

interface ComponentProps extends TierProps {
    canMoveToTier: boolean
}

const TierListComponent: FC<PropsWithChildren<ComponentProps>> = ({tier, children, canMoveToTier}) => {
    return <List title={tier.name} bodyBoxProps={{
        borderColor: canMoveToTier ? 'green' : undefined
    }}>{children}</List>
}

export const TierList: FC<TierProps> = ({tier}) => {
    const villagers = useSelector(getVillagersByTier(tier.id), shallowEqual)

    const [{isOver, canDrop}, drop] = useDrop(() => ({
        accept: VILLAGER_AVATAR,
        drop: () => ({tierId: tier.id}),
        hover: (item: DragItem, monitor: DropTargetMonitor) => {
            if (item.getRanking()?.tierId === tier.id) return;
            item.moveToTier(tier.id)
        },
        canDrop: (item: DragItem) => {
            return !tier.isLocked && item.getRanking()?.tierId !== tier.id
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }));
    return (
        <TierListComponent tier={tier} canMoveToTier={canDrop && isOver}>
            <div ref={drop}>
                <HStack flexWrap="wrap">
                    {villagers.length === 0 ?
                        <p>{`No villagers in Tier ${tier.name}`}</p> :
                        <>
                            {villagers.map((villager) => (
                                tier.isLocked ? <VillagerAvatar key={villager.id}
                                                                villager={villager}/> :
                                    <VillagerAvatarDraggable key={villager.id} villager={villager}/>))}
                        </>
                    }
                </HStack>
            </div>
        </TierListComponent>
    )
}