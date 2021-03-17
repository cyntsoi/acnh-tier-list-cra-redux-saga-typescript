import {AspectRatio, Image, ImageProps, AspectRatioProps} from "@chakra-ui/react"
import React, {memo} from "react"

export interface AvatarProps extends ImageProps {
    aspectRatioProps?: AspectRatioProps
}

const defaultProps: AvatarProps = {
    borderRadius: "50%",
    width: "4rem"
}

export const Avatar = memo<AvatarProps>(({aspectRatioProps, ...props}) => {
    return (
        <AspectRatio display="inline-block" w={50} ratio={1} {...aspectRatioProps }>
            <Image {...defaultProps} {...props} fallback={<></>} />
        </AspectRatio>
    )
})

