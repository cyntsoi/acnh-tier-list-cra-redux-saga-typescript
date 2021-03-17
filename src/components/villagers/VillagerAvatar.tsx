import {Villager} from "../../types/Villager";
import {Avatar, AvatarProps} from "../Avatar"
import {memo} from "react";

interface VillagerProps extends AvatarProps {
    villager: Villager
}

export const VillagerAvatar = memo<VillagerProps>(({villager: {name, icon_uri}, ...otherProps}) =>
    <Avatar {...otherProps} src={icon_uri} alt={name["name-USen"]}/>)