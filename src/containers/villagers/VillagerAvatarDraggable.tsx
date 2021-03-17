import React, {FC, useEffect, useRef} from "react";
import {VillagerProps} from "../../types/Villager";
import {DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import {DragItem} from "../../types/DragItem";
import {VillagerAvatar} from "../../components/villagers/VillagerAvatar";
import {VILLAGER_AVATAR} from "../../utils/consts/dnd";
import {shallowEqual, useSelector} from "react-redux";
import {getVillagerRanking} from "../../redux/selectors/villagers";
import {useMoveToTier} from "../../redux/hooks/useMoveToTier";
import {useReorder} from "../../redux/hooks/useReorder";

export interface VillagerAvatarDraggableProps extends VillagerProps {}

export const VillagerAvatarDraggable: FC<VillagerAvatarDraggableProps> = ({villager}) => {
    const ref = useRef<HTMLDivElement>(null);
    const _ranking = useSelector(getVillagerRanking(villager.id), shallowEqual)
    const ranking = useRef(_ranking)
    const moveToTier = useMoveToTier(villager.id)
    const reorder = useReorder(villager.id)

    useEffect(() => {
        ranking.current = _ranking
    }, [_ranking])

    const [{handlerId}, drop] = useDrop({
        accept: VILLAGER_AVATAR,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item: DragItem, monitor: DropTargetMonitor<DragItem>) {
            if (!ref.current || !ranking.current) return;

            const dragIndex = monitor.getItem().getRanking()?.order;
            const hoverIndex = ranking.current.order;

            // Don't replace items with themselves
            if (typeof dragIndex === "undefined" || typeof hoverIndex === "undefined" || dragIndex === hoverIndex || monitor.getItem().getRanking()?.tierId !== ranking.current.tierId) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleX =
                (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = (clientOffset as any).x - hoverBoundingRect.left;
            const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;
            if (
                Math.abs(hoverClientY - hoverMiddleY) > 50 ||
                Math.abs(hoverClientX - hoverMiddleX) > 50
            ) {
                return;
            }

            monitor.getItem().reorder(hoverIndex)

        }
    });

    const [{isDragging}, drag] = useDrag(() => ({
        type: VILLAGER_AVATAR,
        item: () => ({id: villager.id, getRanking: () => ranking.current, moveToTier, reorder}),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    drop(drag(ref));

    return <div style={{opacity: isDragging ? 0 : 1, cursor:'pointer'}} ref={ref} data-handler-id={handlerId}>
        <VillagerAvatar villager={villager}/>
    </div>
}